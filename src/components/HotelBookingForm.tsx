import React, { useState, useRef, useEffect } from 'react'
import { FiCalendar, FiUsers, FiHome, FiSearch } from 'react-icons/fi'
import { formatDate } from '../utils/helpers'

interface HotelBookingFormProps {
  hotelName: string
  hotelLocation: string
  onBook?: (bookingData: {
    checkIn: string
    checkOut: string
    guests: number
    rooms: number
    roomType: number
    mealPlan: number
  }) => void
}

const HotelBookingForm: React.FC<HotelBookingFormProps> = ({ hotelName, hotelLocation, onBook }) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('2')
  const [rooms, setRooms] = useState('1')
  const [roomType] = useState('')
  const [mealPlan] = useState('')
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false)
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false)

  const checkInCalendarRef = useRef<HTMLDivElement>(null)
  const checkOutCalendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const getMinCheckOut = () => {
    if (checkIn) {
      const checkInDate = new Date(checkIn)
      checkInDate.setDate(checkInDate.getDate() + 1)
      return checkInDate
    }
    return today
  }

  const minCheckOut = getMinCheckOut()

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return ''
    return formatDate(dateString, 'short')
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onBook && checkIn && checkOut && roomType && mealPlan) {
      onBook({
        checkIn,
        checkOut,
        guests: parseInt(guests) || 2,
        rooms: parseInt(rooms) || 1,
        roomType: parseInt(roomType),
        mealPlan: parseInt(mealPlan),
      })
    }
  }

  return (
    <section id="booking-section" className="relative py-12 sm:py-16 lg:py-20 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-terracotta/30 p-6 sm:p-8 lg:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-terracotta-dark mb-6 font-serif text-center">
            Book Your Stay
          </h2>
          <p className="text-center text-charcoal/70 mb-8">
            {hotelName}, {hotelLocation}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Check-In Date */}
              <div className="relative" ref={checkInCalendarRef}>
                <label className="block text-sm font-semibold text-terracotta-dark mb-2">
                  Check-In
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckInCalendar(!showCheckInCalendar)
                    setShowCheckOutCalendar(false)
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
                    <span className={checkIn ? 'text-charcoal text-sm' : 'text-charcoal/50 text-sm'}>
                      {checkIn ? formatDisplayDate(checkIn) : 'Select Date'}
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
                <label className="block text-sm font-semibold text-terracotta-dark mb-2">
                  Check-Out
                </label>
                <button
                  type="button"
                  onClick={() => {
                    if (checkIn) {
                      setShowCheckOutCalendar(!showCheckOutCalendar)
                      setShowCheckInCalendar(false)
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
                    <span className={checkOut ? 'text-charcoal text-sm' : 'text-charcoal/50 text-sm'}>
                      {checkOut ? formatDisplayDate(checkOut) : 'Select Date'}
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Guests */}
              <div>
                <label className="block text-sm font-semibold text-terracotta-dark mb-2">
                  Guests
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    min="1"
                    max="20"
                    className="w-full pl-10 pr-4 py-3 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Rooms */}
              <div>
                <label className="block text-sm font-semibold text-terracotta-dark mb-2">
                  Rooms
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terracotta pointer-events-none" />
                  <input
                    type="number"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    min="1"
                    max="10"
                    className="w-full pl-10 pr-4 py-3 bg-white/95 border-2 border-terracotta/30 rounded-lg text-charcoal font-medium text-sm focus:outline-none focus:border-gold-dust focus:ring-2 focus:ring-gold-dust/30 transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-gold-dust px-8 py-4 rounded-lg font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 mt-6"
            >
              <FiSearch className="w-5 h-5" />
              <span>Check Availability & Book</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default HotelBookingForm

