'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HomeIcon, ChatBubbleLeftRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

export default function Header() {
  const [offset, setOffset] = useState(0)
  const notes = [
    { top: '20%', left: '10%', fontSize: '12px', delay: '0s' },
    { top: '40%', left: '30%', fontSize: '18px', delay: '1s' },
    { top: '60%', left: '50%', fontSize: '15px', delay: '2s' },
    { top: '30%', left: '70%', fontSize: '20px', delay: '1.5s' },
    { top: '50%', left: '90%', fontSize: '14px', delay: '0.5s' },
  ]

  useEffect(() => {
    const animateNotes = () => {
      setOffset((prevOffset) => (prevOffset + 0.5) % 100)
      requestAnimationFrame(animateNotes)
    }
    animateNotes()
  }, [])

  return (
    <header className="relative bg-gradient-to-r from-purple-700 to-indigo-800 text-white overflow-hidden">
      <div className="absolute inset-0">
        {notes.map((note, i) => (
          <div
            key={i}
            className="absolute text-white opacity-30"
            style={{
              fontSize: note.fontSize,
              left: `calc(${note.left} + ${offset}px)`,
              top: note.top,
              animation: `float 20s ease-in-out infinite`,
              animationDelay: note.delay,
            }}
          >
            ♪
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <Link href="/" className="text-2xl font-bold flex items-center bg-purple-900 bg-opacity-50 px-4 py-2 rounded-lg shadow-lg">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
          <span className="hidden md:inline">Music Genre Classifier</span>
        </Link>
        <nav className="bg-purple-900 bg-opacity-50 px-4 py-2 rounded-lg shadow-lg">
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-purple-200 transition-colors">
                <HomeIcon className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className="hover:text-purple-200 transition-colors">
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
              </Link>
            </li>
            <li>
              <Link href="/song-details" className="hover:text-purple-200 transition-colors">
                <InformationCircleIcon className="h-6 w-6" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

