'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MusicalNoteIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
  PauseCircleIcon,
  ShareIcon,
  ClockIcon,
  LanguageIcon,
} from '@heroicons/react/24/solid';

// Define trending songs data with audio preview URLs
const trendingSongs = [
  {
    name: "Tum Hi Ho",
    movie: "Aashiqui 2",
    language: "Hindi",
    image: "/placeholder.svg?height=100&width=100",
    year: "2013",
    previewUrl: "https://p.scdn.co/mp3-preview/sample.mp3"
  },
  {
    name: "Belageddu",
    movie: "Kirik Party",
    language: "Kannada",
    image: "/placeholder.svg?height=100&width=100",
    year: "2016",
    previewUrl: "https://p.scdn.co/mp3-preview/sample.mp3"
  },
  {
    name: "Butta Bomma",
    movie: "Ala Vaikunthapurramuloo",
    language: "Telugu",
    image: "/placeholder.svg?height=100&width=100",
    year: "2020",
    previewUrl: "https://p.scdn.co/mp3-preview/sample.mp3"
  },
  {
    name: "Vinnaithaandi Varuvaayaa",
    movie: "Vinnaithaandi Varuvaayaa",
    language: "Tamil",
    image: "/placeholder.svg?height=100&width=100",
    year: "2010",
    previewUrl: "https://p.scdn.co/mp3-preview/sample.mp3"
  },
  {
    name: "Entammede Jimikki Kammal",
    movie: "Velipadinte Pusthakam",
    language: "Malayalam",
    image: "/placeholder.svg?height=100&width=100",
    year: "2017",
    previewUrl: "https://p.scdn.co/mp3-preview/sample.mp3"
  }
];

const languages = ["All", "Hindi", "Tamil", "Telugu", "Kannada", "Malayalam"];

