import React from 'react'
import adityaSirImage from '../assets/images/adityaSir.png'

const BRAND_BLUE = '#4B9CD3'

const BrainsBehindSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: BRAND_BLUE }}>
              Brains Behind Ace Stayz
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 max-w-xl">
              Built by Aditya Parasharr and Aashi Parashar in 2018. They are experienced hospitality thinkers who value precision over promises Ace Stayz blends smart locations, thoughtful design, and operational discipline to deliver stays that are consistent, comfortable, and always dependable.
            </p>
          </div>

          {/* Right Column - Image with Pagination */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="w-full h-[500px] overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={adityaSirImage} 
                  alt="Aditya Parashar - Co-founder of Ace Stayz"
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      dot === 1 
                        ? '' 
                        : 'bg-gray-300'
                    }`}
                    style={dot === 1 ? { backgroundColor: BRAND_BLUE } : {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrainsBehindSection
