import React, { useState } from 'react'
import { FiMapPin, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { DetailedHotel } from '../utils/hotelData'

interface HotelHeroProps {
  hotel: DetailedHotel
}

const HotelHero: React.FC<HotelHeroProps> = ({ hotel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const images = hotel.images && hotel.images.length > 0 ? hotel.images : [hotel.image]

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleBookNow = () => {
    setShowBookingForm(!showBookingForm)
    if (!showBookingForm) {
      setTimeout(() => {
        const bookingSection = document.getElementById('booking-section')
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <section className="relative h-[80vh] min-h-[600px] sm:min-h-[700px] w-full overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={image}
              alt={`${hotel.title} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80 z-20"></div>
      </div>

      {/* Image Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePreviousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/30 transition-all duration-300"
            aria-label="Previous image"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center text-cream hover:bg-cream/30 transition-all duration-300"
            aria-label="Next image"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>
          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-gold-dust w-8'
                    : 'bg-cream/50 hover:bg-cream/70'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col items-start justify-end px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 max-w-7xl mx-auto w-full z-20">
        {/* Location Badge */}
        <div className="mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-dust/90 backdrop-blur-sm rounded-full border border-gold-dust-dark/30 shadow-lg">
            <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal" />
            <span className="text-xs sm:text-sm font-semibold text-charcoal">{hotel.location}</span>
          </div>
        </div>

        {/* Hotel Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">
          <span className="block font-sans">{hotel.title}</span>
        </h1>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-cream/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
            <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-gold-dust fill-current" />
            <span className="text-base sm:text-lg font-bold text-charcoal">{hotel.rating}</span>
            <span className="text-xs sm:text-sm text-charcoal/70">({(hotel as any).totalReviews?.toLocaleString() || '0'} reviews)</span>
          </div>
          {hotel.price && (
            <div className="flex items-center gap-1 bg-cream/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
              <span className="text-base sm:text-lg font-bold text-charcoal">From ₹{hotel.price.toLocaleString()}</span>
              <span className="text-xs sm:text-sm text-charcoal/70">/night</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-3xl mb-4 sm:mb-6 leading-relaxed">
          {hotel.description}
        </p>

        {/* Book Now Button */}
        <button
          onClick={handleBookNow}
          className="relative px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-charcoal shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group whitespace-nowrap"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #EEC9C5 50%, #D4AF37 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite',
          }}
          aria-label="Book your stay"
          onMouseEnter={(e) => {
            e.currentTarget.style.animation = 'gradient-shift 1s ease infinite, pulse-glow 1s ease-in-out infinite, bounce-subtle 0.6s ease'
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animation = 'gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite'
            e.currentTarget.style.transform = 'translateY(0) scale(1)'
          }}
        >
          <span 
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            }}
          ></span>
          <span 
            className="absolute inset-0 rounded-xl opacity-75 pointer-events-none"
            style={{
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',
              animation: 'pulse-ring 2s ease-in-out infinite',
            }}
          ></span>
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
            <span>Book Now</span>
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal transition-transform duration-300 group-hover:translate-x-1"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>
    </section>
  )
}

export default HotelHero