export default function SongIdentification() {
  const [songInput, setSongInput] = useState('');
  const [songDetails, setSongDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const getAccessToken = async () => {
    try {
      const response = await fetch('/api/spotify-token');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate with Spotify API');
      }

      const data = await response.json();
      return data.access_token;
    } catch (err) {
      console.error('Error fetching access token:', err);
      throw new Error('Failed to authenticate with Spotify API');
    }
  };

  const searchTrack = async (query: string, token: string) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch track data');
      }

      const data = await response.json();

      if (!data.tracks?.items?.length) {
        throw new Error('No songs found matching your search');
      }

      return data.tracks.items[0];
    } catch (err) {
      console.error('Search error:', err);
      throw err;
    }
  };

  const handleSearch = async (searchQuery: string = songInput) => {
    if (!searchQuery.trim()) {
      setError('Please enter a song name');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSongDetails(null);

    try {
      const token = await getAccessToken();
      const track = await searchTrack(searchQuery, token);

      // Add to recent searches
      setRecentSearches(prev => {
        const newSearches = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
        return newSearches;
      });

      setSongDetails({
        songName: track.name || 'Unknown',
        artists: track.artists?.map((artist: any) => artist.name) || ['Unknown Artist'],
        album: track.album?.name || 'Unknown Album',
        yearOfRelease: track.album?.release_date
          ? new Date(track.album.release_date).getFullYear()
          : 'Unknown',
        genre: track.genres?.join(', ') || 'Genre information not available via Search API',
        duration: track.duration_ms
          ? `${Math.floor(track.duration_ms / 60000)}:${(
              (track.duration_ms % 60000) / 1000
            )
              .toFixed(0)
              .padStart(2, '0')}`
          : 'Unknown',
        streamingLinks: {
          spotify: track.external_urls?.spotify || '#',
        },
        albumCover: track.album?.images[0]?.url || null,
        previewUrl: track.preview_url
      });
    } catch (err: any) {
      setError(typeof err.message === 'string' ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPreview = (previewUrl: string, songName: string) => {
    if (audioRef.current) {
      if (currentlyPlaying === songName) {
        audioRef.current.pause();
        setCurrentlyPlaying(null);
        setIsAudioPlaying(false);
      } else {
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setCurrentlyPlaying(songName);
        setIsAudioPlaying(true);
      }
    }
  };

  const handleShare = async (songName: string, artistName: string) => {
    try {
      await navigator.share({
        title: songName,
        text: `Check out ${songName} by ${artistName}!`,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const filteredSongs = trendingSongs.filter(
    song => selectedLanguage === 'All' || song.language === selectedLanguage
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-indigo-600 py-12">
      <audio ref={audioRef} onEnded={() => setCurrentlyPlaying(null)} />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Song Identification
          </h1>
          <p className="text-purple-100 text-lg">
            Discover and explore your favorite music
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
          {/* Search Section */}
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
            <div className="relative flex-1 w-full">
              <Input
                type="text"
                placeholder="Enter song name"
                value={songInput}
                onChange={(e) => setSongInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                disabled={isLoading}
                className="w-full pl-12 bg-white/80 backdrop-blur-sm border-purple-200"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
            </div>
            <Button 
              onClick={() => handleSearch()} 
              disabled={isLoading}
              className="w-full md:w-auto bg-purple-700 hover:bg-purple-800 text-white px-8"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-2 text-white mb-4">
                <ClockIcon className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Recent Searches</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 text-white border-none"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}


          {/* Trending Songs Section with Language Tabs */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Trending Indian Songs</h2>
              <div className="flex items-center gap-2">
                <LanguageIcon className="h-5 w-5 text-white" />
                <Tabs defaultValue="All" className="w-[400px]">
                  <TabsList className="bg-white/20">
                    {languages.map(lang => (
                      <TabsTrigger
                        key={lang}
                        value={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className="text-white data-[state=active]:bg-white/30"
                      >
                        {lang}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                // Loading skeletons
                [...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
              ) : (
                filteredSongs.map((song, index) => (
                  <div
                    key={index}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg hover:bg-white/90 transition-all flex items-center gap-4 group relative"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-purple-100 relative">
                      <img
                        src={song.image}
                        alt={song.name}
                        className="w-full h-full object-cover"
                      />
                      {song.previewUrl && (
                        <button
                          onClick={() => handlePlayPreview(song.previewUrl, song.name)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {currentlyPlaying === song.name ? (
                            <PauseCircleIcon className="w-8 h-8 text-white" />
                          ) : (
                            <PlayCircleIcon className="w-8 h-8 text-white" />
                          )}
                        </button>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-purple-900 group-hover:text-purple-700">
                        {song.name}
                      </h3>
                      <p className="text-sm text-purple-700">{song.movie}</p>
                      <p className="text-xs text-purple-600">{song.language} • {song.year}</p>
                    </div>
                    <button
                      onClick={() => handleShare(song.name, song.movie)}
                      className="p-2 hover:bg-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ShareIcon className="w-5 h-5 text-purple-600" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Song Details Card */}
          {songDetails && (
            <Card className="animate-fadeIn bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-purple-900">
                  <div className="flex items-center">
                    <MusicalNoteIcon className="h-6 w-6 mr-2 text-purple-600" />
                    {songDetails.songName}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleShare(songDetails.songName, songDetails.artists.join(', '))}
                  >
                    <ShareIcon className="h-5 w-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {songDetails.albumCover && (
                    <div className="flex justify-center items-center relative group">
                      <img
                        src={songDetails.albumCover}
                        alt={`${songDetails.album} cover`}
                        className="w-64 h-64 object-cover rounded-lg shadow-lg"
                      />
                      {songDetails.previewUrl && (
                        <button
                          onClick={() => handlePlayPreview(songDetails.previewUrl, songDetails.songName)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                        >
                          {currentlyPlaying === songDetails.songName ? (
                            <PauseCircleIcon className="w-16 h-16 text-white" />
                          ) : (
                            <PlayCircleIcon className="w-16 h-16 text-white" />
                          )}
                        </button>
                      )}
                    </div>
                  )}
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="font-semibold text-purple-900">Artist(s)</dt>
                      <dd className="text-purple-800">{songDetails.artists.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-purple-900">Album</dt>
                      <dd className="text-purple-800">{songDetails.album}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-purple-900">Year of Release</dt>
                      <dd className="text-purple-800">{songDetails.yearOfRelease}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-purple-900">Genre</dt>
                      <dd className="text-purple-800">
                        {songDetails.genre !== 'Genre information not available via Search API' ? (
                          songDetails.genre
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Not available</span>
                            <Button
                              onClick={() => window.open('https://www.zedge.net/ringtones', '_blank')}
                              className="text-xs px-2 py-1 bg-purple-600 text-white hover:bg-purple-700"
                            >
                             get classified it 
                             Download MP3 here!!
                            </Button>
                          </div>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-purple-900">Duration</dt>
                      <dd className="text-purple-800">{songDetails.duration}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-purple-900">Streaming Link</dt>
                      <dd>
                        <a
                          href={songDetails.streamingLinks.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1"
                        >
                          Open in Spotify
                          <PlayCircleIcon className="w-4 h-4" />
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

