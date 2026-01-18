import React from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import HotelShowcase from '../components/HotelShowcase'
import { getLocationBySlug, allHotels } from '../utils/hotelData'

const StayDetailPage: React.FC = () => {
  const { location } = useParams<{ location: string }>()

  const locationData = location ? getLocationBySlug(location) : null

  if (!locationData) {
    return <Navigate to="/" replace />
  }

  const locationHotels = allHotels.filter(h => 
    h.location.toLowerCase().includes(locationData.name.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="relative h-[50vh] min-h-[400px]">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2274')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>

          <div className="flex relative z-10 justify-center items-center px-4 h-full sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center text-white">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Premium Stays in <span style={{ color: '#4B9CD3' }}>{locationData.name}</span>
              </h1>
              <p className="mt-6 text-xl text-gray-200 md:text-2xl">
                {locationData.description}
              </p>
              
              {/* Quick Info Cards */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                {locationData.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="px-4 py-2 rounded-lg border backdrop-blur-sm bg-white/10 border-white/20"
                  >
                    <span className="text-sm font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 justify-center mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: '#4B9CD3' }}>
                    {locationHotels.length}
                  </div>
                  <div className="text-sm text-gray-300">Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: '#4B9CD3' }}>
                    {locationData.averageRating}
                  </div>
                  <div className="text-sm text-gray-300">Avg Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ color: '#4B9CD3' }}>
                    {locationData.totalReviews}+
                  </div>
                  <div className="text-sm text-gray-300">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl" style={{ color: '#4B9CD3' }}>
              Our Properties in {locationData.name}
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Experience comfort and luxury at our premium serviced apartments
            </p>
          </div>

          {locationHotels.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {locationHotels.map((hotel) => (
                <Link 
                  to={`/hotel/${hotel.slug}`}
                  key={hotel.id} 
                  className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <div className="overflow-hidden h-64">
                    <img 
                      src={hotel.image} 
                      alt={hotel.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-medium leading-tight text-gray-800">{hotel.title}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <p className="flex gap-1 items-center text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {hotel.location}
                      </p>
                      <div className="flex gap-1 items-center">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">{hotel.rating}</span>
                      </div>
                    </div>
                    <p className="mb-3 text-sm text-gray-600 line-clamp-2">{hotel.description}</p>
                    <div className="flex justify-end items-center pt-3 border-t border-gray-100">
                      {/* <p className="text-lg font-semibold" style={{ color: '#4B9CD3' }}>₹{hotel.price?.toLocaleString()}/night</p> */}
                      <span className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors" style={{ backgroundColor: '#4B9CD3' }}>
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="inline-flex justify-center items-center mb-4 w-16 h-16 rounded-full" style={{ backgroundColor: '#E6F1FA' }}>
                <svg className="w-8 h-8" style={{ color: '#4B9CD3' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="mb-4 text-lg text-gray-600">
                No properties available in {locationData.name} at the moment.
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-3 text-sm font-semibold text-white rounded-lg transition-colors"
                style={{ backgroundColor: '#4B9CD3' }}
              >
                Browse All Locations
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Additional Hotels Section */}
      {locationHotels.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-semibold" style={{ color: '#4B9CD3' }}>
                Explore More
              </h2>
              <p className="text-gray-600">
                Discover other premium properties across Delhi NCR
              </p>
            </div>
          </div>
          <HotelShowcase />
        </section>
      )}

      <Footer />
    </div>
  )
}

export default StayDetailPage
