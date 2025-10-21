import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Square = {
  id: number
  src: string
}

const squareData: Square[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' }, // modern hotel lobby
  { id: 2, src: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // luxury hotel exterior
  { id: 3, src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // hotel room bed
  { id: 4, src: 'https://images.unsplash.com/photo-1560066985-5e0e5d1bd7b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // suite interior
  { id: 5, src: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1325&q=80' }, // poolside
  { id: 6, src: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' }, // cozy bedroom
  { id: 7, src: 'https://images.unsplash.com/photo-1551776235-dde6d4829808?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80' }, // rooftop view
  { id: 8, src: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80' }, // hotel lobby seating
  { id: 9, src: 'https://images.unsplash.com/photo-1546948630-14fc8a1682b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80' }, // modern bathroom
  { id: 10, src: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // boutique hotel
  { id: 11, src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // hotel lounge
  { id: 12, src: 'https://images.unsplash.com/photo-1560066986-85e9a4f4d3a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // double bed room
  { id: 13, src: 'https://images.unsplash.com/photo-1542314831-067c41b2b46f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // pool at night
  { id: 14, src: 'https://images.unsplash.com/photo-1521783593447-5702fcdacb52?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // hotel breakfast area
  { id: 15, src: 'https://images.unsplash.com/photo-1550565091-3135a7a7c9a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }, // beach resort
  { id: 16, src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1820&q=80' } // mountain hotel
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
      className="w-full aspect-square rounded-lg bg-gray-200"
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

  return <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">{squares.map((sq) => sq)}</div>
}

const ShuffleHero: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm font-medium" style={{ color: '#4B9CD3' }}>Discover more</span>
        <h3 className="text-4xl md:text-6xl font-semibold text-gray-900">Stays that inspire</h3>
        <p className="text-base md:text-lg text-gray-700 my-4 md:my-6">
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


