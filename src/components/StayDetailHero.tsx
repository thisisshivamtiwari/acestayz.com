import React, { useState } from 'react'
import { FiMapPin, FiStar, FiCalendar } from 'react-icons/fi'
 

interface StayDetailHeroProps {
  locationName: string
  fullLocationName: string
  description: string
  heroImage: string
  averageRating: number
  totalReviews: number
  highlights: string[]
  bestTimeToVisit: string
}

const StayDetailHero: React.FC<StayDetailHeroProps> = ({
  locationName,
  description,
  heroImage,
  averageRating,
  totalReviews,
  highlights,
  bestTimeToVisit,
}) => {
  const [showBookingBar] = useState(false)


  return (
    <section className={`relative w-full overflow-hidden transition-all duration-500 ${
      showBookingBar ? 'min-h-[800px] sm:min-h-[900px]' : 'h-[70vh] min-h-[500px] sm:min-h-[600px] md:min-h-[700px]'
    }`}>
      {/* Background Image */}
      <br/>
      <br/>
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt={locationName}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70"></div>
      </div>

      {/* Content */}
      <div className={`relative h-full flex flex-col items-start justify-end px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-500 ${
        showBookingBar ? 'pb-80 sm:pb-96' : 'pb-12 sm:pb-16 md:pb-20'
      }`}>
        {/* Location Name */}
        <div className="mb-3 sm:mb-4 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-dust/90 backdrop-blur-sm rounded-full border border-gold-dust-dark/30 shadow-lg mb-3 sm:mb-4">
            <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal" />
            <span className="text-xs sm:text-sm font-semibold text-charcoal">{locationName}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            <span className="block font-sans">Explore</span>
            <span className="block" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              {locationName}
            </span>
          </h1>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-cream/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
            <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dust fill-current" />
            <span className="text-base sm:text-lg font-bold text-charcoal">{averageRating}</span>
            <span className="text-xs sm:text-sm text-charcoal/70">({totalReviews.toLocaleString()} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl mb-4 sm:mb-6 leading-relaxed">
          {description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {highlights.map((highlight, index) => (
            <span
              key={index}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-cream/20 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium border border-white/30"
            >
              {highlight}
            </span>
          ))}
        </div>

        {/* Best Time to Visit */}
        <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm mb-4 sm:mb-6 md:mb-8">
          <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
          <span>Best time to visit: <strong>{bestTimeToVisit}</strong></span>
        </div>

      
      </div>

    </section>
  )
}

export default StayDetailHero

