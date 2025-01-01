'use client';

import Link from 'next/link';
import { MusicalNoteIcon, MicrophoneIcon } from '@heroicons/react/24/solid';
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
  const phrases = [
    "Discover the genre of your favorite tunes!",
    "Identify songs with just a few clicks!",
    "Explore the world of music analysis",
    "Your journey into AI-powered music insights starts here"
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="music-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M25 50 Q 40 40, 50 50 T 75 50" fill="none" stroke="rgba(107, 33, 168, 0.1)" strokeWidth="2" />
            <circle cx="25" cy="50" r="3" fill="rgba(107, 33, 168, 0.1)" />
            <circle cx="75" cy="50" r="3" fill="rgba(107, 33, 168, 0.1)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#music-pattern)" />
      </svg>

      <h1 className="text-5xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse relative z-10">
        Music Analysis Hub
      </h1>

      <div className="text-center text-xl text-purple-700 mb-8 h-20 relative z-10">
        <Typewriter
          words={phrases}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </div>

      <div className="flex flex-col gap-8 max-w-4xl w-full px-4">
        <Link href="/genre-classification" className="block">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <MusicalNoteIcon className="h-16 w-16 text-white mb-4 mx-auto" />
              <h2 className="text-2xl font-bold text-white text-center mb-2">Genre Classification</h2>
              <p className="text-purple-100 text-center">
                Upload your audio and discover its genre instantly using our AI-powered classification system.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/song-details" className="block">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <MicrophoneIcon className="h-16 w-16 text-white mb-4 mx-auto" />
              <h2 className="text-2xl font-bold text-white text-center mb-2">Song Identification</h2>
              <p className="text-indigo-100 text-center">
                Search for songs and get detailed information powered by the Spotify API.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

