import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStickyNav } from '../hooks/useScrollAnimation'

interface City {
  name: string
  image: string
  href: string
}

interface State {
  name: string
  cities: City[]
}

interface Country {
  name: string
  states: State[]
}

const GlassmorphismNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isStaysExpanded, setIsStaysExpanded] = useState(false)
  const [isStaysHovered, setIsStaysHovered] = useState(false)
  const isScrolled = useStickyNav(50)
  const staysDropdownRef = useRef<HTMLDivElement>(null)
  const staysButtonRef = useRef<HTMLDivElement>(null)
  const staysHoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setIsStaysExpanded(false)
  }

  const handleToggleStays = () => {
    setIsStaysExpanded(!isStaysExpanded)
  }

  // Cities data grouped by country and state
  const staysData: Country[] = [
    {
      name: 'India',
      states: [
        {
          name: 'Himachal Pradesh',
          cities: [
            {
              name: 'Manali',
              image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
              href: '/stays/manali',
            },
            {
              name: 'Shimla',
              image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
              href: '/stays/shimla',
            },
            {
              name: 'Dharamshala',
              image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80',
              href: '/stays/dharamshala',
            },
          ],
        },
        {
          name: 'Rajasthan',
          cities: [
            {
              name: 'Jaipur',
              image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80',
              href: '/stays/jaipur',
            },
            {
              name: 'Udaipur',
              image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80',
              href: '/stays/udaipur',
            },
            {
              name: 'Jaisalmer',
              image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80',
              href: '/stays/jaisalmer',
            },
          ],
        },
        {
          name: 'Goa',
          cities: [
            {
              name: 'North Goa',
              image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
              href: '/stays/north-goa',
            },
            {
              name: 'South Goa',
              image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=400&q=80',
              href: '/stays/south-goa',
            },
          ],
        },
        {
          name: 'Uttarakhand',
          cities: [
            {
              name: 'Rishikesh',
              image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
              href: '/stays/rishikesh',
            },
            {
              name: 'Mussoorie',
              image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
              href: '/stays/mussoorie',
            },
          ],
        },
        {
          name: 'Kerala',
          cities: [
            {
              name: 'Munnar',
              image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80',
              href: '/stays/munnar',
            },
            {
              name: 'Alleppey',
              image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=400&q=80',
              href: '/stays/alleppey',
            },
          ],
        },
        {
          name: 'Tamil Nadu',
          cities: [
            {
              name: 'Ooty',
              image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=400&q=80',
              href: '/stays/ooty',
            },
            {
              name: 'Kodaikanal',
              image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80',
              href: '/stays/kodaikanal',
            },
          ],
        },
        {
          name: 'Maharashtra',
          cities: [
            {
              name: 'Mumbai',
              image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
              href: '/stays/mumbai',
            },
            {
              name: 'Pune',
              image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
              href: '/stays/pune',
            },
          ],
        },
      ],
    },
  ]

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        setIsStaysExpanded(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Handle hover with delay to prevent dropdown from closing when moving between button and dropdown
  const handleStaysMouseEnter = () => {
    if (staysHoverTimeoutRef.current) {
      clearTimeout(staysHoverTimeoutRef.current)
      staysHoverTimeoutRef.current = null
    }
    setIsStaysHovered(true)
  }

  const handleStaysMouseLeave = () => {
    // Add a small delay before closing to allow smooth transition between button and dropdown
    staysHoverTimeoutRef.current = setTimeout(() => {
      setIsStaysHovered(false)
    }, 150)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (staysHoverTimeoutRef.current) {
        clearTimeout(staysHoverTimeoutRef.current)
      }
    }
  }, [])

  // Close dropdown when clicking outside (desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        staysDropdownRef.current &&
        staysButtonRef.current &&
        !staysDropdownRef.current.contains(event.target as Node) &&
        !staysButtonRef.current.contains(event.target as Node)
      ) {
        if (staysHoverTimeoutRef.current) {
          clearTimeout(staysHoverTimeoutRef.current)
        }
        setIsStaysHovered(false)
      }
    }

    if (isStaysHovered) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isStaysHovered])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Celebrate With Us', href: '/celebrate' },
    { label: 'For Couples', href: '/couples' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Glassmorphism Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-cream/80 backdrop-blur-xl shadow-lg border-b border-terracotta/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust focus-visible:ring-offset-2 rounded-lg transition-all duration-300"
              aria-label="AceStayz home"
            >
              <div className="relative">
                <span className={`text-2xl md:text-3xl font-bold font-serif transition-colors duration-300 ${
                  isScrolled ? 'text-terracotta group-hover:text-terracotta-dark' : 'text-white group-hover:text-gold-dust drop-shadow-lg'
                }`}>
                  AceStayz
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-dust group-hover:w-full transition-all duration-300"></span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {/* Stays Dropdown */}
              <div
                ref={staysButtonRef}
                className="relative"
                onMouseEnter={handleStaysMouseEnter}
                onMouseLeave={handleStaysMouseLeave}
              >
                <div
                  className={`relative px-4 py-2 font-bold text-sm transition-all duration-300 rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust cursor-pointer ${
                    isScrolled 
                      ? 'text-charcoal hover:text-terracotta' 
                      : 'text-white hover:text-gold-dust drop-shadow-lg'
                  }`}
                  aria-label="Browse stays by location"
                >
                  <span className="relative z-10 flex items-center gap-1">
                    Stays
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isStaysHovered ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                  <span className={`absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${
                    isScrolled ? 'bg-terracotta/5' : 'bg-white/10'
                  }`}></span>
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    isScrolled ? 'bg-terracotta' : 'bg-gold-dust'
                  }`}></span>
                </div>

                {/* Invisible Bridge to prevent hover gap */}
                {isStaysHovered && (
                  <div
                    className="absolute top-full left-0 w-full h-1 z-[59]"
                    onMouseEnter={handleStaysMouseEnter}
                  />
                )}

                {/* Stays Dropdown Menu */}
                {isStaysHovered && (
                  <div
                    ref={staysDropdownRef}
                    className="absolute top-full left-0 mt-1 w-[600px] bg-cream/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-terracotta/20 p-6 z-[60] max-h-[80vh] overflow-y-auto"
                    onMouseEnter={handleStaysMouseEnter}
                    onMouseLeave={handleStaysMouseLeave}
                  >
                    <div className="space-y-6">
                      {staysData.map((country) => (
                        <div key={country.name} className="space-y-4">
                          <h3 className="text-lg font-bold text-terracotta font-serif border-b border-terracotta/20 pb-2">
                            {country.name}
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {country.states.map((state) => (
                              <div key={state.name} className="space-y-2">
                                <h4 className="text-sm font-semibold text-charcoal/80 uppercase tracking-wide">
                                  {state.name}
                                </h4>
                                <div className="space-y-1">
                                  {state.cities.map((city) => (
                                    <Link
                                      key={city.name}
                                      to={city.href}
                                      onClick={() => setIsStaysHovered(false)}
                                      className="group/city flex items-center gap-3 p-2 rounded-lg hover:bg-terracotta/10 transition-all duration-200"
                                    >
                                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                          src={city.image}
                                          alt={city.name}
                                          className="w-full h-full object-cover group-hover/city:scale-110 transition-transform duration-300"
                                          loading="lazy"
                                        />
                                      </div>
                                      <span className="text-sm font-medium text-charcoal group-hover/city:text-terracotta transition-colors duration-200">
                                        {city.name}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-4 py-2 font-bold text-sm transition-all duration-300 rounded-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust ${
                    isScrolled 
                      ? 'text-charcoal hover:text-terracotta' 
                      : 'text-white hover:text-gold-dust drop-shadow-lg'
                  }`}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className={`absolute inset-0 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 ${
                    isScrolled ? 'bg-terracotta/5' : 'bg-white/10'
                  }`}></span>
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    isScrolled ? 'bg-terracotta' : 'bg-gold-dust'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                className="relative px-6 py-2.5 rounded-xl font-bold text-sm text-charcoal shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group whitespace-nowrap"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #EEC9C5 50%, #D4AF37 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite',
                  minWidth: '120px',
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
                {/* Shimmer Effect */}
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }}
                ></span>
                
                {/* Glow Ring */}
                <span 
                  className="absolute inset-0 rounded-xl opacity-75 pointer-events-none"
                  style={{
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',
                    animation: 'pulse-ring 2s ease-in-out infinite',
                  }}
                ></span>
                
                {/* Button Text */}
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                  <span className="text-charcoal">Book Now</span>
                  <svg 
                    className="w-4 h-4 text-charcoal transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden p-2 rounded-xl hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust ${
                isScrolled ? 'text-charcoal' : 'text-white drop-shadow-lg'
              }`}
              onClick={handleToggleMobileMenu}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-[60] transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Content */}
        <div className="w-80 h-full bg-cream shadow-2xl border-r-2 border-terracotta/30 overflow-y-auto">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b-2 border-terracotta/20 bg-cream">
            <Link
              to="/"
              onClick={handleCloseMobileMenu}
              className="flex items-center gap-2 group"
              aria-label="AceStayz home"
            >
              <span className="text-2xl font-bold font-serif text-terracotta group-hover:text-terracotta-dark transition-colors duration-300">
                AceStayz
              </span>
            </Link>
            <button
              onClick={handleCloseMobileMenu}
              className="p-2 rounded-lg hover:bg-terracotta/10 active:bg-terracotta/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-charcoal"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Menu Items */}
          <div className="p-5 space-y-1 bg-cream">
            {/* Stays Collapsible Section */}
            <div className="space-y-2">
              <button
                onClick={handleToggleStays}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-charcoal font-semibold text-base hover:bg-terracotta/10 hover:text-terracotta active:bg-terracotta/15 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust"
                aria-label="Toggle stays menu"
                aria-expanded={isStaysExpanded}
              >
                <span className="font-bold">Stays</span>
                <svg
                  className={`w-5 h-5 text-terracotta transition-transform duration-300 ${
                    isStaysExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Stays Collapsible Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isStaysExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pl-4 pr-2 space-y-4 mt-2">
                  {staysData.map((country) => (
                    <div key={country.name} className="space-y-3">
                      <h3 className="text-base font-bold text-terracotta font-serif border-b border-terracotta/20 pb-1">
                        {country.name}
                      </h3>
                      <div className="space-y-3">
                        {country.states.map((state) => (
                          <div key={state.name} className="space-y-2">
                            <h4 className="text-xs font-bold text-charcoal/80 uppercase tracking-wider">
                              {state.name}
                            </h4>
                            <div className="space-y-1.5">
                              {state.cities.map((city) => (
                                <Link
                                  key={city.name}
                                  to={city.href}
                                  onClick={handleCloseMobileMenu}
                                  className="group/city flex items-center gap-3 p-2.5 rounded-lg hover:bg-terracotta/10 active:bg-terracotta/15 transition-all duration-200"
                                >
                                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md border border-terracotta/10">
                                    <img
                                      src={city.image}
                                      alt={city.name}
                                      className="w-full h-full object-cover group-hover/city:scale-110 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                  </div>
                                  <span className="text-sm font-semibold text-charcoal group-hover/city:text-terracotta transition-colors duration-200">
                                    {city.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Nav Items */}
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-3.5 rounded-xl text-charcoal font-semibold text-base hover:bg-terracotta/10 hover:text-terracotta active:bg-terracotta/15 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust animate-fade-in"
                onClick={handleCloseMobileMenu}
                aria-label={`Navigate to ${item.label}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile CTA Button */}
            <div className="pt-6 pb-2">
              <button
                className="relative w-full px-6 py-4 rounded-xl font-bold text-charcoal shadow-xl hover:shadow-2xl overflow-hidden group whitespace-nowrap transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #EEC9C5 50%, #D4AF37 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite',
                }}
                aria-label="Book your stay"
                onClick={handleCloseMobileMenu}
                onTouchStart={(e) => {
                  e.currentTarget.style.animation = 'gradient-shift 1s ease infinite, pulse-glow 1s ease-in-out infinite, bounce-subtle 0.6s ease'
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.animation = 'gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite'
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                }}
              >
                {/* Shimmer Effect */}
                <span 
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }}
                ></span>
                
                {/* Glow Ring */}
                <span 
                  className="absolute inset-0 rounded-xl opacity-75 pointer-events-none"
                  style={{
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 40px rgba(212, 175, 55, 0.4), 0 0 60px rgba(212, 175, 55, 0.2)',
                    animation: 'pulse-ring 2s ease-in-out infinite',
                  }}
                ></span>
                
                {/* Button Text */}
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                  <span className="text-charcoal">Book Now</span>
                  <svg 
                    className="w-4 h-4 text-charcoal transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50 lg:hidden animate-fade-in"
          onClick={handleCloseMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  )
}

export default GlassmorphismNavbar

