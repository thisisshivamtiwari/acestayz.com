import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { allHotels, locationData } from '../utils/hotelData'
import heroVideo from '../assets/images/herSecionVid.mp4'
import logoImage from '../assets/images/logo.svg'
import firstCardImage from '../assets/images/ACE_55/ChatGPTImage.jpg'

const ROTATING_PHRASES = ['Celebrations,', 'Corporate,']

const HeroSection: React.FC = () => {
  const [featuredHotels, setFeaturedHotels] = useState<typeof allHotels>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [typewriterText, setTypewriterText] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cityTypewriterText, setCityTypewriterText] = useState('')
  const [cityPhraseIndex, setCityPhraseIndex] = useState(0)
  const [cityIsDeleting, setCityIsDeleting] = useState(false)

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

  // Typewriter effect: cycle between "For Celebrations," and "For Corporate,"
  useEffect(() => {
    const phrase = ROTATING_PHRASES[phraseIndex]
    const typeDelay = isDeleting ? 50 : 100
    const pauseBeforeDelete = 2000
    const isPaused = !isDeleting && typewriterText.length === phrase.length

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < phrase.length) {
          setTypewriterText(phrase.slice(0, typewriterText.length + 1))
        } else {
          setIsDeleting(true)
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(typewriterText.slice(0, -1))
        } else {
          setPhraseIndex((i) => (i + 1) % ROTATING_PHRASES.length)
          setIsDeleting(false)
        }
      }
    }, isPaused ? pauseBeforeDelete : typeDelay)

    return () => window.clearTimeout(timeout)
  }, [typewriterText, phraseIndex, isDeleting])

  // Cities typewriter: cycle through Navbar cities below search bar
  const citiesForTypewriter = availableCities.length > 0 ? availableCities : ['Delhi', 'Gurugram']
  useEffect(() => {
    if (citiesForTypewriter.length === 0) return
    const phrase = citiesForTypewriter[cityPhraseIndex]
    const typeDelay = cityIsDeleting ? 50 : 80
    const pauseBeforeDelete = 1500

    const timeout = window.setTimeout(() => {
      if (!cityIsDeleting) {
        if (cityTypewriterText.length < phrase.length) {
          setCityTypewriterText(phrase.slice(0, cityTypewriterText.length + 1))
        } else {
          setCityIsDeleting(true)
        }
      } else {
        if (cityTypewriterText.length > 0) {
          setCityTypewriterText(cityTypewriterText.slice(0, -1))
        } else {
          setCityPhraseIndex((i) => (i + 1) % citiesForTypewriter.length)
          setCityIsDeleting(false)
        }
      }
    }, cityTypewriterText.length === phrase.length && !cityIsDeleting ? pauseBeforeDelete : typeDelay)

    return () => window.clearTimeout(timeout)
  }, [cityTypewriterText, cityPhraseIndex, cityIsDeleting, availableCities])

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle search functionality here
    console.log('Search query:', searchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <section className="flex overflow-hidden relative justify-center items-center min-h-screen">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/40 to-black/60" aria-hidden />
        <video
          className="object-cover w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-20 px-4 mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                <span className="block min-h-[1.2em]">
                  For {typewriterText}
                  <span className="animate-pulse inline-block w-0.5 h-[0.9em] align-middle ml-0.5 bg-white rounded-sm" aria-hidden />
                </span>
                <span className="flex gap-3 items-center whitespace-nowrap">
                  Hello{' '}
                  <img
                    src={logoImage}
                    alt="AceStayz"
                    className="inline-block w-auto h-20 align-middle md:h-28 lg:h-36"
                  />
                </span>
              </h1>
              
              <p className="max-w-2xl text-xl leading-relaxed text-gray-200 md:text-2xl">
                Your go-to platform for aparthotels and homestays for new-gen travelers, expanding rapidly all across India.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                    <svg
                      className="w-6 h-6 text-gray-400"
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
                    placeholder={`Book a Stay in ${cityTypewriterText}...`}
                    className="py-4 pr-4 pl-12 w-full text-lg placeholder-gray-500 text-gray-900 rounded-2xl border-0 shadow-2xl backdrop-blur-sm transition-all duration-300 bg-white/95 focus:outline-none focus:ring-4 focus:bg-white" style={{'--tw-ring-color': '#4B9CD3'} as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 px-6 py-2 font-semibold text-white rounded-xl transition-colors duration-200 transform -translate-y-1/2" style={{backgroundColor: '#4B9CD3'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#001a4d'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4B9CD3'}
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
                  className="block overflow-hidden absolute top-0 right-0 p-4 pb-3 w-80 rounded-3xl border backdrop-blur-sm transition-all duration-300 transform rotate-3 bg-white/10 border-white/20 hover:rotate-0 hover:scale-105"
                >
                  <div className="overflow-hidden mb-2 h-40 rounded-2xl">
                    <img 
                      src={featuredHotels[0].image} 
                      alt={featuredHotels[0].title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5 truncate">{featuredHotels[0].title}</h3>
                  <p className="overflow-hidden mb-2 text-xs text-gray-300 line-clamp-1">{featuredHotels[0].description}</p>
                  <div className="flex justify-end items-center mb-1">
                    {/* <div className="text-base font-bold" style={{color: '#4B9CD3'}}>₹{featuredHotels[0].price?.toLocaleString()}/night</div> */}
                    <span className="inline-block text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap" style={{backgroundColor: '#4B9CD3'}}>
                      Book Stay
                    </span>
                  </div>
                  <div className="flex overflow-hidden gap-1 items-center text-xs text-gray-300">
                    <svg className="flex-shrink-0 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
                  className="block overflow-hidden absolute left-0 top-20 p-4 pb-3 w-72 rounded-3xl border backdrop-blur-sm transition-all duration-300 transform -rotate-2 bg-white/10 border-white/20 hover:rotate-0 hover:scale-105"
                >
                  <div className="overflow-hidden mb-2 h-32 rounded-2xl">
                    <img 
                      src={firstCardImage} 
                      alt={featuredHotels[1].title} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1.5 truncate">{featuredHotels[1].title}</h3>
                  <p className="overflow-hidden mb-2 text-xs text-gray-300 line-clamp-1">{featuredHotels[1].description}</p>
                  <div className="flex justify-end items-center mb-1">
                    {/* <div className="text-base font-bold" style={{color: '#4B9CD3'}}>₹{featuredHotels[1].price?.toLocaleString()}/night</div> */}
                    <span className="inline-block text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap" style={{backgroundColor: '#4B9CD3'}}>
                      Book Stay
                    </span>
                  </div>
                  <div className="flex overflow-hidden gap-1 items-center text-xs text-gray-300">
                    <svg className="flex-shrink-0 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
      <div className="absolute bottom-8 left-1/2 z-20 transform -translate-x-1/2">
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
