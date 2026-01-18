import React, { useState } from 'react'
import {
  FiSearch,
  FiFilter,
  FiCalendar,
  FiEye
} from 'react-icons/fi'

interface Booking {
  id: string
  bookingId: string
  guestName: string
  guestEmail: string
  guestPhone: string
  hotelId: number
  hotelName: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  rooms: number
  roomType: string
  amount: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  channel: 'Direct' | 'Booking.com' | 'Airbnb' | 'MakeMyTrip' | 'Other'
  paymentStatus: 'paid' | 'pending' | 'refunded'
  bookingDate: string
  specialRequests?: string
}

const Bookings: React.FC = () => {
  // Sample bookings data
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      bookingId: 'BK-2024-001',
      guestName: 'John Doe',
      guestEmail: 'john.doe@example.com',
      guestPhone: '+91 98765 43210',
      hotelId: 1,
      hotelName: 'Mountain View Suite',
      checkIn: '2024-04-15',
      checkOut: '2024-04-18',
      nights: 3,
      guests: 2,
      rooms: 1,
      roomType: 'Deluxe Room',
      amount: 25500,
      status: 'confirmed',
      channel: 'Direct',
      paymentStatus: 'paid',
      bookingDate: '2024-04-10',
      specialRequests: 'Late check-in requested'
    },
    {
      id: '2',
      bookingId: 'BK-2024-002',
      guestName: 'Jane Smith',
      guestEmail: 'jane.smith@example.com',
      guestPhone: '+91 98765 43211',
      hotelId: 2,
      hotelName: 'Coastal Paradise',
      checkIn: '2024-04-20',
      checkOut: '2024-04-25',
      nights: 5,
      guests: 4,
      rooms: 2,
      roomType: 'Beach View Suite',
      amount: 60000,
      status: 'confirmed',
      channel: 'Booking.com',
      paymentStatus: 'paid',
      bookingDate: '2024-04-12'
    },
    {
      id: '3',
      bookingId: 'BK-2024-003',
      guestName: 'Michael Brown',
      guestEmail: 'michael.brown@example.com',
      guestPhone: '+91 98765 43212',
      hotelId: 3,
      hotelName: 'Heritage Elegance',
      checkIn: '2024-04-18',
      checkOut: '2024-04-20',
      nights: 2,
      guests: 2,
      rooms: 1,
      roomType: 'Heritage Suite',
      amount: 19000,
      status: 'pending',
      channel: 'Airbnb',
      paymentStatus: 'pending',
      bookingDate: '2024-04-14'
    },
    {
      id: '4',
      bookingId: 'BK-2024-004',
      guestName: 'Sarah Johnson',
      guestEmail: 'sarah.j@example.com',
      guestPhone: '+91 98765 43213',
      hotelId: 1,
      hotelName: 'Mountain View Suite',
      checkIn: '2024-04-25',
      checkOut: '2024-04-28',
      nights: 3,
      guests: 3,
      rooms: 1,
      roomType: 'Family Room',
      amount: 27000,
      status: 'confirmed',
      channel: 'MakeMyTrip',
      paymentStatus: 'paid',
      bookingDate: '2024-04-15'
    },
    {
      id: '5',
      bookingId: 'BK-2024-005',
      guestName: 'David Wilson',
      guestEmail: 'david.w@example.com',
      guestPhone: '+91 98765 43214',
      hotelId: 2,
      hotelName: 'Coastal Paradise',
      checkIn: '2024-04-10',
      checkOut: '2024-04-12',
      nights: 2,
      guests: 2,
      rooms: 1,
      roomType: 'Standard Room',
      amount: 24000,
      status: 'cancelled',
      channel: 'Direct',
      paymentStatus: 'refunded',
      bookingDate: '2024-04-05'
    },
    {
      id: '6',
      bookingId: 'BK-2024-006',
      guestName: 'Emily Davis',
      guestEmail: 'emily.d@example.com',
      guestPhone: '+91 98765 43215',
      hotelId: 4,
      hotelName: 'Spa & Wellness Retreat',
      checkIn: '2024-04-22',
      checkOut: '2024-04-26',
      nights: 4,
      guests: 2,
      rooms: 1,
      roomType: 'Wellness Suite',
      amount: 30000,
      status: 'completed',
      channel: 'Direct',
      paymentStatus: 'paid',
      bookingDate: '2024-04-08'
    }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [hotelFilter, setHotelFilter] = useState<string>('')
  const [channelFilter, setChannelFilter] = useState<string>('')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('')
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)

  // Get unique hotel names
  const hotelNames = Array.from(new Set(bookings.map(b => b.hotelName)))

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = !statusFilter || booking.status === statusFilter
    const matchesHotel = !hotelFilter || booking.hotelName === hotelFilter
    const matchesChannel = !channelFilter || booking.channel === channelFilter
    const matchesPayment = !paymentStatusFilter || booking.paymentStatus === paymentStatusFilter
    
    return matchesSearch && matchesStatus && matchesHotel && matchesChannel && matchesPayment
  })

  // Calculate statistics
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalRevenue: bookings
      .filter(b => b.status !== 'cancelled' && b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.amount, 0)
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      refunded: 'bg-red-100 text-red-800'
    }
    return styles[status as keyof typeof styles] || styles.pending
  }

  const getChannelBadge = (channel: string) => {
    const styles = {
      'Booking.com': 'bg-blue-50 text-blue-700 border border-blue-200',
      Direct: 'bg-green-50 text-green-700 border border-green-200',
      Airbnb: 'bg-pink-50 text-pink-700 border border-pink-200',
      'MakeMyTrip': 'bg-orange-50 text-orange-700 border border-orange-200',
      Other: 'bg-gray-50 text-gray-700 border border-gray-200'
    }
    return styles[channel as keyof typeof styles] || styles.Other
  }

  const toggleBookingDetails = (bookingId: string) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
        <p className="mt-2 text-gray-600">Manage all bookings across all hotels</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Bookings</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm text-gray-600">Confirmed</div>
          <div className="text-2xl font-bold text-green-600 mt-1">{stats.confirmed}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm text-gray-600">Pending</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm text-gray-600">Cancelled</div>
          <div className="text-2xl font-bold text-red-600 mt-1">{stats.cancelled}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="text-sm text-gray-600">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹{stats.totalRevenue.toLocaleString()}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by booking ID, guest name, email, or hotel..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <FiFilter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Hotel</label>
              <select
                value={hotelFilter}
                onChange={(e) => setHotelFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Hotels</option>
                {hotelNames.map(hotel => (
                  <option key={hotel} value={hotel}>{hotel}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Channel</label>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Channels</option>
                <option value="Direct">Direct</option>
                <option value="Booking.com">Booking.com</option>
                <option value="Airbnb">Airbnb</option>
                <option value="MakeMyTrip">MakeMyTrip</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Payment Status</label>
              <select
                value={paymentStatusFilter}
                onChange={(e) => setPaymentStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Payment Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hotel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in / Check-out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <React.Fragment key={booking.id}>
                    <tr className="transition-colors duration-200 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.bookingId}</div>
                        <div className="text-xs text-gray-500">{booking.bookingDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.guestName}</div>
                        <div className="text-xs text-gray-500">{booking.guestEmail}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{booking.hotelName}</div>
                        <div className="text-xs text-gray-500">{booking.roomType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.checkIn}</div>
                        <div className="text-xs text-gray-500">to {booking.checkOut}</div>
                        <div className="text-xs text-gray-500">{booking.nights} nights</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">₹{booking.amount.toLocaleString()}</div>
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mt-1 ${getPaymentStatusBadge(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelBadge(booking.channel)}`}>
                          {booking.channel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => toggleBookingDetails(booking.id)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                          <FiEye className="w-4 h-4" />
                          {expandedBooking === booking.id ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expandedBooking === booking.id && (
                      <tr>
                        <td colSpan={8} className="px-6 py-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Guest Details</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div><span className="font-medium">Name:</span> {booking.guestName}</div>
                                <div><span className="font-medium">Email:</span> {booking.guestEmail}</div>
                                <div><span className="font-medium">Phone:</span> {booking.guestPhone}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Booking Details</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div><span className="font-medium">Guests:</span> {booking.guests}</div>
                                <div><span className="font-medium">Rooms:</span> {booking.rooms}</div>
                                <div><span className="font-medium">Nights:</span> {booking.nights}</div>
                                <div><span className="font-medium">Room Type:</span> {booking.roomType}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Additional Info</h4>
                              <div className="space-y-1 text-sm text-gray-600">
                                <div><span className="font-medium">Booking Date:</span> {booking.bookingDate}</div>
                                {booking.specialRequests && (
                                  <div>
                                    <span className="font-medium">Special Requests:</span>
                                    <div className="mt-1 text-xs text-gray-500">{booking.specialRequests}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <FiCalendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setStatusFilter('')
                        setHotelFilter('')
                        setChannelFilter('')
                        setPaymentStatusFilter('')
                      }}
                      className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Bookings

