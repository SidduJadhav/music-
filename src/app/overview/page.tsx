'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Overview() {
  const [activeTab, setActiveTab] = useState('classification');

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">Music Analysis Hub Overview</h1>
        
        <Tabs defaultValue="classification" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classification">Music Classification</TabsTrigger>
            <TabsTrigger value="identification">Song Identification</TabsTrigger>
          </TabsList>
          
          <TabsContent value="classification" className="mt-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-6 text-purple-700">Music Genre Classification</h2>
              
              <p className="text-gray-700 mb-6">
                Our Music Genre Classification system uses advanced machine learning algorithms to automatically identify and categorize music tracks into their respective genres. Here's how it works:
              </p>
              
              <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
                <li>Audio Preprocessing: The uploaded audio file is converted into a standardized format.</li>
                <li>Feature Extraction: We extract relevant features from the audio, such as mel-spectrograms, which represent the audio's frequency content over time.</li>
                <li>Machine Learning Model: Our trained neural network analyzes these features to predict the genre.</li>
                <li>Classification: The model outputs probabilities for each genre, and we select the highest probability as the predicted genre.</li>
              </ol>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Mel-Spectrogram Example</h3>
                <Image 
                  src="/graph.png?height=300&width=500" 
                  alt="Mel-spectrogram of an audio sample" 
                  width={500} 
                  height={300} 
                  className="rounded-lg shadow-md"
                />
             <div className="text-sm text-gray-500 mt-2">
  <strong>Understanding the Mel Spectrogram:</strong> This graph is a critical visualization used in audio analysis, particularly in tasks like music genre classification. It transforms sound into a form that is easier for machine learning models to interpret.

  <strong>What is a Mel Spectrogram?</strong>
  <p>
    A Mel Spectrogram visually represents sound by showing how its energy is distributed across various frequencies over time. It uses the Mel scale, a perceptual scale designed to match human hearing sensitivity.
  </p>

  <strong>Axes:</strong>
  <ul>
    <li><strong>X-Axis (Time):</strong> Represents the duration of the audio signal. In this graph, the time spans from 0 to 15 seconds.</li>
    <li><strong>Y-Axis (Frequency in Hz):</strong> Displays the range of frequencies in the audio signal, measured in Hertz (Hz). Lower frequencies are at the bottom, while higher frequencies are at the top.</li>
  </ul>

  <strong>Color Intensity:</strong>
  <ul>
    <li>Colors indicate the amplitude (energy) of the frequencies at each point in time.</li>
    <li><strong>Yellow/Orange:</strong> High energy (louder sounds).</li>
    <li><strong>Purple:</strong> Low energy (quieter sounds).</li>
    <li>The color bar on the right represents energy levels in decibels (dB), ranging from -80 dB (lowest) to 0 dB (highest).</li>
  </ul>

  <strong>Purpose:</strong>
  <ul>
    <li>Converts raw audio into a format that is easier for machine learning models to process.</li>
    <li>Focuses on frequencies most relevant to human hearing, making it ideal for applications like music genre classification, speech recognition, and sound detection.</li>
  </ul>

  <strong>Relevance to Music Genre Classification:</strong>
  <ul>
    <li>Different music genres exhibit unique patterns and frequency characteristics in their spectrograms.</li>
    <li>For example:
      <ul>
        <li><strong>Classical music:</strong> Shows smoother, lower energy distributions.</li>
        <li><strong>Rock music:</strong> Displays high-intensity bursts across a broader frequency range.</li>
      </ul>
    </li>
    <li>By analyzing these patterns, machine learning models can predict the genre with accuracy.</li>
  </ul>
</div>


              </div>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Genre Distribution</h3>
               
              
              </div>
              
              <p className="text-gray-700">
  Our model is trained on a diverse dataset of labeled music tracks, enabling it to recognize a wide range of music genres with high accuracy. The genres include:
</p>
<ul className="text-gray-700 ml-4 list-disc">
  <li><strong>Pop:</strong> Known for its catchy melodies and widespread appeal.</li>
  <li><strong>Rock:</strong> Characterized by electric guitars, strong beats, and dynamic vocals.</li>
  <li><strong>Hip-Hop:</strong> Features rhythmic speech (rap) over beats and loops.</li>
  <li><strong>Classical:</strong> A genre rooted in complex compositions and orchestral arrangements.</li>
  <li><strong>Jazz:</strong> Emphasizes improvisation, swing, and blue notes.</li>
  <li><strong>Electronic:</strong> Focuses on synthetic sounds and beats created using electronic instruments.</li>
  <li><strong>Country:</strong> Defined by storytelling lyrics and acoustic instruments like guitars and banjos.</li>
  <li><strong>Reggae:</strong> Originates from Jamaica and is known for its offbeat rhythms and laid-back feel.</li>
  <li><strong>Blues:</strong> Features expressive vocals and melancholic melodies, often with a 12-bar structure.</li>
  <li><strong>R&B (Rhythm and Blues):</strong> Combines soulful vocals with funk and pop influences.</li>
</ul>
<p className="text-gray-700">
  By analyzing the unique patterns and features of these genres, our model delivers precise and reliable classifications, ensuring an engaging music identification experience for users.
</p>

            </div>
          </TabsContent>
          
          <TabsContent value="identification" className="mt-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-semibold mb-6 text-purple-700">Song Identification</h2>
              
              <p className="text-gray-700 mb-6">
                Our Song Identification feature allows users to find detailed information about songs. Here's how it works:
              </p>
              
              <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
                <li>User Input: Users can search for songs by name, artist, or lyrics.</li>
                <li>API Integration: We use the Spotify API to fetch comprehensive song information.</li>
                <li>Data Retrieval: The system retrieves details like artist name, album, release year, and genre.</li>
                <li>Display: The information is presented in a user-friendly format, including album artwork when available.</li>
              </ol>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-purple-600">Song Information Display</h3>
                <Image 
                  src="/s.png?height=300&width=500" 
                  alt="Example of song information display" 
                  width={500} 
                  height={300} 
                  className="rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2">Fig 3: Example of how song information is displayed to users</p>
              </div>
              
              <p className="text-gray-700">
                Our song identification feature provides a seamless way for users to explore and learn more about their favorite music, discover new artists, and get accurate information about songs they hear.
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Whether you're curious about a song's genre or need detailed information about a track, our Music Analysis Hub has you covered.
          </p>
        </div>
      </div>
    </div>
  )
}

