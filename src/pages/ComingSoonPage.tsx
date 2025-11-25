import { useEffect, useState } from 'react'
// import Footer from '../components/Footer'

const ComingSoonPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 flex items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-50 pointer-events-none" />
        
        <div className="max-w-5xl w-full text-center relative z-10">
          <div 
            className={`mx-auto max-w-3xl bg-white border-2 border-blue-200 shadow-2xl rounded-3xl p-8 sm:p-12 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-50 border border-blue-300" style={{ color: '#4B9CD3' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#4B9CD3' }} />
              Crafting Your Perfect Stay
            </div>

            {/* Main Heading */}
            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold text-serif-elegant text-gray-900 leading-tight">
              Something Delightful<br />
              <span style={{ color: '#4B9CD3' }}>Is Cooking</span>
            </h1>

            {/* Emotional Microcopy */}
            <p className="mt-6 text-gray-700 text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-2xl mx-auto">
              We're crafting a better AceStayz experience—<span style={{ color: '#4B9CD3' }}>wrapped in warmth, styled with soul.</span>
            </p>
            <p className="mt-3 text-gray-600 text-sm sm:text-base font-sans italic">
              Crafted for your moments of togetherness.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className={`rounded-2xl p-6 bg-white border-2 border-blue-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`} style={{ animationDelay: '0.1s' }}>
                <div className="text-base font-semibold font-serif mb-2" style={{ color: '#4B9CD3' }}>
                  Smooth Booking
                </div>
                <div className="text-gray-600 text-sm font-sans">
                  Faster, simpler, smarter
                </div>
              </div>
              
              <div className={`rounded-2xl p-6 bg-white border-2 border-blue-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`} style={{ animationDelay: '0.2s' }}>
                <div className="text-base font-semibold font-serif mb-2" style={{ color: '#4B9CD3' }}>
                  Exclusive Offers
                </div>
                <div className="text-gray-600 text-sm font-sans">
                  Best rates direct
                </div>
              </div>
              
              <div className={`rounded-2xl p-6 bg-white border-2 border-blue-200 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`} style={{ animationDelay: '0.3s' }}>
                <div className="text-base font-semibold font-serif mb-2" style={{ color: '#4B9CD3' }}>
                  Premium Comfort
                </div>
                <div className="text-gray-600 text-sm font-sans">
                  Where celebrations find their perfect stay
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div className="mt-12">
              <a
                href="mailto:info@acestayz.com"
                className="btn-gold-dust inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold text-charcoal shadow-lg text-base sm:text-lg"
                tabIndex={0}
                aria-label="Notify me when AceStayz launches"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    window.location.href = 'mailto:info@acestayz.com'
                  }
                }}
              >
                Notify Me
              </a>
            </div> */}

            {/* Additional Emotional Line */}
            <p className="mt-8 text-sm sm:text-base text-gray-500 font-serif italic">
              Where celebrations find their perfect stay.
            </p>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default ComingSoonPage




