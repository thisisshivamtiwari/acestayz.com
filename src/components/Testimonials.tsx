import React, { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  text: string
  profileImage: string
  hotel: string
  uploadedImages: string[]
}

interface TestimonialContentProps {
  testimonial: Testimonial
}

const TestimonialContent: React.FC<TestimonialContentProps> = ({ testimonial }) => {
  return (
    <div className="relative order-2 lg:order-1 group">
      <div className="relative bg-cream/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border-2 border-terracotta/10 group-hover:border-gold-dust/30 transition-all duration-500">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          <svg
            className="w-12 h-12 text-terracotta"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.481.967-4.996 2.712-4.996 7.849 0 2.857 1.174 4.007 1.174 4.007s-5.153 0-5.153-6.248V21h-1.851zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.481.967-5 2.712-5 7.849 0 2.857 1.186 4.007 1.186 4.007s-5.182 0-5.182-6.248V21h-1.799z" />
          </svg>
        </div>

        {/* Customer Profile */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-dust to-terracotta opacity-0 group-hover:opacity-100 scale-110 transition-all duration-500"></div>
            <img
              src={testimonial.profileImage}
              alt={testimonial.name}
              className="relative w-16 h-16 rounded-full object-cover border-4 border-cream shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:ring-4 group-hover:ring-gold-dust/50"
              loading="lazy"
            />
          </div>
          <div>
            <h4 className="font-bold text-terracotta-dark text-xl font-serif group-hover:text-gold-dust transition-colors duration-300">
              {testimonial.name}
            </h4>
            <p className="text-charcoal/70 text-sm">{testimonial.location}</p>
            <p className="text-xs text-gold-dust font-semibold uppercase tracking-wide mt-1">
              {testimonial.hotel}
            </p>
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-6 h-6 text-gold-dust transition-all duration-300 group-hover:scale-125"
              style={{ transitionDelay: `${i * 0.05}s` }}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Testimonial Text */}
        <blockquote className="text-charcoal/90 text-base sm:text-lg lg:text-xl leading-relaxed italic font-serif relative z-10">
          "{testimonial.text}"
        </blockquote>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-dust to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
      </div>
    </div>
  )
}

interface TestimonialImagesProps {
  testimonial: Testimonial
}

const TestimonialImages: React.FC<TestimonialImagesProps> = ({ testimonial }) => {
  return (
    <div className="relative order-1 lg:order-2">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 auto-rows-fr">
        {testimonial.uploadedImages.map((image, imgIndex) => (
          <div
            key={imgIndex}
            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-700 group ${
              imgIndex === 0 ? 'col-span-2 h-64 sm:h-80' : 'col-span-1 h-32 sm:h-40'
            } opacity-100`}
            style={{
              transitionDelay: `${imgIndex * 0.1}s`,
            }}
          >
            <img
              src={image}
              alt={`Photo by ${testimonial.name} ${imgIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-terracotta-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            {/* Hover Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-dust/50 rounded-xl transition-colors duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Testimonials: React.FC = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { elementRef: testimonialsRef, isVisible: testimonialsVisible } = useScrollAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousIndex, setPreviousIndex] = useState(0)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, India',
      rating: 5,
      text: 'Our stay at AceStayz was nothing short of magical. The attention to detail, the warm hospitality, and the breathtaking views made our anniversary celebration unforgettable. We felt like royalty!',
      profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      hotel: 'Mountain View Suite',
      uploadedImages: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 2,
      name: 'Rajesh Kumar',
      location: 'Delhi, India',
      rating: 5,
      text: 'The perfect blend of luxury and comfort. Every moment was curated to perfection. The staff went above and beyond to ensure our family had an exceptional experience. Highly recommended!',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      hotel: 'Coastal Paradise',
      uploadedImages: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 3,
      name: 'Ananya Patel',
      location: 'Bangalore, India',
      rating: 5,
      text: 'AceStayz exceeded all our expectations. The serene ambiance, world-class amenities, and impeccable service created memories that will last a lifetime. This is true luxury redefined.',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
      hotel: 'Heritage Elegance',
      uploadedImages: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      ],
    },
  ]

  const handlePrevious = () => {
    if (isTransitioning) return
    setPreviousIndex(currentIndex)
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handleNext = () => {
    if (isTransitioning) return
    setPreviousIndex(currentIndex)
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const handleDotClick = (index: number) => {
    if (isTransitioning || index === currentIndex) return
    setPreviousIndex(currentIndex)
    setIsTransitioning(true)
    setCurrentIndex(index)
    setTimeout(() => setIsTransitioning(false), 600)
  }

  const currentTestimonial = testimonials[currentIndex]
  const previousTestimonial = testimonials[previousIndex]

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-terracotta-texture overflow-hidden">
      {/* Minimal Wooden Texture Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 60px,
          rgba(101, 67, 33, 0.08) 60px,
          rgba(101, 67, 33, 0.08) 61px
        )`
      }}></div>

      {/* Warm Glow Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold-dust/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-dust/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-4">
            <span className="block font-sans">Stories from</span>
            <span className="block text-gold-dust" style={{ fontFamily: 'Dancing Script, cursive', fontWeight: 700 }}>
              Our Guests
            </span>
          </h2>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-cream/90 max-w-4xl mx-auto leading-relaxed">
            Discover what makes AceStayz special through the experiences of our cherished guests.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div
          ref={testimonialsRef}
          className="relative"
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            disabled={isTransitioning}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gold-dust/95 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-gold-dust-dark/20 hover:bg-gold-dust hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={isTransitioning}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-gold-dust/95 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-gold-dust-dark/20 hover:bg-gold-dust hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-charcoal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Single Testimonial Display */}
          <div className="px-16 sm:px-20 relative min-h-[500px]">
            {/* Previous Testimonial - Fading Out */}
            {isTransitioning && (
              <div
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                style={{
                  opacity: 1,
                  animation: 'fadeOut 600ms ease-in-out forwards',
                }}
              >
                <TestimonialContent testimonial={previousTestimonial} />
                <TestimonialImages testimonial={previousTestimonial} />
              </div>
            )}

            {/* Current Testimonial - Fading In */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                testimonialsVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                opacity: isTransitioning ? 0 : (testimonialsVisible ? 1 : 0),
                animation: isTransitioning ? 'fadeIn 600ms ease-in-out forwards' : 'none',
                transition: !isTransitioning ? 'opacity 300ms ease-in-out' : 'none',
              }}
            >
              <TestimonialContent testimonial={currentTestimonial} />
              <TestimonialImages testimonial={currentTestimonial} />
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold-dust w-8'
                    : 'bg-gold-dust/40 hover:bg-gold-dust/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div
          className={`text-center mt-12 sm:mt-16 transition-all duration-1000 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '0.9s' }}
        >
          <button
            className="btn-gold-dust px-8 py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group"
            aria-label="Read more testimonials"
          >
            <span>Read More Stories</span>
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

export default Testimonials

