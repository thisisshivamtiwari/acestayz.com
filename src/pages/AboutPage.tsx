import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { FiAward, FiUsers, FiHeart, FiTrendingUp } from 'react-icons/fi'

const AboutPage: React.FC = () => {
  const stats = [
    { icon: <FiAward />, value: '6+', label: 'Years Experience' },
    { icon: <FiUsers />, value: '500+', label: 'Happy Guests' },
    { icon: <FiHeart />, value: '4.9', label: 'Average Rating' },
    { icon: <FiTrendingUp />, value: '3', label: 'Premium Properties' }
  ]

  const values = [
    {
      icon: <FiHeart />,
      title: 'Guest-Centric Approach',
      description: 'We prioritize your comfort and satisfaction above all else, ensuring every stay is memorable.'
    },
    {
      icon: <FiAward />,
      title: 'Quality Excellence',
      description: 'From pristine cleanliness to premium amenities, we maintain the highest standards in hospitality.'
    },
    {
      icon: <FiUsers />,
      title: 'Professional Service',
      description: 'Our dedicated team is available 24/7 to assist you with anything you need during your stay.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Innovation & Growth',
      description: 'We continuously evolve to meet the changing needs of modern travelers in Delhi NCR.'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="relative h-[60vh] min-h-[500px]">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl mb-6">
                About <span style={{ color: '#4B9CD3' }}>ACE STAYZ</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Premium serviced apartments redefining hospitality in Delhi NCR with comfort, style, and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full" style={{ backgroundColor: '#E6F1FA' }}>
                  <div className="text-2xl" style={{ color: '#4B9CD3' }}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#4B9CD3' }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6" style={{ color: '#4B9CD3' }}>
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  ACE STAYZ was born from a vision to provide travelers with more than just a place to stay. We wanted to create a home away from home - where comfort meets convenience, and every detail is thoughtfully curated for your experience.
                </p>
                <p>
                  With over 6 years of experience in the hospitality industry, we've established ourselves as a trusted name in premium serviced apartments across Delhi NCR. Our properties in Gurugram and Delhi are strategically located to provide easy access to business hubs, shopping centers, and cultural landmarks.
                </p>
                <p>
                  What sets us apart is our unwavering commitment to quality and service. From studio apartments to spacious penthouses, each property is equipped with modern amenities including free Wi-Fi, fully functional kitchens, air conditioning, and 24/7 front desk support.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                alt="Luxury hotel room"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Modern hotel lobby"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#4B9CD3' }}>
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at ACE STAYZ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full" style={{ backgroundColor: '#E6F1FA' }}>
                  <div className="text-xl" style={{ color: '#4B9CD3' }}>
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: '#4B9CD3' }}>
              Why Choose ACE STAYZ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the difference that sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Prime Locations</h3>
              <p className="text-gray-600 leading-relaxed">
                Our properties are strategically located in Gurugram and Delhi, providing easy access to corporate offices, metro stations, shopping malls, and major attractions. Whether you're traveling for business or leisure, everything you need is just minutes away.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Modern Amenities</h3>
              <p className="text-gray-600 leading-relaxed">
                Every apartment is equipped with high-speed Wi-Fi, air conditioning, fully functional kitchen, washing machine, smart TV, and comfortable furnishings. We ensure you have everything you need for a comfortable extended stay.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Exceptional Cleanliness</h3>
              <p className="text-gray-600 leading-relaxed">
                We maintain the highest standards of cleanliness and hygiene. Our housekeeping team ensures every apartment is spotless, well-maintained, and ready to welcome you with a fresh, inviting atmosphere.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated team is available round the clock to assist you with check-in, local recommendations, maintenance requests, or any other needs. Your comfort and satisfaction are our top priorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#4B9CD3' }}>
            Ready to Experience ACE STAYZ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book your stay today and discover the perfect blend of comfort, convenience, and hospitality.
          </p>
          <a 
            href="/"
            className="inline-block px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            style={{ backgroundColor: '#4B9CD3' }}
          >
            Explore Our Properties
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutPage
