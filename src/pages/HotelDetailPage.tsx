import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import BentoGridShowcase from '../components/BentoGridShowcase'
import { FiStar, FiMapPin, FiCamera, FiPlayCircle,  FiShield, FiChevronLeft, FiChevronRight, FiHome, FiAward, FiHelpCircle, FiExternalLink } from 'react-icons/fi'
import RoomsGrid from '../components/detail/RoomsGrid'
import AmenitiesGrid from '../components/detail/AmenitiesGrid'
import ReviewsCarousel from '../components/detail/ReviewsCarousel'
 
import HotelShowcase from '../components/HotelShowcase'
import LocationAbout from '../components/detail/LocationAbout'
import FAQ from '../components/detail/FAQ'
import BottomSheetGallery from '../components/detail/BottomSheetGallery'
import BottomSheetCalendar from '../components/detail/BottomSheetCalendar'
import { getHotelBySlug } from '../utils/hotelData'

const HotelDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const hotel = slug ? getHotelBySlug(slug) : undefined

  if (!hotel) {
    return <Navigate to="/" replace />
  }
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedStart, setSelectedStart] = useState<Date | undefined>()
  const [selectedEnd, setSelectedEnd] = useState<Date | undefined>()

  const fmt = (d?: Date) => d ? d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) : undefined
  const rangeLabel = selectedStart && selectedEnd ? `${fmt(selectedStart)} → ${fmt(selectedEnd)}` : 'Pick Check-in & Check-out Dates'
  const gallerySections = [
    { title: 'Hotel Images', images: hotel.images.length > 0 ? hotel.images : [hotel.image] },
  ]
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      {/* Hero Slider */}
      <HeroSlider hotel={hotel} onOpenGallery={() => setGalleryOpen(true)} />

      {/* Summary Bar */}
      <section className="relative z-10 -mt-10">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl shadow-xl md:p-8" style={{ backgroundColor: '#4B9CD3' }}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white md:text-3xl">{hotel.title}</h1>
                <div className="flex gap-3 items-center mt-2 text-white/90 flex-wrap">
                  <span className="inline-flex gap-1 items-center font-semibold text-white"><FiStar /> {hotel.rating}</span>
                  <span className="hidden sm:inline text-white/50">|</span>
                  <span className="inline-flex gap-1 items-center"><FiMapPin /> {hotel.location}</span>
                  <span className="hidden sm:inline text-white/50">•</span>
                  <span className="text-sm">{hotel.totalReviews} Reviews</span>
                </div>
                <p className="mt-2 text-sm text-white/80">{hotel.fullAddress}</p>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <div onClick={() => setCalendarOpen(true)} className="bg-white rounded-xl px-4 py-3 text-sm text-gray-700 border w-full md:w-[420px] cursor-pointer hover:shadow flex items-center justify-between" style={{ borderColor: '#4B9CD3' }}>
                  <span>{rangeLabel}</span>
                  <span className="text-xs text-gray-500">{selectedStart && selectedEnd ? '' : 'Select'}</span>
                </div>
                <a 
                  href={hotel.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl px-6 py-3 text-sm font-semibold text-center w-full md:w-[420px] hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                  style={{ color: '#4B9CD3' }}
                >
                  <span>Book Now</span>
                  <FiExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Tabs Row */}
          <div className="px-4 mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm md:px-6">
            <div className="flex overflow-x-auto justify-between items-center text-gray-600 divide-x divide-gray-100">
              <TabIcon label="Rooms" icon={<FiHome />} targetId="rooms" isActive />
              <TabIcon label="Amenities" icon={<FiAward />} targetId="amenities" />
              <TabIcon label="Reviews" icon={<FiStar />} targetId="reviews" />
              <TabIcon label="Location" icon={<FiMapPin />} targetId="location" />
              <TabIcon label="Highlights" icon={<FiShield />} targetId="highlights" />
              <TabIcon label="FAQs" icon={<FiHelpCircle />} targetId="faqs" />
            </div>
          </div>
        </div>
      </section>

      <RoomsGrid />

      {/* Spacer content sections */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.allAmenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Location & Nearby Attractions</h3>
              <p className="text-gray-600 mb-3">{hotel.fullAddress}</p>
              <ul className="space-y-2">
                {hotel.nearbyAttractions.map((attraction, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    {attraction}
                  </li>
                ))}
              </ul>
              <a 
                href={hotel.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline"
                style={{ color: '#4B9CD3' }}
              >
                <FiMapPin />
                View on Google Maps
              </a>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Specialities</h3>
              <ul className="space-y-2">
                {hotel.specialities.map((speciality, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">✓</span>
                    {speciality}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold">Check-in & Check-out</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Check-in:</span> {hotel.checkInTime}</p>
                <p><span className="font-medium">Check-out:</span> {hotel.checkOutTime}</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
              <h3 className="mb-3 text-lg font-semibold">Policies</h3>
              <ul className="space-y-2">
                {hotel.policies.map((policy, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="mr-2">•</span>
                    {policy}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <AmenitiesGrid amenities={hotel.allAmenities} />

      <ReviewsCarousel />

      {/* Horizontal Gallery Slider */}
      <GalleryStrip hotel={hotel} />

      <LocationAbout hotel={hotel} />

      {/* Bento Grid (same as home) */}
      <section id="highlights" className="py-12 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <BentoGridShowcase />
        </div>
      </section>

      <FAQ />

      {/* Reuse homepage hotel cards/slider */}
      <HotelShowcase />

      <Footer />

      {/* Fullscreen Bottom Sheet Gallery */}
      <BottomSheetGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} sections={gallerySections} />
      {/* Fullscreen Bottom Sheet Calendar */}
      <BottomSheetCalendar
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        initialStart={selectedStart}
        initialEnd={selectedEnd}
        onConfirm={(s, e) => { setSelectedStart(s); setSelectedEnd(e) }}
      />
    </div>
  )
}

function HeroSlider({ hotel, onOpenGallery }: { hotel: any; onOpenGallery: () => void }) {
  const images = useMemo(() => hotel.images.length > 0 ? hotel.images : [hotel.image], [hotel.images, hotel.image])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex(i => (i + 1) % images.length), 4000)
    return () => window.clearInterval(id)
  }, [images.length])

  return (
    <section className="overflow-hidden relative">
      <div className="h-[65vh] w-full relative">
        <div
          className="flex w-full h-full transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((src: string, i: number) => (
            <div key={i} className="w-full h-full bg-center bg-cover shrink-0" style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>

        {/* Controls */}
        <button aria-label="Previous" className="absolute left-4 top-1/2 p-2 text-gray-900 rounded-full shadow -translate-y-1/2 bg-white/80 hover:bg-white" onClick={() => setIndex((index - 1 + images.length) % images.length)}>
          <FiChevronLeft />
        </button>
        <button aria-label="Next" className="absolute right-4 top-1/2 p-2 text-gray-900 rounded-full shadow -translate-y-1/2 bg-white/80 hover:bg-white" onClick={() => setIndex((index + 1) % images.length)}>
          <FiChevronRight />
        </button>

        {/* Overlay actions */}
        <div className="flex absolute inset-x-0 bottom-4 justify-between items-center px-6">
          <button className="inline-flex gap-2 items-center text-sm text-white/90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-black/50 transition-colors">
            <FiPlayCircle /> View Video
          </button>
          <button 
            onClick={onOpenGallery} 
            className="inline-flex gap-2 items-center text-sm font-medium text-white rounded-lg px-4 py-3 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            style={{ backgroundColor: '#4B9CD3' }}
          >
            <FiCamera className="w-5 h-5" />
            <span>View All Images</span>
          </button>
        </div>
      </div>
    </section>
  )
}

 

function TabIcon({ label, icon, isActive, targetId }: { label: string; icon: React.ReactNode; isActive?: boolean; targetId?: string }) {
  const handleClick = () => {
    if (!targetId) return
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
  return (
    <button onClick={handleClick} className={"flex items-center gap-2 py-4 px-4 text-sm shrink-0 " + (isActive ? "text-gray-900" : "text-gray-500 hover:text-gray-700") }>
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

 
 

function GalleryStrip({ hotel }: { hotel: any }) {
  const images = useMemo(() => hotel.images.length > 0 ? hotel.images : [hotel.image], [hotel.images, hotel.image])
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateNav = () => {
    const el = containerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 0)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4)
  }

  useEffect(() => {
    updateNav()
    const el = containerRef.current
    if (!el) return
    const onScroll = () => updateNav()
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollByAmount = (dir: 1 | -1) => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: 'smooth' })
  }

  return (
    <section className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Property Gallery</h2>
      <div className="relative">
        <div ref={containerRef} className="overflow-x-auto scroll-smooth">
          <div className="flex gap-6 min-w-max">
            {images.map((src: string, i: number) => (
              <div key={i} className="w-[720px] h-[380px] shrink-0 rounded-2xl overflow-hidden relative bg-gray-100">
                <img 
                  src={src} 
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollByAmount(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition ${canPrev ? 'text-white shadow-lg hover:shadow-xl hover:scale-110' : 'text-gray-300 cursor-not-allowed'}`}
          style={{ backgroundColor: canPrev ? 'rgba(75, 156, 211, 0.9)' : 'rgba(229,231,235,0.8)' }}
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={() => scrollByAmount(1)}
          disabled={!canNext}
          aria-label="Next"
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition ${canNext ? 'text-white shadow-lg hover:shadow-xl hover:scale-110' : 'text-gray-300 cursor-not-allowed'}`}
          style={{ backgroundColor: canNext ? 'rgba(75, 156, 211, 0.9)' : 'rgba(229,231,235,0.8)' }}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  )
}
 

 

export default HotelDetailPage
