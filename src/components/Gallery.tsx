import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface GalleryItem {
  id: number
  type: 'image' | 'video'
  src: string
  thumbnail?: string
  title?: string
  span?: 'col-span-1' | 'col-span-2' | 'row-span-1' | 'row-span-2'
  colSpan?: number
  rowSpan?: number
}

const Gallery: React.FC = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { elementRef: gridRef, isVisible: gridVisible } = useScrollAnimation()
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      title: 'Mountain Retreat',
      colSpan: 2,
      rowSpan: 2,
    },
    {
      id: 2,
      type: 'video',
      src: 'https://cdn.pixabay.com/video/2020/02/02/31869-389236273_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      title: 'Luxury Suite',
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      title: 'Heritage Room',
      colSpan: 1,
      rowSpan: 1,
    },
    {
        id: 4,
        type: 'video',
        src: ' https://cdn.pixabay.com/video/2022/10/16/135141-761273478_large.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
        title: 'Dining Experience',
        colSpan: 2,
        rowSpan: 1,
      },
   
    {
      id: 5,
      type: 'video',
      src: 'https://cdn.pixabay.com/video/2015/10/27/1188-143842652_large.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80',
      title: 'Dining Experience',
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      title: 'Spa & Wellness',
      colSpan: 1,
      rowSpan: 1,
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      title: 'Sunset Terrace',
      colSpan: 1,
      rowSpan: 1,
    },
  ]

  const handleMouseEnter = (id: number) => {
    setHoveredItem(id)
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-cream overflow-hidden">
      {/* Subtle Background Texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 60px,
          rgba(101, 67, 33, 0.03) 60px,
          rgba(101, 67, 33, 0.03) 61px
        )`
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-terracotta-dark mb-4">
            <span className="block font-sans">Moments</span>
            <span className="block text-gold-dust" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              Captured
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Experience the beauty and elegance of our properties through our curated collection of moments.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 transition-all duration-1000 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {galleryItems.map((item, index) => {
            const isHovered = hoveredItem === item.id
            const colSpanClass = item.colSpan === 2 ? 'md:col-span-2' : 'md:col-span-1'
            const rowSpanClass = item.rowSpan === 2 ? 'md:row-span-2' : 'md:row-span-1'

            return (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl bg-terracotta/10 cursor-pointer ${colSpanClass} ${rowSpanClass} transition-all duration-500 ${
                  isHovered ? 'scale-[1.02] shadow-2xl' : 'shadow-lg hover:shadow-xl'
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
                tabIndex={0}
                role="button"
                aria-label={item.title || `Gallery item ${item.id}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleMouseEnter(item.id)
                  }
                }}
              >
                {/* Media Container */}
                <div className="relative w-full h-full min-h-[250px] md:min-h-[300px]">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title || `Gallery image ${item.id}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-terracotta-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Title Overlay */}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-lg sm:text-xl font-bold text-cream font-serif">
                        {item.title}
                      </h3>
                    </div>
                  )}

                  {/* Decorative Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-dust/50 transition-colors duration-500 rounded-xl"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 ${
            gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.8s' }}
        >
          <button
            className="btn-gold-dust px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group"
            aria-label="View full gallery"
          >
            <span>View Full Gallery</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery

