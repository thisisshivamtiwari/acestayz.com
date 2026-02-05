import React from 'react'

const BRAND_BLUE = '#4B9CD3'
const YOUTUBE_VIDEO_ID = 't2JmtDjXDN8'

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

          {/* Right Column - YouTube Video (thumbnail shown until play) */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Brains Behind Ace Stayz - YouTube video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrainsBehindSection
