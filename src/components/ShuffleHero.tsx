import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ACE 55 Images
import ace55_1 from '../assets/images/ACE 55/Copy of IMG_3606-2.JPG'
import ace55_2 from '../assets/images/ACE 55/Copy of IMG_3570.jpg'
import ace55_3 from '../assets/images/ACE 55/Copy of IMG_3539.jpg'
import ace55_4 from '../assets/images/ACE 55/Copy of DSC_0254-2.jpg'
import ace55_5 from '../assets/images/ACE 55/Copy of DSC_0236.jpg'
import ace55_6 from '../assets/images/ACE 55/Copy of ChatGPT Image Sep 30, 2025, 04_27_28 PM.jpg'

// ACE 57 Images
import ace57_1 from '../assets/images/ACE 57/Copy of IMG_5838 2.jpg'
import ace57_2 from '../assets/images/ACE 57/Copy of IMG_5828 2.jpg'
import ace57_3 from '../assets/images/ACE 57/Copy of IMG_5779.jpg'
import ace57_4 from '../assets/images/ACE 57/Copy of IMG_3570.jpg'
import ace57_5 from '../assets/images/ACE 57/Copy of DSC_0454.jpg'
import ace57_6 from '../assets/images/ACE 57/Copy of DSC_0384.jpg'

// Ace Vasant Kunj Images
import aceVK_1 from '../assets/images/Ace Vasant Kunj/Copy of IMG_8772.jpg'
import aceVK_2 from '../assets/images/Ace Vasant Kunj/Copy of IMG_8765.jpg'
import aceVK_3 from '../assets/images/Ace Vasant Kunj/Copy of IMG_7451.jpg'
import aceVK_4 from '../assets/images/Ace Vasant Kunj/Copy of IMG_7435.jpg'

type Square = {
  id: number
  src: string
}

const squareData: Square[] = [
  { id: 1, src: ace55_1 },
  { id: 2, src: ace55_2 },
  { id: 3, src: ace55_3 },
  { id: 4, src: ace55_4 },
  { id: 5, src: ace55_5 },
  { id: 6, src: ace55_6 },
  { id: 7, src: ace57_1 },
  { id: 8, src: ace57_2 },
  { id: 9, src: ace57_3 },
  { id: 10, src: ace57_4 },
  { id: 11, src: ace57_5 },
  { id: 12, src: ace57_6 },
  { id: 13, src: aceVK_1 },
  { id: 14, src: aceVK_2 },
  { id: 15, src: aceVK_3 },
  { id: 16, src: aceVK_4 }
]

const shuffle = (array: Square[]): Square[] => {
  const result = [...array]
  let currentIndex = result.length

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    const temp = result[currentIndex]
    result[currentIndex] = result[randomIndex]
    result[randomIndex] = temp
  }

  return result
}

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.2, type: 'spring' }}
      className="w-full bg-gray-200 rounded-lg aspect-square"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      aria-label={`Gallery image ${sq.id}`}
      role="img"
    />
  ))
}

const ShuffleGrid: React.FC = () => {
  const timeoutRef = useRef<number | null>(null)
  const [squares, setSquares] = useState(generateSquares())

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares())
      timeoutRef.current = window.setTimeout(shuffleSquares, 3000)
    }

    shuffleSquares()
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{squares.map((sq) => sq)}</div>
}

const ShuffleHero: React.FC = () => {
  return (
    <section className="grid grid-cols-1 gap-8 items-center px-4 py-12 mx-auto w-full max-w-6xl sm:px-6 lg:px-8 md:grid-cols-2">
      <div>
        <span className="block mb-4 text-xs font-medium md:text-sm" style={{ color: '#4B9CD3' }}>Discover more</span>
        <h3 className="text-4xl font-semibold text-gray-900 md:text-6xl">Stays that inspire</h3>
        <p className="my-4 text-base text-gray-700 md:text-lg md:my-6">
          From boutique homestays to premium suites, explore curated places crafted for comfort and style.
        </p>
        <button
          className="px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200 text-white"
          style={{ backgroundColor: '#4B9CD3' }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#001a4d'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4B9CD3'}
          aria-label="Explore stays"
        >
          Explore stays
        </button>
      </div>
      <ShuffleGrid />
    </section>
  )
}

export default ShuffleHero


