import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Hotel = {
  id: number
  name: string
  city: string
  price: number
  image: string
}

const hotels: Hotel[] = [
  { id: 1, name: 'AceStayz - Karol Bagh', city: 'Delhi', price: 4725, image: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'AceStayz - Calangute', city: 'Goa', price: 7560, image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'AceStayz - Whitefield', city: 'Bangalore', price: 6230, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'AceStayz - Gurgaon', city: 'Gurugram', price: 5890, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'AceStayz - Koregaon Park', city: 'Pune', price: 4450, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'AceStayz - Baga', city: 'Goa', price: 8120, image: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 7, name: 'AceStayz - Udaipur', city: 'Udaipur', price: 6780, image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 8, name: 'AceStayz - Srinagar', city: 'Srinagar', price: 5340, image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 9, name: 'AceStayz - Rishikesh', city: 'Rishikesh', price: 3890, image: 'https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 10, name: 'AceStayz - Mumbai', city: 'Mumbai', price: 8920, image: 'https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 11, name: 'AceStayz - Chennai', city: 'Chennai', price: 4560, image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 12, name: 'AceStayz - Hyderabad', city: 'Hyderabad', price: 5120, image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
]

const HotelShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number | null>(null)

  const totalSlides = Math.ceil(hotels.length / 8)

  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalSlides)
  }

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < totalSlides - 1

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % totalSlides)
      }, 4000) // Auto-advance every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, totalSlides])

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const navigate = useNavigate()
  const goDetail = () => navigate('/hotel/karol-bagh')
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6" style={{ color: '#4B9CD3' }}>
            AceStayz across India
          </h2>
          <p className="text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Discover premium accommodations in top locations including Mumbai, Bengaluru, Delhi, Gurugram, Pune, Goa, Udaipur, Srinagar & Rishikesh
          </p>
        </div>

        {/* Slider Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
              canGoPrevious 
                ? 'text-white shadow-lg hover:shadow-xl hover:scale-110' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            style={{ backgroundColor: canGoPrevious ? 'rgba(75, 156, 211, 0.9)' : 'rgba(229, 231, 235, 0.8)' }}
            aria-label="Previous hotels"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
              canGoNext 
                ? 'text-white shadow-lg hover:shadow-xl hover:scale-110' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
            style={{ backgroundColor: canGoNext ? 'rgba(75, 156, 211, 0.9)' : 'rgba(229, 231, 235, 0.8)' }}
            aria-label="Next hotels"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Hotel Cards Grid */}
          <div ref={containerRef} className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(hotels.length / 8) }, (_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  {/* Top Row */}
                  <div className="grid grid-cols-4 gap-8 mb-8">
                    {hotels.slice(slideIndex * 8, slideIndex * 8 + 4).map((hotel) => (
                      <div onClick={goDetail} role="link" tabIndex={0} key={hotel.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <div className="h-52 overflow-hidden">
                          <img 
                            src={hotel.image} 
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-medium text-base text-gray-800 mb-2 leading-tight">{hotel.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">{hotel.city}</p>
                            <p className="font-semibold text-green-600 text-sm">From ₹{hotel.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Row */}
                  <div className="grid grid-cols-4 gap-8">
                    {hotels.slice(slideIndex * 8 + 4, slideIndex * 8 + 8).map((hotel) => (
                      <div onClick={goDetail} role="link" tabIndex={0} key={hotel.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <div className="h-52 overflow-hidden">
                          <img 
                            src={hotel.image} 
                            alt={hotel.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-medium text-base text-gray-800 mb-2 leading-tight">{hotel.name}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">{hotel.city}</p>
                            <p className="font-semibold text-green-600 text-sm">From ₹{hotel.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HotelShowcase
