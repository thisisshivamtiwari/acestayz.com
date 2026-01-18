import React, { useRef } from 'react'
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation'

const PromoBanner: React.FC = () => {
  const { elementRef, isVisible } = useScrollAnimation()
  const parallaxOffset = useParallax(0.3)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden min-h-[600px]">
      {/* Hotel Video Background with Parallax */}
      <div className="absolute inset-0">
        {/* Fallback image */}
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Hotel"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <video
          ref={videoRef}
          src="https://cdn.pixabay.com/video/2020/02/02/31869-389236273_large.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        {/* Dark overlay for better text readability - more transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={elementRef}
          className={`relative backdrop-blur-2xl bg-cream/15 border-2 border-gold-dust/30 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(245, 240, 230, 0.12) 0%, rgba(238, 201, 197, 0.08) 100%)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-block mb-4 px-4 py-2 bg-gold-dust/20 backdrop-blur-md rounded-full border border-gold-dust/30 shadow-lg">
                <span className="text-gold-dust text-sm font-semibold uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4 drop-shadow-lg">
                <span className="block font-sans">Celebrate Your</span>
                <span 
                  className="block text-gold-dust drop-shadow-lg" 
                  style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}
                >
                  Special Moments
                </span>
              </h2>
              
              <p className="text-cream text-lg sm:text-xl lg:text-2xl mb-6 leading-relaxed drop-shadow-md">
                Book your romantic getaway or family celebration and enjoy{' '}
                <span className="text-gold-dust font-bold">30% OFF</span> on all stays this season.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="btn-gold-dust px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3 group"
                  aria-label="Book now with special offer"
                >
                  <span>Book Now</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
                </button>
                
                <button
                  className="px-8 py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-cream/60 text-cream hover:bg-cream/15 backdrop-blur-md transition-all duration-300 inline-flex items-center justify-center gap-3 group shadow-lg"
                  aria-label="Learn more about the offer"
                >
                  <span>Learn More</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Hotel Video Preview */}
            <div className="relative flex items-center justify-center z-10">
              <div className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl">
                {/* Fallback image */}
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Hotel Interior"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  loading="lazy"
                />
                <video
                  src="https://cdn.pixabay.com/video/2022/10/16/135141-761273478_large.mp4"
                  className="absolute inset-0 w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 hover:scale-110"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                {/* Glassmorphism overlay on video - more transparent */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                {/* Decorative border */}
                <div className="absolute inset-0 border-2 border-gold-dust/30 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PromoBanner

