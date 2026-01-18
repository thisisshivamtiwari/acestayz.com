import React, { useState, useRef, useEffect } from 'react'
import { FiMapPin, FiCalendar, FiHome, FiSearch, FiChevronDown } from 'react-icons/fi'
import { formatDate } from '../utils/helpers'

interface VideoHeroProps {
  videoUrl: string
  title?: string
  subtitle?: string
}

const VideoHero: React.FC<VideoHeroProps> = ({
  videoUrl,
  title = 'Your Perfect Stay',
  subtitle = 'Crafted for your moments of togetherness',
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [isReviewExpanded, setIsReviewExpanded] = useState(false)
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false)
  const [city, setCity] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [rooms, setRooms] = useState('1')
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cityDropdownRef = useRef<HTMLDivElement>(null)
  const checkInCalendarRef = useRef<HTMLDivElement>(null)
  const checkOutCalendarRef = useRef<HTMLDivElement>(null)
  const cityButtonRef = useRef<HTMLButtonElement>(null)
  const checkInButtonRef = useRef<HTMLButtonElement>(null)
  const checkOutButtonRef = useRef<HTMLButtonElement>(null)

  const cities = [
    'Manali, Himachal Pradesh',
    'Goa, India',
    'Jaipur, Rajasthan',
    'Rishikesh, Uttarakhand',
    'Udaipur, Rajasthan',
    'Kerala, India',
    'Ooty, Tamil Nadu',
    'Jaisalmer, Rajasthan',
    'Mumbai, Maharashtra',
    'Delhi, India',
  ]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false)
      }
      if (checkInCalendarRef.current && !checkInCalendarRef.current.contains(event.target as Node)) {
        setShowCheckInCalendar(false)
      }
      if (checkOutCalendarRef.current && !checkOutCalendarRef.current.contains(event.target as Node)) {
        setShowCheckOutCalendar(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleToggleReview = () => {
    setIsReviewExpanded(!isReviewExpanded)
  }

  const handleToggleSearchBar = () => {
    setIsSearchBarExpanded(!isSearchBarExpanded)
    // Close all dropdowns when collapsing
    if (isSearchBarExpanded) {
      setShowCityDropdown(false)
      setShowCheckInCalendar(false)
      setShowCheckOutCalendar(false)
    }
  }

  const handleSearch = () => {
    // Handle search functionality
    console.log({ city, checkIn, checkOut, rooms })
  }

  // Get today's date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Get minimum check-out date (day after check-in or today)
  const getMinCheckOut = () => {
    if (checkIn) {
      const checkInDate = new Date(checkIn)
      checkInDate.setDate(checkInDate.getDate() + 1)
      return checkInDate
    }
    return today
  }

  const minCheckOut = getMinCheckOut()

  // Format date for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return ''
    return formatDate(dateString, 'short')
  }

  // Calendar component
  const Calendar: React.FC<{
    selectedDate: string
    onSelectDate: (date: string) => void
    minDate: Date
    isOpen: boolean
    onClose: () => void
  }> = ({ selectedDate, onSelectDate, minDate, isOpen, onClose }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    if (!isOpen) return null

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const handlePrevMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1))
    }

    const handleNextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1))
    }

    const isDateDisabled = (date: Date) => {
      return date < minDate
    }

    const isDateSelected = (date: Date) => {
      if (!selectedDate) return false
      const selected = new Date(selectedDate)
      return (
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
      )
    }

    const handleDateClick = (day: number) => {
      const date = new Date(year, month, day)
      if (!isDateDisabled(date)) {
        onSelectDate(date.toISOString().split('T')[0])
        onClose()
      }
    }

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    return (
      <div className="absolute left-0 w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-terracotta/40 p-4 z-[60] top-full mt-2">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-terracotta/20">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-lg hover:bg-terracotta/10 transition-colors"
            aria-label="Previous month"
          >
            <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-base font-bold text-terracotta font-serif">
            {monthNames[month]} {year}
          </h3>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-lg hover:bg-terracotta/10 transition-colors"
            aria-label="Next month"
          >
            <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-terracotta py-1.5">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const date = new Date(year, month, day)
            const disabled = isDateDisabled(date)
            const selected = isDateSelected(date)

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={disabled}
                className={`aspect-square rounded-lg text-sm font-semibold transition-all duration-200 ${
                  disabled
                    ? 'text-charcoal/20 cursor-not-allowed bg-gray-50'
                    : selected
                    ? 'bg-gold-dust text-charcoal font-bold shadow-lg scale-110 ring-2 ring-gold-dust/50'
                    : 'text-charcoal bg-white hover:bg-terracotta/10 hover:text-terracotta hover:scale-105'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/30 to-charcoal/70"></div>
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-start justify-center px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
        {/* Main Heading */}
        <div
          className={`transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-white leading-none mb-6">
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-wide">
              {title.split(' ').slice(0, -2).join(' ')}
            </span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold -mt-2 sm:-mt-3" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              {title.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
        </div>

        {/* Play Video Button */}
        <button
          onClick={handlePlayVideo}
          className={`group flex items-center gap-3 mt-8 transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.2s' }}
          aria-label={isPlaying ? 'Pause video' : 'Play full video'}
        >
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
            {isPlaying ? (
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            
            {/* Ripple Effect */}
            <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75"></span>
          </div>
          <span className="text-white font-bold text-sm sm:text-base uppercase tracking-[0.2em] group-hover:text-gold-dust transition-colors duration-300">
            Play Full Video
          </span>
        </button>

        {/* Subtitle with Book Now Button */}
        <div
          className={`mt-12 transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <p className="text-white/90 text-xs sm:text-sm uppercase tracking-[0.3em] font-medium mb-6">
            {subtitle}
          </p>
          
          {/* Book Now Button */}
          <button
            onClick={handleToggleSearchBar}
            className="relative px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-charcoal shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #EEC9C5 50%, #D4AF37 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 3s ease infinite, pulse-glow 2s ease-in-out infinite',
            }}
            aria-label={isSearchBarExpanded ? 'Close search bar' : 'Book your stay'}
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
              <span className="text-charcoal">{isSearchBarExpanded ? 'Close' : 'Book Now'}</span>
              <svg 
                className={`w-4 h-4 text-charcoal transition-transform duration-300 ${
                  isSearchBarExpanded ? 'rotate-180' : 'group-hover:translate-x-1'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Horizontal Search Bar - Collapsible */}
        <div
          className={`mt-6 w-full max-w-6xl transition-all duration-500 ease-in-out overflow-hidden ${
            isSearchBarExpanded
              ? 'max-h-[600px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4'
          }`}
        >
          <div className="bg-cream/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-terracotta/30 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {/* City Selector */}
              <div className="relative" ref={cityDropdownRef}>
                <button
                  ref={cityButtonRef}
                  type="button"
                  onClick={() => {
                    setShowCityDropdown(!showCityDropdown)
                    setShowCheckInCalendar(false)
                    setShowCheckOutCalendar(false)
                  }}
                  className="w-full pl-10 pr-8 py-3 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 cursor-pointer hover:border-terracotta/50 hover:bg-white text-left flex items-center justify-between shadow-sm"
                  aria-label="Select city"
                >
                  <div className="flex items-center gap-2">
                    <FiMapPin className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <span className={city ? 'text-charcoal text-sm truncate' : 'text-charcoal/50 text-sm'}>
                      {city || 'Select City'}
                    </span>
                  </div>
                  <FiChevronDown
                    className={`w-4 h-4 text-terracotta transition-transform duration-200 flex-shrink-0 ${
                      showCityDropdown ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* City Dropdown */}
                {showCityDropdown && (
                  <div className="absolute left-0 w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-terracotta/40 max-h-64 overflow-y-auto z-[60] top-full mt-2">
                    {cities.map((cityName) => (
                      <button
                        key={cityName}
                        type="button"
                        onClick={() => {
                          setCity(cityName)
                          setShowCityDropdown(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl flex items-center gap-2 ${
                          city === cityName
                            ? 'bg-gold-dust/20 text-terracotta font-semibold'
                            : 'text-charcoal hover:bg-terracotta/10 hover:text-terracotta'
                        }`}
                      >
                        <FiMapPin className="w-4 h-4 text-terracotta flex-shrink-0" />
                        <span className="text-sm font-medium">{cityName}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Check-In Date */}
              <div className="relative" ref={checkInCalendarRef}>
                <button
                  ref={checkInButtonRef}
                  type="button"
                  onClick={() => {
                    setShowCheckInCalendar(!showCheckInCalendar)
                    setShowCheckOutCalendar(false)
                    setShowCityDropdown(false)
                  }}
                  className={`w-full pl-10 pr-4 py-3 bg-white/95 border-2 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 cursor-pointer hover:border-terracotta/50 hover:bg-white text-left flex items-center justify-between shadow-sm ${
                    showCheckInCalendar
                      ? 'border-gold-dust ring-2 ring-gold-dust/30'
                      : 'border-terracotta/30'
                  }`}
                  aria-label="Select check-in date"
                >
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <span className={checkIn ? 'text-charcoal text-sm truncate' : 'text-charcoal/50 text-sm'}>
                      {checkIn ? formatDisplayDate(checkIn) : 'Check-In'}
                    </span>
                  </div>
                </button>
                <Calendar
                  selectedDate={checkIn}
                  onSelectDate={setCheckIn}
                  minDate={today}
                  isOpen={showCheckInCalendar}
                  onClose={() => setShowCheckInCalendar(false)}
                />
              </div>

              {/* Check-Out Date */}
              <div className="relative" ref={checkOutCalendarRef}>
                <button
                  ref={checkOutButtonRef}
                  type="button"
                  onClick={() => {
                    if (checkIn) {
                      setShowCheckOutCalendar(!showCheckOutCalendar)
                      setShowCheckInCalendar(false)
                      setShowCityDropdown(false)
                    }
                  }}
                  disabled={!checkIn}
                  className={`w-full pl-10 pr-4 py-3 bg-white/95 border-2 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 text-left flex items-center justify-between shadow-sm ${
                    !checkIn
                      ? 'border-terracotta/20 cursor-not-allowed opacity-60'
                      : showCheckOutCalendar
                      ? 'border-gold-dust ring-2 ring-gold-dust/30 cursor-pointer hover:bg-white'
                      : 'border-terracotta/30 cursor-pointer hover:border-terracotta/50 hover:bg-white'
                  }`}
                  aria-label="Select check-out date"
                >
                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-terracotta flex-shrink-0" />
                    <span className={checkOut ? 'text-charcoal text-sm truncate' : 'text-charcoal/50 text-sm'}>
                      {checkOut ? formatDisplayDate(checkOut) : 'Check-Out'}
                    </span>
                  </div>
                </button>
                <Calendar
                  selectedDate={checkOut}
                  onSelectDate={setCheckOut}
                  minDate={minCheckOut}
                  isOpen={showCheckOutCalendar}
                  onClose={() => setShowCheckOutCalendar(false)}
                />
              </div>

              {/* Rooms Selector */}
              <div className="relative">
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    min="1"
                    max="10"
                    placeholder="Rooms"
                    className="w-full pl-10 pr-4 py-3 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 placeholder:text-charcoal/40 hover:border-terracotta/50 hover:bg-white shadow-sm"
                    aria-label="Number of rooms"
                  />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleSearch}
                className="btn-gold-dust px-8 py-3 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-gold-dust/30"
                aria-label="Search for hotels"
              >
                <FiSearch className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide text-charcoal">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Card - Bottom Right */}
      <div
        className={`absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 transition-all duration-1000 ${
          showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
        style={{ transitionDelay: '0.6s' }}
      >
        <div className="bg-cream/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden w-72 sm:w-80 border border-terracotta/20">
          {/* Header - Always Visible */}
          <button
            onClick={handleToggleReview}
            className="w-full bg-gold-dust px-5 py-4 border-b-2 border-gold-dust-dark hover:bg-gold-dust-light transition-colors duration-300"
            aria-label={isReviewExpanded ? 'Collapse review summary' : 'Expand review summary'}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-charcoal font-bold text-sm uppercase tracking-wide">
                Review Summary
              </h3>
              <svg
                className={`w-5 h-5 text-charcoal transition-transform duration-300 ${
                  isReviewExpanded ? 'rotate-180' : ''
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
            </div>
          </button>

          {/* Collapsible Content */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              isReviewExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="p-6 text-center">
              {/* Rating */}
              <div className="mb-3 animate-fade-in">
                <span className="text-6xl font-bold text-charcoal">4.2</span>
                <span className="text-3xl text-charcoal/60 font-light">/5</span>
              </div>

              {/* Status */}
              <p className="text-charcoal font-semibold text-xl mb-2">Very good</p>
              <p className="text-charcoal/60 text-sm mb-5">3,136 reviews</p>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold-dust/10 rounded-full border-2 border-gold-dust/30 hover:border-gold-dust/50 transition-colors duration-300">
                <span className="text-gold-dust font-bold text-sm">TOP 10</span>
                <span className="text-charcoal text-sm font-medium">Hotels in Your City</span>
              </div>

              {/* Star Rating Visual */}
              <div className="flex items-center justify-center gap-1 mt-5">
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-gold-dust fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <svg
                  className="w-5 h-5 text-gold-dust/30 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Collapsed Preview */}
          {!isReviewExpanded && (
            <div className="p-4 text-center animate-fade-in">
              <div className="flex items-center justify-center gap-2">
                <span className="text-3xl font-bold text-charcoal">4.2</span>
                <div className="text-left">
                  <p className="text-charcoal/60 text-xs">Very good</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((star) => (
                      <svg
                        key={star}
                        className="w-3 h-3 text-gold-dust fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                    <svg
                      className="w-3 h-3 text-gold-dust/30 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 hidden sm:block ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDelay: '0.8s' }}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/70 text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <svg
            className="w-5 h-5 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default VideoHero

