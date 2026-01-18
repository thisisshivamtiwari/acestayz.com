import React, { useState, useRef, useEffect } from 'react'
import { FiMapPin, FiCalendar, FiUsers, FiHome, FiSearch, FiChevronDown } from 'react-icons/fi'
import { formatDate } from '../utils/helpers'

interface BookingSearchBarProps {
  onSearch?: (searchData: {
    city: string
    checkIn: string
    checkOut: string
    guests: number
    rooms: number
  }) => void
  defaultCity?: string
}

const BookingSearchBar: React.FC<BookingSearchBarProps> = ({ onSearch, defaultCity = '' }) => {
  const [city, setCity] = useState(defaultCity)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('')
  const [rooms, setRooms] = useState('')

  // Update city when defaultCity prop changes
  useEffect(() => {
    if (defaultCity) {
      setCity(defaultCity)
    }
  }, [defaultCity])
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)
  const [cityDropdownUpward, setCityDropdownUpward] = useState(false)
  const [checkInCalendarUpward, setCheckInCalendarUpward] = useState(false)
  const [checkOutCalendarUpward, setCheckOutCalendarUpward] = useState(false)
  const [isExpanded, setIsExpanded] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const cityDropdownRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
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

  // Check if dropdown/calendar should open upward
  const checkPosition = (buttonRef: React.RefObject<HTMLElement>, dropdownHeight: number = 300) => {
    if (!buttonRef.current) return false
    
    const rect = buttonRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    
    // If not enough space below but enough space above, open upward
    return spaceBelow < dropdownHeight && spaceAbove > spaceBelow
  }

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

  // Update position when dropdowns/calendars open
  useEffect(() => {
    if (showCityDropdown && cityButtonRef.current) {
      setCityDropdownUpward(checkPosition(cityButtonRef, 256))
    }
  }, [showCityDropdown])

  useEffect(() => {
    if (showCheckInCalendar && checkInButtonRef.current) {
      setCheckInCalendarUpward(checkPosition(checkInButtonRef, 350))
    }
  }, [showCheckInCalendar])

  useEffect(() => {
    if (showCheckOutCalendar && checkOutButtonRef.current) {
      setCheckOutCalendarUpward(checkPosition(checkOutButtonRef, 350))
    }
  }, [showCheckOutCalendar])

  // Recalculate positions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (showCityDropdown && cityButtonRef.current) {
        setCityDropdownUpward(checkPosition(cityButtonRef, 256))
      }
      if (showCheckInCalendar && checkInButtonRef.current) {
        setCheckInCalendarUpward(checkPosition(checkInButtonRef, 350))
      }
      if (showCheckOutCalendar && checkOutButtonRef.current) {
        setCheckOutCalendarUpward(checkPosition(checkOutButtonRef, 350))
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [showCityDropdown, showCheckInCalendar, showCheckOutCalendar])

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        city,
        checkIn,
        checkOut,
        guests: parseInt(guests) || 1,
        rooms: parseInt(rooms) || 1,
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleToggleExpand = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setIsExpanded(!isExpanded)
    setTimeout(() => setIsAnimating(false), 500)
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
    openUpward: boolean
  }> = ({ selectedDate, onSelectDate, minDate, isOpen, onClose, openUpward }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date())

    if (!isOpen) return null

    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Get previous month
    const handlePrevMonth = () => {
      setCurrentMonth(new Date(year, month - 1, 1))
    }

    // Get next month
    const handleNextMonth = () => {
      setCurrentMonth(new Date(year, month + 1, 1))
    }

    // Check if date is disabled
    const isDateDisabled = (date: Date) => {
      return date < minDate
    }

    // Check if date is selected
    const isDateSelected = (date: Date) => {
      if (!selectedDate) return false
      const selected = new Date(selectedDate)
      return (
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear()
      )
    }

    // Handle date click
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
      <div className={`absolute left-0 w-80 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-terracotta/40 p-4 z-[60] ${
        openUpward
          ? 'bottom-full mb-2'
          : 'top-full mt-2'
      }`}>
        {/* Calendar Header */}
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

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-bold text-terracotta py-1.5">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {/* Days of the month */}
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
                    : 'text-charcoal bg-white hover:bg-terracotta/10 hover:text-terracotta hover:scale-105 border border-transparent hover:border-terracotta/20'
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
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 z-40">
      {/* Toggle Button */}
      <button
        onClick={handleToggleExpand}
        className={`absolute top-0 ${
          isExpanded ? 'right-4 sm:right-6 lg:right-8' : 'left-4 sm:left-6 lg:left-8'
        } -translate-y-full mb-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gold-dust/90 hover:bg-gold-dust rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 z-50 group whitespace-nowrap`}
        aria-label={isExpanded ? 'Collapse search bar' : 'Expand search bar'}
        tabIndex={0}
        style={{
          background: isExpanded 
            ? 'linear-gradient(135deg, #D4AF37 0%, #EEC9C5 50%, #D4AF37 100%)'
            : 'linear-gradient(135deg, #D4AF37 0%, #EEC9C5 50%, #D4AF37 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
        }}
      >
        {isExpanded ? (
          <span className="text-charcoal font-bold text-sm flex items-center gap-2">
            <span>Book Your Stay</span>
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        ) : (
          <span className="text-charcoal font-bold text-sm flex items-center gap-2">
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            <span>Book Your Stay</span>
          </span>
        )}
      </button>

      {/* Search Card - Overlay */}
      <div
        ref={searchBarRef}
        className={`bg-cream/75 backdrop-blur-xl rounded-xl shadow-2xl border-2 border-terracotta/40 p-4 sm:p-5 lg:p-5 overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded
            ? 'max-w-full opacity-100'
            : 'max-w-0 opacity-0'
        }`}
        style={{
          clipPath: isExpanded 
            ? 'inset(0% 0% 0% 0%)' 
            : 'inset(0% 0% 0% 100%)',
          transition: 'max-width 500ms ease-in-out, opacity 500ms ease-in-out, clip-path 500ms ease-in-out',
        }}
      >
        <div
          className={`transition-all duration-500 ease-in-out ${
            isExpanded
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-full'
          }`}
          style={{
            transitionDelay: isExpanded ? '0.1s' : '0s',
          }}
        >
          {/* Horizontal Form Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {/* City Selector - Custom Dropdown */}
          <div className="relative lg:col-span-1" ref={cityDropdownRef}>
            <button
              ref={cityButtonRef}
              type="button"
              onClick={() => setShowCityDropdown(!showCityDropdown)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-8 py-2.5 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 cursor-pointer hover:border-terracotta/50 hover:bg-white text-left flex items-center justify-between shadow-sm"
              aria-label="Select city"
              tabIndex={0}
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

            {/* Custom Dropdown */}
            {showCityDropdown && (
              <div className={`absolute left-0 w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border-2 border-terracotta/40 max-h-64 overflow-y-auto z-[60] ${
                cityDropdownUpward 
                  ? 'bottom-full mb-2' 
                  : 'top-full mt-2'
              }`}>
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

          {/* Check-In Date - Custom Calendar */}
          <div className="relative lg:col-span-1" ref={checkInCalendarRef}>
            <button
              ref={checkInButtonRef}
              type="button"
              onClick={() => {
                setShowCheckInCalendar(!showCheckInCalendar)
                setShowCheckOutCalendar(false)
              }}
              onKeyDown={handleKeyDown}
              className={`w-full pl-10 pr-4 py-2.5 bg-white/95 border-2 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 cursor-pointer hover:border-terracotta/50 hover:bg-white text-left flex items-center justify-between shadow-sm ${
                showCheckInCalendar
                  ? 'border-gold-dust ring-2 ring-gold-dust/30'
                  : 'border-terracotta/30'
              }`}
              aria-label="Select check-in date"
              tabIndex={0}
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
              openUpward={checkInCalendarUpward}
            />
          </div>

          {/* Check-Out Date - Custom Calendar */}
          <div className="relative lg:col-span-1" ref={checkOutCalendarRef}>
            <button
              ref={checkOutButtonRef}
              type="button"
              onClick={() => {
                if (checkIn) {
                  setShowCheckOutCalendar(!showCheckOutCalendar)
                  setShowCheckInCalendar(false)
                }
              }}
              onKeyDown={handleKeyDown}
              disabled={!checkIn}
              className={`w-full pl-10 pr-4 py-2.5 bg-white/95 border-2 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 text-left flex items-center justify-between shadow-sm ${
                !checkIn
                  ? 'border-terracotta/20 cursor-not-allowed opacity-60'
                  : showCheckOutCalendar
                  ? 'border-gold-dust ring-2 ring-gold-dust/30 cursor-pointer hover:bg-white'
                  : 'border-terracotta/30 cursor-pointer hover:border-terracotta/50 hover:bg-white'
              }`}
              aria-label="Select check-out date"
              tabIndex={checkIn ? 0 : -1}
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
              openUpward={checkOutCalendarUpward}
            />
          </div>

          {/* Guests Selector */}
          <div className="relative lg:col-span-1">
            <div className="relative">
              <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
              <input
                type="number"
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                onKeyDown={handleKeyDown}
                min="1"
                max="20"
                placeholder="Guests"
                className="w-full pl-10 pr-4 py-2.5 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 placeholder:text-charcoal/40 hover:border-terracotta/50 hover:bg-white shadow-sm"
                aria-label="Number of guests"
                tabIndex={0}
              />
            </div>
          </div>

          {/* Rooms Selector */}
          <div className="relative lg:col-span-1">
            <div className="relative">
              <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
              <input
                type="number"
                id="rooms"
                value={rooms}
                onChange={(e) => setRooms(e.target.value)}
                onKeyDown={handleKeyDown}
                min="1"
                max="10"
                placeholder="Rooms"
                className="w-full pl-10 pr-4 py-2.5 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200 placeholder:text-charcoal/40 hover:border-terracotta/50 hover:bg-white shadow-sm"
                aria-label="Number of rooms"
                tabIndex={0}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleSearch()
              }
            }}
            className="btn-gold-dust px-8 py-2.5 rounded-lg shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-gold-dust/30"
            aria-label="Search for hotels"
            tabIndex={0}
          >
            <FiSearch className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide text-charcoal">Search</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BookingSearchBar
