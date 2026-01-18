import React from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { FiStar, FiAward, FiHeart, FiZap } from 'react-icons/fi'

interface HotelSpecialityProps {
  specialities: string[]
}

const HotelSpeciality: React.FC<HotelSpecialityProps> = ({ specialities }) => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { elementRef: specialitiesRef, isVisible: specialitiesVisible } = useScrollAnimation()

  const icons = [FiStar, FiAward, FiHeart, FiZap]

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-terracotta-dark mb-4">
            <span className="block font-sans">What Makes Us</span>
            <span className="block text-gold-dust" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              Special
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Discover the unique features and experiences that set us apart.
          </p>
        </div>

        {/* Specialities Grid */}
        <div
          ref={specialitiesRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-1000 ${
            specialitiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {specialities.map((speciality, index) => {
            const Icon = icons[index % icons.length]
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-terracotta/10 hover:border-gold-dust/30"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-full bg-gold-dust/20 flex items-center justify-center group-hover:bg-gold-dust/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-gold-dust" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-terracotta-dark mb-3 font-serif group-hover:text-gold-dust transition-colors duration-300">
                  {speciality.split(' - ')[0] || speciality}
                </h3>
                {speciality.includes(' - ') && (
                  <p className="text-charcoal/70 text-sm sm:text-base leading-relaxed">
                    {speciality.split(' - ')[1]}
                  </p>
                )}

                {/* Decorative Element */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-dust via-terracotta to-gold-dust transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HotelSpeciality

