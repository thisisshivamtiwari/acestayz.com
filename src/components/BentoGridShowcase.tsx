import React, { useState, useRef, useEffect } from 'react'

// ACE 55 Images
import ace55_1 from '../assets/images/ACE_55/IMG_3606-2.jpg'
import ace55_2 from '../assets/images/ACE_55/IMG_3570.jpg'

// ACE 57 Images
import ace57_1 from '../assets/images/ACE_57/IMG_5838-2.jpg'
import ace57_2 from '../assets/images/ACE_57/IMG_5779.jpg'

// Ace Vasant Kunj Images
import aceVK_1 from '../assets/images/Ace_Vasant_Kunj/IMG_8772.jpg'
import aceVK_2 from '../assets/images/Ace_Vasant_Kunj/IMG_7451.jpg'

type GridItem = {
  id: number
  type: 'image' | 'text' | 'logo' | 'testimonial' | 'award'
  content?: string
  imageSrc?: string
  logoSrc?: string
  bgColor?: string
  textColor?: string
  spanClasses: string
  reviewText?: string
  reviewerName?: string
  rating?: number
  brandName?: string
  awardTitle?: string
  awardSubtitle?: string
}

const gridItems: GridItem[] = [
  {
    id: 1,
    type: 'image',
    imageSrc: ace55_1,
    spanClasses: 'col-span-2 row-span-2'
  },
  {
    id: 2,
    type: 'text',
    content: 'Fashionable rooms, well designed',
    bgColor: '#4B9CD3',
    textColor: 'text-white',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    type: 'text',
    content: '4.9 ⭐ Rating',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 4,
    type: 'testimonial',
    brandName: 'Google',
    reviewText: 'Blue themed hotel provides all that we look for during our travel and stay.',
    reviewerName: 'Bloomer',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-2 row-span-1'
  },
  {
    id: 5,
    type: 'image',
    imageSrc: ace57_1,
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 6,
    type: 'testimonial',
    reviewText: "'Always clean & always friendly'",
    reviewerName: 'Aditi Sharma',
    rating: 5,
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 7,
    type: 'image',
    imageSrc: aceVK_1,
    spanClasses: 'col-span-2 row-span-1'
  },
  {
    id: 8,
    type: 'text',
    content: 'Setting a new benchmark for travel',
    bgColor: '#4B9CD3',
    textColor: 'text-white',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 9,
    type: 'image',
    imageSrc: ace55_2,
    spanClasses: 'col-span-1 row-span-2'
  },
  {
    id: 10,
    type: 'text',
    content: '500+ Happy Guests',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 11,
    type: 'image',
    imageSrc: ace57_2,
    spanClasses: 'col-span-2 row-span-1'
  },
  {
    id: 12,
    type: 'award',
    awardTitle: 'Best Hotel Chain for Customer Satisfaction 2023',
    awardSubtitle: 'Hospitality Leaders Awards',
    bgColor: '#4B9CD3',
    textColor: 'text-white',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 13,
    type: 'text',
    content: 'Experience unparalleled comfort',
    bgColor: '#4B9CD3',
    textColor: 'text-white',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 14,
    type: 'image',
    imageSrc: aceVK_2,
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 15,
    type: 'text',
    content: '6+ Years Experience',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-1 row-span-1'
  }
]

const BentoGridShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number | null>(null)

  const itemsPerSlide = 8
  const totalSlides = Math.ceil(gridItems.length / itemsPerSlide)

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % totalSlides)
  }

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < totalSlides - 1

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (!isPaused && totalSlides > 1) {
        intervalRef.current = setInterval(() => {
          setCurrentIndex(prev => (prev + 1) % totalSlides)
        }, 4000) // Auto-advance every 4 seconds
      }
    }

    startAutoScroll()

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

  const renderGridItem = (item: GridItem) => {
    switch (item.type) {
      case 'image':
        return (
          <div className={`relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 ${item.spanClasses}`}>
            <img 
              src={item.imageSrc} 
              alt={`ACE STAYZ property image ${item.id}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )
      case 'text':
        return (
          <div 
            className={`flex items-center justify-center p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 ${item.textColor} ${item.spanClasses} group-hover:scale-105`}
            style={{ backgroundColor: item.bgColor }}
          >
            <p className="text-xl font-bold text-center leading-tight">{item.content}</p>
          </div>
        )
      case 'logo':
        return (
          <div className={`flex items-center justify-center p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 ${item.bgColor} ${item.spanClasses} group-hover:scale-105`}>
            <img 
              src={item.logoSrc} 
              alt={`Logo ${item.id}`} 
              className="max-h-16 max-w-full object-contain filter drop-shadow-sm"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="text-gray-500 text-lg font-semibold">Logo</div>`;
                }
              }}
            />
          </div>
        )
      case 'testimonial':
        return (
          <div className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 ${item.bgColor} ${item.textColor} ${item.spanClasses} group-hover:scale-105`}>
            {item.brandName === 'Google' && (
              <img 
                src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" 
                alt="Google Logo" 
                className="h-8 mb-4 object-contain filter drop-shadow-sm"
              />
            )}
            {item.rating && (
              <div className="flex mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            <p className="text-base text-center mb-3 font-medium leading-relaxed">"{item.reviewText}"</p>
            <p className="text-sm font-semibold text-gray-600">- {item.reviewerName}</p>
          </div>
        )
      case 'award':
        return (
          <div 
            className={`flex flex-col items-center justify-center p-8 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 ${item.textColor} ${item.spanClasses} group-hover:scale-105`}
            style={{ backgroundColor: item.bgColor }}
          >
            <div className="text-6xl mb-4 animate-pulse">🏆</div>
            <p className="text-base font-bold text-center mb-3 leading-tight">{item.awardTitle}</p>
            <p className="text-sm text-center opacity-90 font-medium">{item.awardSubtitle}</p>
          </div>
        )
      default:
        return null
    }
  }


  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#4B9CD3' }}>
            What people say about AceStayz
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Hear from our happy guests and see why they love staying with us.
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            className={`absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
              canGoPrevious 
                ? 'bg-white/90 shadow-2xl hover:shadow-3xl text-gray-700 hover:text-gray-900 hover:scale-110 border border-gray-200' 
                : 'bg-gray-100/50 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm ${
              canGoNext 
                ? 'bg-white/90 shadow-2xl hover:shadow-3xl text-gray-700 hover:text-gray-900 hover:scale-110 border border-gray-200' 
                : 'bg-gray-100/50 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bento Grid Slider */}
          <div ref={containerRef} className="overflow-hidden rounded-3xl shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[500px] p-6 bg-white/80 backdrop-blur-sm">
                    {gridItems.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide).map((item) => (
                      <div key={item.id} className="group">
                        {renderGridItem(item)}
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

export default BentoGridShowcase
