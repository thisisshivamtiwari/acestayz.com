import React from 'react'
import { Link } from 'react-router-dom'
import { allHotels } from '../utils/hotelData'
import firstHotelImage from '../assets/images/ACE_55/ChatGPTImage.jpg'

const HotelShowcase: React.FC = () => {
  // Get unique locations
  const uniqueLocations = [...new Set(allHotels.map(hotel => hotel.location.split(',')[0].trim()))]
  const locationsList = uniqueLocations.sort().join(', ')

  return (
    <section className="px-4 py-16 w-full bg-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl" style={{ color: '#4B9CD3' }}>
            Our Premium Properties
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-500">
            Discover our premium studio apartments in {locationsList}
          </p>
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {allHotels.map((hotel, index) => (
            <Link 
              to={`/hotel/${hotel.slug}`}
              key={hotel.id} 
              className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg group focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <div className="overflow-hidden h-64">
                <img 
                  src={index === 0 ? firstHotelImage : hotel.image} 
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
      </div>
    </section>
  )
}

export default HotelShowcase
