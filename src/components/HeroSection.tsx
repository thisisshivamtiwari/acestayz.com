import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allHotels, locationData } from '../utils/hotelData'

const HeroSection: React.FC = () => {
  const [featuredHotels, setFeaturedHotels] = useState<typeof allHotels>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [availableCities, setAvailableCities] = useState<string[]>([])

  useEffect(() => {
    const loadFeaturedHotels = () => {
      // Get navigation items from localStorage
      const navItems = localStorage.getItem('navigationItems')
      
      if (navItems) {
        try {
          const parsedItems = JSON.parse(navItems)
          const cities = parsedItems
            .filter((item: any) => item.type === 'city')
            .map((item: any) => item.name)
            .sort() // Sort alphabetically
          
          // Capitalize city names for display
          const displayCities = cities.map((city: string) => 
            city.charAt(0).toUpperCase() + city.slice(1)
          )
          setAvailableCities(displayCities)
          
          // Get hotels from available cities
          const hotels: typeof allHotels = []
          let totalCount = 0
          cities.forEach((city: string) => {
            const cityHotels = allHotels.filter(hotel => 
              hotel.location.toLowerCase().includes(city.toLowerCase())
            )
            totalCount += cityHotels.length
            if (cityHotels.length > 0) {
              hotels.push(cityHotels[0]) // Take first hotel from each city
            }
          })
          
          // Take up to 2 hotels
          setFeaturedHotels(hotels.slice(0, 2))
        } catch (error) {
          console.error('Error parsing navigation items:', error)
          // Fallback to showing hotels from locationData
          const availableLocations = Object.keys(locationData).sort()
          const displayCities = availableLocations.map(loc => 
            locationData[loc].name
          )
          setAvailableCities(displayCities)
          
          const hotels: typeof allHotels = []
          
          let totalCount = 0
          availableLocations.forEach(location => {
            const locationHotels = locationData[location].hotels
            totalCount += locationHotels.length
            if (locationHotels.length > 0) {
              hotels.push(locationHotels[0])
            }
          })
          
          setFeaturedHotels(hotels.slice(0, 2))
        }
      } else {
        // Fallback to showing hotels from locationData
        const availableLocations = Object.keys(locationData).sort()
        const displayCities = availableLocations.map(loc => 
          locationData[loc].name
        )
        setAvailableCities(displayCities)
        
        const hotels: typeof allHotels = []
        let totalCount = 0
        
        availableLocations.forEach(location => {
          const locationHotels = locationData[location].hotels
          totalCount += locationHotels.length
          if (locationHotels.length > 0) {
            hotels.push(locationHotels[0])
          }
        })
        
        setFeaturedHotels(hotels.slice(0, 2))
      }
    }

    // Load initially
    loadFeaturedHotels()

    // Listen for storage changes (when admin updates navigation)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'navigationItems') {
        loadFeaturedHotels()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom event from same window
    const handleNavigationUpdate = () => {
      loadFeaturedHotels()
    }
    
    window.addEventListener('navigationUpdated', handleNavigationUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('navigationUpdated', handleNavigationUpdate)
    }
  }, [])

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
            //backgroundImage: `url('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2670')`
            backgroundImage: `url('https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274')`
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
                <span className="block" style={{color: '#4B9CD3'}}>hello acestayz</span>
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
                    placeholder={`Book a Stay in ${availableCities.length > 0 ? availableCities.join(', ') : 'Delhi, Gurugram'}...`}
                    className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:bg-white transition-all duration-300 shadow-2xl" style={{'--tw-ring-color': '#4B9CD3'} as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200" style={{backgroundColor: '#4B9CD3'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#001a4d'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4B9CD3'}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Call to Action */}
            <div className="flex items-center space-x-2" style={{color: '#4B9CD3'}}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-semibold">Book Direct for Lowest Prices!</span>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#4B9CD3'}}>6+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#4B9CD3'}}>500+</div>
                <div className="text-sm text-gray-300">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#4B9CD3'}}>
                  {availableCities.length > 0 ? `${availableCities.length}+` : '2+'}
                </div>
                <div className="text-sm text-gray-300">Prime Locations</div>
              </div>
            </div>
          </div>

          {/* Right Content - Property Showcase */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Property Card 1 - First Hotel */}
              {featuredHotels[0] && (
                <Link 
                  to={`/hotel/${featuredHotels[0].slug}`}
                  className="absolute top-0 right-0 w-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-4 pb-3 transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-300 block overflow-hidden"
                >
                  <div className="h-40 rounded-2xl mb-2 overflow-hidden">
                    <img 
                      src={featuredHotels[0].image} 
                      alt={featuredHotels[0].title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5 truncate">{featuredHotels[0].title}</h3>
                  <p className="text-gray-300 text-xs mb-2 line-clamp-1 overflow-hidden">{featuredHotels[0].description}</p>
                  <div className="flex items-center justify-end mb-1">
                    {/* <div className="font-bold text-base" style={{color: '#4B9CD3'}}>₹{featuredHotels[0].price?.toLocaleString()}/night</div> */}
                    <span className="inline-block text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap" style={{backgroundColor: '#4B9CD3'}}>
                      Book Stay
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-300 overflow-hidden">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{featuredHotels[0].location}</span>
                  </div>
                </Link>
              )}

              {/* Floating Property Card 2 - Second Hotel */}
              {featuredHotels[1] && (
                <Link 
                  to={`/hotel/${featuredHotels[1].slug}`}
                  className="absolute top-20 left-0 w-72 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-4 pb-3 transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 block overflow-hidden"
                >
                  <div className="h-32 rounded-2xl mb-2 overflow-hidden">
                    <img 
                      src={featuredHotels[1].image} 
                      alt={featuredHotels[1].title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5 truncate">{featuredHotels[1].title}</h3>
                  <p className="text-gray-300 text-xs mb-2 line-clamp-1 overflow-hidden">{featuredHotels[1].description}</p>
                  <div className="flex items-center justify-end mb-1">
                    {/* <div className="font-bold text-base" style={{color: '#4B9CD3'}}>₹{featuredHotels[1].price?.toLocaleString()}/night</div> */}
                    <span className="inline-block text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap" style={{backgroundColor: '#4B9CD3'}}>
                      Book Stay
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-300 overflow-hidden">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{featuredHotels[1].location}</span>
                  </div>
                </Link>
              )}
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
