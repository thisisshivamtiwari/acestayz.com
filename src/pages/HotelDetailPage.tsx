import React, { useEffect, useMemo, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import BentoGridShowcase from '../components/BentoGridShowcase'
import { FiStar, FiMapPin, FiCamera, FiPlayCircle,  FiShield, FiChevronLeft, FiChevronRight, FiHome, FiAward, FiHelpCircle } from 'react-icons/fi'
import RoomsGrid from '../components/detail/RoomsGrid'
import AmenitiesGrid from '../components/detail/AmenitiesGrid'
import ReviewsCarousel from '../components/detail/ReviewsCarousel'
 
import HotelShowcase from '../components/HotelShowcase'
import LocationAbout from '../components/detail/LocationAbout'
import FAQ from '../components/detail/FAQ'
import BottomSheetGallery from '../components/detail/BottomSheetGallery'
import BottomSheetCalendar from '../components/detail/BottomSheetCalendar'

const HERO_IMG = "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274"

const HotelDetailPage: React.FC = () => {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [selectedStart, setSelectedStart] = useState<Date | undefined>()
  const [selectedEnd, setSelectedEnd] = useState<Date | undefined>()

  const fmt = (d?: Date) => d ? d.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) : undefined
  const rangeLabel = selectedStart && selectedEnd ? `${fmt(selectedStart)} → ${fmt(selectedEnd)}` : 'Pick Check-in & Check-out Dates'
  const gallerySections = [
    { title: 'Rooms', images: [HERO_IMG, HERO_IMG, HERO_IMG, HERO_IMG, HERO_IMG, HERO_IMG] },
    { title: 'Lobby', images: [HERO_IMG, HERO_IMG, HERO_IMG] },
    { title: 'Dining', images: [HERO_IMG, HERO_IMG, HERO_IMG, HERO_IMG] },
    { title: 'Exterior', images: [HERO_IMG, HERO_IMG] },
  ]
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      {/* Hero Slider */}
      <HeroSlider onOpenGallery={() => setGalleryOpen(true)} />

      {/* Yellow Summary Bar */}
      <section className="relative z-10 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl shadow-xl p-6 md:p-8" style={{ backgroundColor: '#4B9CD3' }}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Bloom Hotel - Karol Bagh</h1>
                <div className="mt-2 flex items-center gap-3 text-white/90">
                  <span className="inline-flex items-center gap-1 font-semibold text-white"><FiStar /> 5.0</span>
                  <span className="hidden sm:inline text-white/50">|</span>
                  <span className="inline-flex items-center gap-1"><FiMapPin /> Karol Bagh, New Delhi</span>
                  <span className="hidden sm:inline text-white/50">•</span>
                  <span className="text-sm">Free Early Check‑In</span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div onClick={() => setCalendarOpen(true)} className="bg-white rounded-xl px-4 py-3 text-sm text-gray-700 border w-full md:w-[420px] cursor-pointer hover:shadow flex items-center justify-between" style={{ borderColor: '#4B9CD3' }}>
                  <span>{rangeLabel}</span>
                  <span className="text-xs text-gray-500">{selectedStart && selectedEnd ? '' : 'Select'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Row */}
          <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 px-4 md:px-6">
            <div className="flex items-center justify-between overflow-x-auto text-gray-600 divide-x divide-gray-100">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-3">Amenities</h3>
              <p className="text-gray-600">High-speed Wi‑Fi, 24x7 front desk, spotless linen, in-room smart TV, and more.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-3">Location</h3>
              <p className="text-gray-600">Prime location with easy access to metro, shopping districts, and business hubs.</p>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-3">Policies</h3>
              <p className="text-gray-600">Check‑in 2 PM • Check‑out 11 AM • No smoking • Pets not allowed.</p>
            </div>
          </div>
        </div>
      </section>

      <AmenitiesGrid />

      <ReviewsCarousel />

      {/* Horizontal Gallery Slider */}
      <GalleryStrip />

      <LocationAbout />

      {/* Bento Grid (same as home) */}
      <section id="highlights" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

function HeroSlider({ onOpenGallery }: { onOpenGallery: () => void }) {
  const images = useMemo(() => [HERO_IMG, HERO_IMG, HERO_IMG, HERO_IMG], [])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setIndex(i => (i + 1) % images.length), 4000)
    return () => window.clearInterval(id)
  }, [images.length])

  return (
    <section className="relative overflow-hidden">
      <div className="h-[65vh] w-full relative">
        <div
          className="h-full w-full flex transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${images.length * 100}%` }}
        >
          {images.map((src, i) => (
            <div key={i} className="h-full w-full shrink-0 bg-center bg-cover" style={{ backgroundImage: `url('${src}')` }} />
          ))}
        </div>

        {/* Controls */}
        <button aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow" onClick={() => setIndex((index - 1 + images.length) % images.length)}>
          <FiChevronLeft />
        </button>
        <button aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow" onClick={() => setIndex((index + 1) % images.length)}>
          <FiChevronRight />
        </button>

        {/* Overlay actions */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-between px-6">
          <button className="text-white/90 text-sm inline-flex items-center gap-2">
            <FiPlayCircle /> View Video
          </button>
          <div className="flex items-center gap-6">
            <button onClick={onOpenGallery} className="text-white/90 text-sm hidden md:inline">View All Images</button>
            <button onClick={onOpenGallery} className="rounded-full p-3 shadow-md text-white" style={{ backgroundColor: '#4B9CD3' }}>
              <FiCamera />
            </button>
          </div>
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

 
 

function GalleryStrip() {
  const images = useMemo(() => Array.from({ length: 8 }).map(() => HERO_IMG), [])
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative">
        <div ref={containerRef} className="overflow-x-auto scroll-smooth">
          <div className="flex gap-6 min-w-max">
            {images.map((src, i) => (
              <div key={i} className="w-[720px] h-[380px] shrink-0 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                <div className="h-full w-full bg-center bg-cover" style={{ backgroundImage: `url('${src}')` }} />
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
