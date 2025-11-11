// import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #4B9CD3 0%, #FFFFFF 100%)' }}>
      {/* <Navigation /> */}

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center">
          <div className="mx-auto max-w-2xl backdrop-blur-md bg-white/40 border border-white/60 shadow-xl rounded-3xl p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: '#E6F1FA', color: '#4B9CD3' }}>
              Under Maintenance
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold" style={{ color: '#012365' }}>
              Something delightful is cooking
            </h1>
            <p className="mt-4 text-gray-700 text-base sm:text-lg">
              We’re crafting a better AceStayz experience. Check back soon for a beautiful new way to book your stay.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-100">
                <div className="text-sm font-semibold" style={{ color: '#4B9CD3' }}>Smooth booking</div>
                <div className="text-gray-600 text-sm mt-1">Faster, simpler, smarter</div>
              </div>
              <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-100">
                <div className="text-sm font-semibold" style={{ color: '#4B9CD3' }}>Exclusive offers</div>
                <div className="text-gray-600 text-sm mt-1">Best rates direct</div>
              </div>
              <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-100">
                <div className="text-sm font-semibold" style={{ color: '#4B9CD3' }}>Modern design</div>
                <div className="text-gray-600 text-sm mt-1">Clean & intuitive UI</div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="mailto:info@acestayz.com"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white shadow-md hover:opacity-95 transition"
                style={{ backgroundColor: '#4B9CD3' }}
              >
                Notify me
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ComingSoonPage




