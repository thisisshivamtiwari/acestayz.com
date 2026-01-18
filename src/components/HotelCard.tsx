import React from 'react'
import { Link } from 'react-router-dom'

export interface Hotel {
  id: number
  image: string
  title: string
  location: string
  description: string
  rating?: number
  price?: number
  amenities?: string[]
  slug?: string
}

interface HotelCardProps {
  hotel: Hotel
  variant?: 'default' | 'compact' | 'featured'
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, variant = 'default' }) => {
  const hotelSlug = hotel.slug || hotel.title.toLowerCase().replace(/\s+/g, '-')

  if (variant === 'compact') {
    return (
      <Link
        to={`/hotel/${hotelSlug}`}
        className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-terracotta-dark/80 via-terracotta/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          {hotel.rating && (
            <div className="absolute top-3 right-3 bg-gold-dust/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs font-bold text-charcoal">{hotel.rating}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-terracotta-dark mb-1 font-serif group-hover:text-gold-dust transition-colors duration-300">
            {hotel.title}
          </h3>
          <p className="text-charcoal/70 text-xs mb-2 flex items-center gap-1">
            <svg className="w-3 h-3 text-terracotta" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {hotel.location}
          </p>
          {hotel.price && (
            <div className="mt-auto pt-2">
              <span className="text-terracotta-dark font-bold text-lg">₹{hotel.price.toLocaleString()}</span>
              <span className="text-charcoal/60 text-xs">/night</span>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/hotel/${hotelSlug}`}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-700 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-terracotta-dark/90 via-terracotta/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
        
        {/* Location Badge */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gold-dust/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-gold-dust-dark/30 shadow-lg">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span className="text-[10px] sm:text-xs md:text-sm font-medium text-charcoal truncate max-w-[140px] sm:max-w-none">
              {hotel.location}
            </span>
          </div>
        </div>

        {/* Rating Badge */}
        {hotel.rating && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-cream/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 border border-gold-dust/30 shadow-lg">
            <svg className="w-4 h-4 text-gold-dust" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-bold text-charcoal">{hotel.rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 bg-cream/95 backdrop-blur-sm flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-terracotta-dark mb-2 sm:mb-3 font-serif group-hover:text-gold-dust transition-colors duration-300">
          {hotel.title}
        </h3>
        <p className="text-charcoal/80 text-xs sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-4 flex-1">
          {hotel.description}
        </p>

        {/* Amenities */}
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-terracotta/10 text-terracotta rounded-full border border-terracotta/20"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-xs px-2 py-1 bg-terracotta/10 text-terracotta rounded-full border border-terracotta/20">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-terracotta/10">
          {hotel.price && (
            <div>
              <span className="text-terracotta-dark font-bold text-xl sm:text-2xl">₹{hotel.price.toLocaleString()}</span>
              <span className="text-charcoal/60 text-sm">/night</span>
            </div>
          )}
          <div className="inline-flex items-center gap-2 text-terracotta font-semibold text-sm hover:gap-3 hover:text-gold-dust transition-all duration-300">
            <span>Explore More</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold-dust via-terracotta to-gold-dust transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
    </Link>
  )
}

export default HotelCard

