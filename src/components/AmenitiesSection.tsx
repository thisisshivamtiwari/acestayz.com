import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  FiWifi,
  FiDroplet,
  FiCoffee,
  FiMapPin,
  FiLock,
  FiTv,
  FiWind,
  FiUmbrella,
  FiActivity,
  FiHeart,
  FiShield,
  FiZap,
} from 'react-icons/fi'

interface AmenitiesSectionProps {
  amenities: string[]
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ amenities }) => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { elementRef: amenitiesRef, isVisible: amenitiesVisible } = useScrollAnimation()

  // Icon mapping for common amenities
  const getIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return FiWifi
    if (lowerAmenity.includes('pool')) return FiDroplet
    if (lowerAmenity.includes('restaurant') || lowerAmenity.includes('dining') || lowerAmenity.includes('food')) return FiCoffee
    if (lowerAmenity.includes('parking')) return FiMapPin
    if (lowerAmenity.includes('safe') || lowerAmenity.includes('security')) return FiLock
    if (lowerAmenity.includes('tv') || lowerAmenity.includes('television')) return FiTv
    if (lowerAmenity.includes('air') || lowerAmenity.includes('ac') || lowerAmenity.includes('heating')) return FiWind
    if (lowerAmenity.includes('spa') || lowerAmenity.includes('wellness')) return FiHeart
    if (lowerAmenity.includes('service') || lowerAmenity.includes('room service')) return FiShield
    if (lowerAmenity.includes('bar') || lowerAmenity.includes('drink')) return FiUmbrella
    if (lowerAmenity.includes('gym') || lowerAmenity.includes('fitness')) return FiActivity
    if (lowerAmenity.includes('power') || lowerAmenity.includes('electric')) return FiZap
    return FiZap // Default icon
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-terracotta-texture overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-dust/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-dust/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4">
            <span className="block font-sans">Amenities &</span>
            <span className="block text-gold-dust" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              Facilities
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-cream/90 max-w-3xl mx-auto leading-relaxed">
            Everything you need for a comfortable and memorable stay.
          </p>
        </div>

        {/* Amenities Grid */}
        <div
          ref={amenitiesRef}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 transition-all duration-1000 ${
            amenitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {amenities.map((amenity, index) => {
            const Icon = getIcon(amenity)
            return (
              <div
                key={index}
                className="bg-cream/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center hover:bg-cream hover:scale-105 transition-all duration-300 border-2 border-terracotta/10 hover:border-gold-dust/30 shadow-lg"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold-dust/20 flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold-dust" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-terracotta-dark leading-tight">
                    {amenity}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AmenitiesSection

