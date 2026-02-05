import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/images/logo.svg'
import delhiImage from '../assets/images/navbarImages/delhi_navbar.png'
import gurguggramImage from '../assets/images/navbarImages/gurgugram_navbar.png'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHotelsDropdownOpen, setIsHotelsDropdownOpen] = useState(false)

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleHotelsMouseEnter = () => {
    setIsHotelsDropdownOpen(true)
  }

  const handleHotelsMouseLeave = () => {
    setIsHotelsDropdownOpen(false)
  }

  // City data with beautiful, high-quality images - sorted alphabetically
  const cities = [
    {
      name: 'Delhi',
      image: delhiImage,
      alt: 'Delhi landmarks and monuments'
    },
    {
      name: 'Gurugram',
      image: gurguggramImage,
      alt: 'Gurugram modern skyline'
    }
  ]

  const leftColumnCities = cities.slice(0, 1)
  const rightColumnCities = cities.slice(1, 2)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" aria-label="AceStayz home">
              <img
                src={logoImage}
                alt="AceStayz"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-baseline space-x-8">
              {/* Hotels Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleHotelsMouseEnter}
                onMouseLeave={handleHotelsMouseLeave}
              >
                <button
                  className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium flex items-center space-x-1 transition-colors duration-200"
                >
                  <span>Hotels</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isHotelsDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isHotelsDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[500px]">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 py-8 overflow-hidden">
                    <div className="grid grid-cols-2 gap-4 px-8">
                      {/* Left Column */}
                      <div className="space-y-3">
                        {leftColumnCities.map((city, index) => (
                          <Link 
                            key={index}
                            to={`/location/${city.name.toLowerCase()}`}
                            className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                          >
                            <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                              <img 
                                src={city.image}
                                alt={city.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{city.name}</span>
                              <div className="text-xs text-gray-500 mt-1">Premium stays available</div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="space-y-3">
                        {rightColumnCities.map((city, index) => (
                          <Link 
                            key={index}
                            to={`/location/${city.name.toLowerCase()}`}
                            className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                          >
                            <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                              <img 
                                src={city.image}
                                alt={city.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{city.name}</span>
                              <div className="text-xs text-gray-500 mt-1">Premium stays available</div>
                            </div>
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              <Link
                to="/about"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="/franchise"
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Franchise Partner
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleToggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/40 backdrop-blur-sm rounded-lg mt-2">
              <Link
                to="/hotels"
                className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              >
                Hotels
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              >
                About Us
              </Link>
              <Link
                to="/franchise"
                className="text-white hover:text-gray-300 block px-3 py-2 text-base font-medium"
              >
                Franchise Partner
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation