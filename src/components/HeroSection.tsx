import React, { useState } from 'react'

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle search functionality here
    console.log('Search query:', searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 z-10"></div>
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670')`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block">Premium</span>
                <span className="block">Accommodation,</span>
                <span className="block text-yellow-400">hello acestayz</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl">
                A platform for premium hotels and homestays for intelligent travelers, 
                at the best locations & rates across India.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Book a Stay in Delhi, Noida, Gurugram..."
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 focus:bg-white transition-all duration-300 shadow-2xl"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-xl font-semibold transition-colors duration-200"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Call to Action */}
            <div className="flex items-center space-x-2 text-yellow-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-semibold">Book Direct for Lowest Prices!</span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">6+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-gray-300">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">15+</div>
                <div className="text-sm text-gray-300">Prime Locations</div>
              </div>
            </div>
          </div>

          {/* Right Content - Property Showcase */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Property Cards */}
              <div className="absolute top-0 right-0 w-80 h-96 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="h-48 rounded-2xl mb-4 overflow-hidden">
                  <img 
                    src="https://acestayz.com/new-img/f1.jpeg" 
                    alt="Luxury Suite Noida" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Luxury Suite - Noida</h3>
                <p className="text-gray-300 text-sm mb-4">Premium 3BHK with modern amenities</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold text-xl">₹4,999/night</span>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>

              <div className="absolute top-20 left-0 w-72 h-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="h-40 rounded-2xl mb-4 overflow-hidden">
                  <img 
                    src="https://acestayz.com/new-img/f1.jpeg" 
                    alt="Studio Apartment Delhi" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">Studio Apartment - Delhi</h3>
                <p className="text-gray-300 text-sm mb-4">Cozy studio with city view</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-bold text-xl">₹2,999/night</span>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
