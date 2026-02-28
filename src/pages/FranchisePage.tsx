import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import {
  FiCheck,
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiTarget,
  FiArrowRight,
  FiArrowLeft,
  FiMapPin,
  FiHome,
  FiCalendar,
  FiDollarSign
} from 'react-icons/fi'
import franchiseHeroIllustration from '../assets/images/s.svg'
import franchiseCardImage from '../assets/images/frachiseCard.svg'

interface FormData {
  // Step 1: Personal Information
  fullName: string
  email: string
  phone: string
  city: string
  
  // Step 2: Business Details
  businessExperience: string
  investmentCapacity: string
  preferredLocation: string
  timeline: string
  
  // Step 3: Additional Information
  message: string
  hearAboutUs: string
}

type CalculatorLocation = 'metro' | 'major' | 'tourist' | 'offbeat' | 'remote'
type CalculatorRateBand = 'budget' | 'midscale'
type CommitmentKey = 'location' | 'interiors' | 'bookings'

const calculatorConfig: Record<CalculatorLocation, { occupancy: number; rateMultiplier: number; label: string; helper: string }> = {
  metro: {
    occupancy: 0.88,
    rateMultiplier: 1.15,
    label: 'Metro',
    helper: 'eg. Bangalore, Mumbai, Delhi'
  },
  major: {
    occupancy: 0.82,
    rateMultiplier: 1.05,
    label: 'Major Cities',
    helper: 'eg. Indore, Ahmedabad, Lucknow'
  },
  tourist: {
    occupancy: 0.8,
    rateMultiplier: 1.1,
    label: 'Tourist Destination',
    helper: 'eg. Dehradun, Manali, Jaipur'
  },
  offbeat: {
    occupancy: 0.75,
    rateMultiplier: 0.95,
    label: 'Offbeat',
    helper: 'eg. Vagamon, Bir, Pushkar'
  },
  remote: {
    occupancy: 0.7,
    rateMultiplier: 0.9,
    label: 'Remote',
    helper: 'eg. Shangarh, Chug Valley'
  }
}

const BASE_BUDGET_RATE = 2500
const BASE_MID_SCALE_RATE = 3500
const DEFAULT_ROOM_COUNT = 20
const DEFAULT_EXPENSE_RATIO = 40
const PER_ROOM_INVESTMENT = 250000
const TIMELINE_YEARS = [2017, 2018, 2020, 2026] as const

const partnerTestimonials = [
  {
    name: 'Ms. Shivangi Aswal',
    role: 'Ace Stayz Partner, Delhi',
    quote: 'Getting an Ace Stayz franchise changed my life!'
  },
  {
    name: 'Mr. Pawan Kumar',
    role: 'Ace Stayz Patron, Noida',
    quote: 'The Ace Stayz franchise is the most profitable decision I ever made.'
  },
  {
    name: 'Ms. Priyanka Sharma',
    role: 'Ace Stayz Partner, Gurugram',
    quote: 'I became financially free thanks to Ace Stayz.'
  }
] as const

const commitmentItems: {
  key: CommitmentKey
  id: number
  title: string
  label: string
  description: string
  icon: React.ElementType
}[] = [
  {
    key: 'location',
    id: 1,
    title: 'Location',
    label: 'Location',
    description:
      'We carefully select prime, well-connected locations close to business hubs, hospitals, metro stations, and city essentials.',
    icon: FiMapPin
  },
  {
    key: 'interiors',
    id: 2,
    title: 'Interiors',
    label: 'Interiors',
    description:
      'Every property is designed with modern, premium interiors that balance comfort, functionality, and long-term durability.',
    icon: FiHome
  },
  {
    key: 'bookings',
    id: 3,
    title: 'Bookings',
    label: 'Bookings',
    description:
      'Our central sales, marketing, and revenue team works to drive high-quality bookings across online and offline channels.',
    icon: FiCalendar
  }
]

const FranchisePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    businessExperience: '',
    investmentCapacity: '',
    preferredLocation: '',
    timeline: '',
    message: '',
    hearAboutUs: ''
  })

  const totalSteps = 2

  const [selectedLocationCategory, setSelectedLocationCategory] = useState<CalculatorLocation>('metro')
  const [selectedRateBand, setSelectedRateBand] = useState<CalculatorRateBand>('midscale')
  const [roomCountInput, setRoomCountInput] = useState<number>(DEFAULT_ROOM_COUNT)
  const [occupancyInput, setOccupancyInput] = useState<number>(calculatorConfig.metro.occupancy * 100)
  const [averageRateInput, setAverageRateInput] = useState<number>(() => {
    const config = calculatorConfig.metro
    return Math.round(BASE_MID_SCALE_RATE * config.rateMultiplier)
  })
  const [expenseRatioInput, setExpenseRatioInput] = useState<number>(DEFAULT_EXPENSE_RATIO)
  const [initialInvestmentInput, setInitialInvestmentInput] = useState<number>(DEFAULT_ROOM_COUNT * PER_ROOM_INVESTMENT)
  const [activeCommitment, setActiveCommitment] = useState<CommitmentKey>('location')

  useEffect(() => {
    const config = calculatorConfig[selectedLocationCategory]
    const newOccupancy = Math.round(config.occupancy * 100)
    setOccupancyInput(newOccupancy)

    const baseRate = selectedRateBand === 'budget' ? BASE_BUDGET_RATE : BASE_MID_SCALE_RATE
    const suggestedAverageRate = Math.round(baseRate * config.rateMultiplier)
    setAverageRateInput(suggestedAverageRate)
  }, [selectedLocationCategory, selectedRateBand])

  useEffect(() => {
    const calculatedInvestment = roomCountInput * PER_ROOM_INVESTMENT
    setInitialInvestmentInput(calculatedInvestment)
  }, [roomCountInput])

  const occupancyRate = occupancyInput / 100
  const yearlyRevenue = roomCountInput * averageRateInput * 365 * occupancyRate
  const yearlyExpenses = yearlyRevenue * (expenseRatioInput / 100)
  const initialInvestment = initialInvestmentInput

  const benefits = [
    {
      icon: <FiTrendingUp />,
      title: 'Proven Business Model',
      description: 'Join a growing brand with 6+ years of success in the premium hospitality sector'
    },
    {
      icon: <FiAward />,
      title: 'Brand Recognition',
      description: 'Leverage our established reputation with 4.9+ ratings and 500+ satisfied guests'
    },
    {
      icon: <FiUsers />,
      title: 'Comprehensive Support',
      description: 'Get end-to-end assistance including setup, training, marketing, and operations'
    },
    {
      icon: <FiTarget />,
      title: 'High ROI Potential',
      description: 'Benefit from the booming serviced apartment market in Delhi NCR'
    }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your interest! Our team will contact you within 24 hours.')
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      businessExperience: '',
      investmentCapacity: '',
      preferredLocation: '',
      timeline: '',
      message: '',
      hearAboutUs: ''
    })
    setCurrentStep(1)
  }

  const handleRoomCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (Number.isNaN(value)) {
      setRoomCountInput(0)
      return
    }
    if (value < 1) {
      setRoomCountInput(1)
      return
    }
    if (value > 200) {
      setRoomCountInput(200)
      return
    }
    setRoomCountInput(value)
  }

  const handleOccupancyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (Number.isNaN(value)) {
      setOccupancyInput(0)
      return
    }
    if (value < 0) {
      setOccupancyInput(0)
      return
    }
    if (value > 100) {
      setOccupancyInput(100)
      return
    }
    setOccupancyInput(value)
  }

  const handleAverageRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (Number.isNaN(value)) {
      setAverageRateInput(0)
      return
    }
    if (value < 0) {
      setAverageRateInput(0)
      return
    }
    setAverageRateInput(value)
  }

  const handleExpenseRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (Number.isNaN(value)) {
      setExpenseRatioInput(0)
      return
    }
    if (value < 0) {
      setExpenseRatioInput(0)
      return
    }
    if (value > 100) {
      setExpenseRatioInput(100)
      return
    }
    setExpenseRatioInput(value)
  }

  const handleInitialInvestmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (Number.isNaN(value)) {
      setInitialInvestmentInput(0)
      return
    }
    if (value < 0) {
      setInitialInvestmentInput(0)
      return
    }
    setInitialInvestmentInput(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section - Become A Hotelier With ACE STAYZ */}
      <section className="relative overflow-hidden min-h-[65vh] flex flex-col justify-center" style={{ backgroundColor: '#4B9CD3' }}>
        {/* City skyline at bottom - light outline */}
        <div className="absolute bottom-0 left-0 right-0 h-[28%] min-h-[120px] opacity-40" aria-hidden>
          <svg viewBox="0 0 1200 100" className="object-cover object-bottom w-full h-full" preserveAspectRatio="xMidYMax meet" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2">
            <path d="M0 100v-45h35v45H0zm40 0v-60h28v60H40zm32 0v-38h24v38H72zm28 0v-52h32v52h-32zm36 0v-42h22v42h-22zm24 0v-58h38v58h-38zm42 0v-35h26v35h-26zm28 0v-48h30v48h-30zm32 0v-55h34v55h-34zm36 0v-40h20v40h-20zm22 0v-62h44v62h-44zm46 0v-44h28v44h-28zm30 0v-50h26v50h-26zm28 0v-36h40v36h-40zm42 0v-54h24v54h-24zm26 0v-42h32v42h-32zm34 0v-48h28v48h-28zm30 0v-58h38v58h-38zm40 0v-32h22v32h-22zm24 0v-46h36v46h-36zm38 0v-52h30v52h-30zm32 0v-38h26v38h-26zm28 0v-44h42v44h-42zm44 0v-60h28v60h-28zm30 0v-40h24v40h-24zm26 0v-50h34v50h-34zm36 0v-56h22v56h-22zm24 0v-42h30v42h-30zm32 0v-48h38v48h-38zm40 0v-54h26v54h-26zm28 0v-36h32v36h-32zm34 0v-44h28v44h-34zm30 0v-58h40v58h-40zm42 0v-46h24v46h-24zm26 0v-52h36v52h-36zm38 0v-40h30v40h-30zm32 0v-50h28v50h-32zm28 0v-56h44v56h-44zm46 0v-38h22v38h-22zm24 0v-62h38v62h-38zm40 0v-44h26v44h-26zm28 0v-48h32v48h-32zm34 0v-54h30v54h-34zm32 0v-42h28v42h-28zm30 0v-50h40v50h-40z" />
          </svg>
        </div>

        <div className="flex relative z-10 flex-col justify-between items-center px-5 py-10 mx-auto w-full max-w-7xl lg:flex-row sm:px-6 lg:px-10 lg:py-12">
          {/* Left: Headline + CTA */}
          <div className="flex-1 mb-8 text-left lg:mb-0 lg:mr-6">
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl">
              <span className="block">Become A Hotelier</span>
              <span className="block mt-2">
                With{' '}
                <span className="font-bold" style={{ color: '#D4AF37' }}>
                  ACE STAYZ
                </span>
              </span>
            </h1>
            <a
              href="#franchise-form"
              className="inline-flex items-center justify-center gap-2 mt-6 px-8 py-3.5 bg-white font-bold rounded-2xl text-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#4B9CD3]"
              style={{ color: '#1e3a5f' }}
            >
              Enquire Now
            </a>
          </div>

          {/* Right: Illustration (mobile & tablet) */}
          <div className="flex flex-1 justify-center mt-6 w-full max-w-md lg:max-w-lg xl:max-w-xl lg:hidden">
            <img
              src={franchiseHeroIllustration}
              alt=""
              className="object-contain object-bottom w-64 max-w-full h-auto"
            />
          </div>
        </div>

        {/* Desktop Illustration anchored bottom-right */}
        <div className="hidden absolute right-0 bottom-0 pointer-events-none lg:block">
          <img
            src={franchiseHeroIllustration}
            alt=""
            className="h-[70vh] w-auto object-contain"
          />
        </div>
      </section>

      {/* FICO Model / Franchise Highlight Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50/40">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center lg:text-left">
            <span className="inline-flex items-center px-4 py-1 text-xs font-semibold tracking-wide text-blue-800 rounded-full bg-blue-100/70">
              Franchise Model Snapshot
            </span>
          </div>

          <div className="grid gap-10 items-stretch lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.1fr)_minmax(0,0.9fr)]">
            {/* Left: Model description + CTA */}
            <div className="h-full">
              <div className="relative p-8 h-full rounded-3xl border border-blue-50 shadow-lg bg-white/90">
                <h2 className="mb-4 text-3xl font-bold md:text-4xl" style={{ color: '#4B9CD3' }}>
                  FICO Model
                </h2>
                <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                  The FICO model allows ACE STAYZ to grow through franchise-owned properties while
                  maintaining a few company-operated hotels to set quality standards. This ensures
                  faster expansion with consistent service and strong brand control.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Ideal for partners who want operational support while owning the asset.
                </p>
                <a
                  href="#franchise-form"
                  className="inline-flex items-center justify-center px-8 py-3 mt-6 rounded-full text-base md:text-lg font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
                  style={{ backgroundColor: '#4B9CD3' }}
                >
                  Contact us
                </a>
              </div>
            </div>

            {/* Middle: Property card */}
            <div className="flex justify-center h-full">
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-x-6 -inset-y-6 rounded-[2.25rem] bg-blue-100/40 blur-xl" aria-hidden />
                <figure className="relative w-full rounded-[1.75rem] overflow-hidden bg-white shadow-2xl border border-blue-50">
                  <img
                    src={franchiseCardImage}
                    alt="Ace Stayz Pitampura"
                    className="object-cover w-full h-auto"
                  />
                  <figcaption className="px-5 py-3 text-sm font-semibold text-center text-gray-900">
                    Ace Stayz Pitampura
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Right: Investment stats */}
            <div className="flex flex-col gap-5 justify-center h-full">
              <div className="px-6 py-4 rounded-2xl border border-blue-50 shadow-md bg-white/90">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Investment
                </p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: '#4B9CD3' }}>
                  40 LAKHS
                </p>
              </div>
              <div className="px-6 py-4 rounded-2xl border border-blue-50 shadow-md bg-white/90">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Total Beds
                </p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: '#4B9CD3' }}>
                  16
                </p>
              </div>
              <div className="px-6 py-4 rounded-2xl border border-blue-50 shadow-md bg-white/90">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                  Return on Investment
                </p>
                <p className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl" style={{ color: '#4B9CD3' }}>
                  2 months
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Based on current performance of similar properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Calculator Section */}
      <section className="py-20" style={{ backgroundColor: '#4B9CD3' }}>
        <div className="px-4 mx-auto max-w-5xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Calculate Your Earning Potential
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-medium text-white md:text-base">
              Use the revenue calculator to see how much your business could earn before you start.
            </p>
          </div>

          <div className="rounded-[2.25rem] bg-white/95 shadow-2xl border border-blue-100 px-6 py-8 md:px-10 md:py-10">
            {/* Top metrics grid */}
            <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 md:gap-6">
              <div className="px-6 py-5 text-center rounded-3xl bg-blue-50">
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  ₹{Math.round(yearlyRevenue).toLocaleString('en-IN')}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-gray-600 md:text-sm">
                  Revenue Yearly
                </p>
              </div>
              <div className="px-6 py-5 text-center rounded-3xl bg-blue-50">
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  ₹{Math.round(yearlyExpenses).toLocaleString('en-IN')}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-gray-600 md:text-sm">
                  Expense Yearly
                </p>
              </div>
              <div className="px-6 py-5 text-center rounded-3xl bg-blue-50">
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  {(occupancyRate * 100).toFixed(1)}%
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-gray-600 md:text-sm">
                  Occupancy
                </p>
              </div>
              <div className="px-6 py-5 text-center rounded-3xl bg-blue-50">
                <p className="text-xl font-bold text-gray-900 md:text-2xl">
                  ₹{Math.round(initialInvestment).toLocaleString('en-IN')}
                </p>
                <p className="mt-1 text-xs font-medium tracking-wide uppercase text-gray-600 md:text-sm">
                  Initial Investment
                </p>
              </div>
            </div>

            {/* Controls - presets plus manual inputs for full control */}
            <div className="space-y-8">
              {/* Location */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-gray-700">
                  Select a Location
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {(['metro', 'major', 'tourist', 'offbeat', 'remote'] as CalculatorLocation[]).map(
                    (key) => {
                      const config = calculatorConfig[key]
                      const isActive = selectedLocationCategory === key
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedLocationCategory(key)}
                          className={`flex flex-col items-start rounded-2xl border-2 px-4 py-3 text-left transition-all text-xs sm:text-sm ${
                            isActive
                              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <span className="font-semibold">{config.label}</span>
                          <span
                            className={`mt-1 text-[10px] sm:text-xs ${
                              isActive ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {config.helper}
                          </span>
                        </button>
                      )
                    }
                  )}
                </div>
              </div>

              {/* Number of rooms */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-gray-700">
                  Number of Rooms
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={roomCountInput}
                    onChange={handleRoomCountChange}
                    className="w-full max-w-[140px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  />
                  <p className="text-[11px] text-gray-500">
                    Adjust this to match the total sellable rooms in your property.
                  </p>
                </div>
              </div>

              {/* Average room rate */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-gray-700">
                  Average Room Rate
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'budget' as CalculatorRateBand, label: 'Budget' },
                    { key: 'midscale' as CalculatorRateBand, label: 'Mid-scale' }
                  ].map((option) => {
                    const isActive = selectedRateBand === option.key
                    return (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => setSelectedRateBand(option.key)}
                        className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-md'
                            : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">₹</span>
                    <input
                      type="number"
                      min={0}
                      max={50000}
                      step={100}
                      value={averageRateInput}
                      onChange={handleAverageRateChange}
                      className="w-full max-w-[160px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Per room, per night (before taxes).
                  </p>
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  Current average rate: ₹{averageRateInput.toLocaleString('en-IN')} per room per night
                </p>
              </div>

              {/* Occupancy */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-gray-700">
                  Average Occupancy
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      value={occupancyInput}
                      onChange={handleOccupancyChange}
                      className="w-full max-w-[120px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                    <span className="text-sm text-gray-600">%</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Average occupancy across the year.
                  </p>
                </div>
              </div>

              {/* Operating expenses */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-gray-700">
                  Operating Expenses
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={1}
                      value={expenseRatioInput}
                      onChange={handleExpenseRatioChange}
                      className="w-full max-w-[120px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                    <span className="text-sm text-gray-600">% of revenue</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Includes staff, utilities, maintenance, marketing and OTA commissions.
                  </p>
                </div>
              </div>

              {/* Initial investment */}
              <div>
                <p className="mb-3 text-xs font-bold tracking-[0.18em] uppercase text-gray-700">
                  Initial Investment
                </p>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">₹</span>
                    <input
                      type="number"
                      min={0}
                      max={100000000}
                      step={50000}
                      value={initialInvestmentInput}
                      onChange={handleInitialInvestmentChange}
                      className="w-full max-w-[200px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                    />
                  </div>
                  <p className="text-[11px] text-gray-500">
                    One-time setup cost for interiors, furniture and licenses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold" style={{ color: '#4B9CD3' }}>6+</div>
              <div className="text-sm text-gray-600">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold" style={{ color: '#4B9CD3' }}>500+</div>
              <div className="text-sm text-gray-600">Satisfied Guests</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold" style={{ color: '#4B9CD3' }}>4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-5xl font-bold" style={{ color: '#4B9CD3' }}>3</div>
              <div className="text-sm text-gray-600">Operating Properties</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50/40">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: '#4B9CD3' }}>
              Our Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {commitmentItems.map((item) => {
              const isActive = activeCommitment === item.key
              const Icon = item.icon
              const handleCardClick = () => {
                setActiveCommitment(item.key)
              }

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={handleCardClick}
                  aria-pressed={isActive}
                  className={`relative flex flex-col items-center rounded-3xl px-6 pt-10 pb-6 shadow-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4B9CD3] ${
                    isActive
                      ? 'bg-[#4B9CD3] text-white shadow-xl -translate-y-1'
                      : 'bg-white text-gray-800 hover:-translate-y-1 hover:shadow-xl'
                  }`}
                >
                  <div
                    className={`absolute -top-4 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow-md ${
                      isActive ? 'bg-white text-[#4B9CD3]' : 'bg-[#4B9CD3] text-white'
                    }`}
                  >
                    {item.id}
                  </div>
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                      isActive ? 'bg-white/10' : 'bg-[#4B9CD3]/10'
                    }`}
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        isActive ? 'text-white' : 'text-[#1E4F8A]'
                      }`}
                    />
                  </div>
                  <p
                    className={`mt-1 text-sm font-semibold tracking-wide uppercase ${
                      isActive ? 'text-white' : 'text-[#1E4F8A]'
                    }`}
                  >
                    {item.label}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="mt-10">
            {commitmentItems
              .filter((item) => item.key === activeCommitment)
              .map((item) => (
                <div
                  key={item.key}
                  className="mx-auto max-w-3xl rounded-3xl bg-[#4B9CD3] px-6 py-8 text-center text-white shadow-lg sm:px-10"
                >
                  <h3 className="mb-3 text-2xl font-bold sm:text-3xl">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Minimum Revenue Guarantee Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
            {/* Illustration */}
            <div className="flex justify-center md:justify-start">
              <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-3xl border border-gray-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#4B9CD3] text-white shadow-md">
                  <FiDollarSign className="w-6 h-6" />
                </div>
                <div className="space-y-3 text-[#4B9CD3]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#4B9CD3]/5">
                      <FiDollarSign className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold">Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#4B9CD3]/5">
                      <FiTrendingUp className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold">Monthly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#4B9CD3]/5">
                      <FiUsers className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold">Investor-first</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="text-left">
              <div className="inline-flex items-center rounded-full bg-[#4B9CD3] px-6 py-2 text-xs font-semibold tracking-[0.16em] text-white uppercase shadow-sm">
                Minimum Revenue Guarantee
              </div>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-800 sm:text-lg">
                Ace Stayz is the only mid market hotel franchise that offers its investors a{' '}
                <span className="font-semibold">minimum monthly</span>{' '}
                <span className="font-semibold text-red-500">revenue guarantee.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Director Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Copy */}
            <div className="order-2 space-y-6 lg:order-1">
              <h2 className="text-4xl font-bold tracking-tight text-[#4B9CD3] sm:text-5xl">
                Meet Our Director
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 max-w-xl">
                Built by Aditya Parasharr and Aashi Parashar in 2018. They are experienced hospitality
                thinkers who value precision over promises. Ace Stayz blends smart locations, thoughtful
                design, and operational discipline to deliver stays that are consistent, comfortable, and
                always dependable.
              </p>
            </div>

            {/* Right: YouTube video (reused from homepage) */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.18)] aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/t2JmtDjXDN8"
                  title="Franchise Model Explained - Ace Stayz"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-blue-50/25 to-white">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#4B9CD3] via-[#7C3AED] to-[#4B9CD3]" aria-hidden />
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-extrabold tracking-[0.22em] text-center text-[#4B9CD3] sm:text-4xl uppercase"
            style={{ textShadow: '0 3px 0 rgba(15,23,42,0.15)' }}
          >
            Timeline
          </h2>

          <div className="mt-12 grid items-stretch gap-10 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
            {/* Story card */}
            <div className="relative">
              <div className="absolute -top-4 left-8 h-4 w-14 rounded-t-3xl bg-[#4B9CD3]" aria-hidden />
              <div className="relative px-8 py-10 text-sm leading-relaxed text-white rounded-3xl shadow-[0_18px_55px_rgba(15,23,42,0.22)] bg-[#4B9CD3] sm:text-base sm:px-10 sm:py-12">
                <p>
                  In 2017, our founder, during a trip to Rishikesh with friends, noticed a clear gap in the hospitality
                  experience — while destinations were appealing, accommodations often lacked consistency, comfort, and
                  thoughtful design. Recognizing an opportunity to create better, standardized stays, he envisioned a
                  brand that would combine modern interiors with reliable service. This insight led to the incorporation
                  of <span className="font-semibold">ACE STAYZ</span> and marked the start of its journey in hospitality.
                </p>
              </div>
            </div>

            {/* Year markers */}
            <div className="flex justify-center md:justify-start">
              <div className="relative flex flex-col items-start">
                <div className="absolute left-4 top-3 bottom-10 w-px bg-gradient-to-b from-[#4B9CD3] via-[#4B9CD3]/40 to-transparent" aria-hidden />

                {TIMELINE_YEARS.map((year, index) => {
                  const isLast = index === TIMELINE_YEARS.length - 1
                  const offsetClass =
                    index === 0 ? 'ml-0' : index === 1 ? 'ml-3 sm:ml-4' : index === 2 ? 'ml-6 sm:ml-8' : 'ml-4 sm:ml-10'

                  return (
                    <div
                      key={year}
                      className={`relative flex items-center gap-4 ${!isLast ? 'mb-6 sm:mb-8' : ''} ${offsetClass}`}
                    >
                      <div className="relative z-10 flex items-center justify-center w-6 h-6 bg-white rounded-full border-4 border-[#4B9CD3] shadow-sm" />
                      <div className="overflow-hidden rounded-2xl border border-blue-100 min-w-[120px] bg-white shadow-lg">
                        <div className="px-5 py-2 text-sm font-semibold tracking-wide text-white uppercase bg-[#4B9CD3]">
                          {year}
                        </div>
                        <div className="h-6 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hear From Our Partners */}
      <section className="py-20 text-white" style={{ backgroundColor: '#4B9CD3' }}>
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Hear From Our Partners
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {partnerTestimonials.map((partner) => (
              <figure
                key={partner.name}
                className="flex flex-col justify-between h-full overflow-hidden bg-white rounded-3xl shadow-xl"
              >
                <div className="flex flex-col items-center px-8 pt-10 pb-6">
                  <div className="flex items-center justify-center w-20 h-20 mb-6 border-2 border-gray-300 rounded-full">
                    <div className="w-10 h-10 border-2 border-gray-400 rounded-full" />
                  </div>
                  <figcaption className="text-center">
                    <p className="text-sm font-semibold text-gray-900 uppercase">
                      {partner.name}
                    </p>
                    <p className="mt-1 text-xs font-medium tracking-wide text-gray-500 uppercase">
                      {partner.role}
                    </p>
                  </figcaption>
                </div>
                <div className="px-6 py-4 text-center bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">
                    {partner.quote}
                  </p>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - removed */}
      <section id="benefits" className="hidden">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: '#4B9CD3' }}>
              Why Partner With Us?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Join a thriving brand that's redefining premium serviced apartments in Delhi NCR
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="inline-flex justify-center items-center mb-6 w-16 h-16 rounded-2xl" style={{ backgroundColor: '#E6F1FA' }}>
                  <div className="text-3xl" style={{ color: '#4B9CD3' }}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Form Section - removed */}
      <section id="franchise-form" className="hidden">
        <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl" style={{ color: '#4B9CD3' }}>
              Start Your Journey
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the application form and our team will get back to you
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {[1, 2].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col flex-1 items-center">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep >= step 
                          ? 'text-white shadow-lg' 
                          : 'bg-gray-200 text-gray-500'
                      }`}
                      style={currentStep >= step ? { backgroundColor: '#4B9CD3' } : {}}
                    >
                      {currentStep > step ? <FiCheck /> : step}
                    </div>
                    <div className={`mt-2 text-sm font-medium ${
                      currentStep >= step ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step === 1 && 'Personal Information'}
                      {step === 2 && 'Business & Interest'}
                    </div>
                  </div>
                  {step < 2 && (
                    <div className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                      currentStep > step ? 'shadow-sm' : 'bg-gray-200'
                    }`} style={currentStep > step ? { backgroundColor: '#4B9CD3' } : {}} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 shadow-2xl md:p-12">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">Personal Information</h3>
                  
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="e.g., Delhi, Gurugram"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Business Details & Interest */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">Business Details & Interest</h3>
                  
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Business Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="businessExperience"
                      value={formData.businessExperience}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                    >
                      <option value="">Select experience level</option>
                      <option value="no-experience">No Experience</option>
                      <option value="1-3-years">1-3 Years</option>
                      <option value="3-5-years">3-5 Years</option>
                      <option value="5-plus-years">5+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Investment Capacity <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="investmentCapacity"
                      value={formData.investmentCapacity}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                    >
                      <option value="">Select investment range</option>
                      <option value="under-50l">Under ₹50 Lakhs</option>
                      <option value="50l-1cr">₹50 Lakhs - ₹1 Crore</option>
                      <option value="1cr-2cr">₹1 Crore - ₹2 Crores</option>
                      <option value="above-2cr">Above ₹2 Crores</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Preferred Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                    >
                      <option value="">Select location</option>
                      <option value="delhi">Delhi</option>
                      <option value="gurugram">Gurugram</option>
                      <option value="noida">Noida</option>
                      <option value="ghaziabad">Ghaziabad</option>
                      <option value="faridabad">Faridabad</option>
                      <option value="other">Other NCR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Timeline to Start <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (Within 3 months)</option>
                      <option value="3-6-months">3-6 Months</option>
                      <option value="6-12-months">6-12 Months</option>
                      <option value="exploring">Just Exploring</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      How did you hear about us?
                    </label>
                    <select
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleInputChange}
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                    >
                      <option value="">Select an option</option>
                      <option value="google">Google Search</option>
                      <option value="social-media">Social Media</option>
                      <option value="referral">Referral</option>
                      <option value="website">Website</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Tell us about your interest
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="px-4 py-3 w-full rounded-xl border border-gray-300 transition-all resize-none focus:ring-2 focus:border-transparent"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="Share your thoughts, questions, or what excites you about this opportunity..."
                    />
                  </div>

                  <div className="p-4 bg-blue-50 rounded-r-xl border-l-4" style={{ borderColor: '#4B9CD3' }}>
                    <p className="text-sm text-gray-700">
                      By submitting this form, you agree to be contacted by ACE STAYZ regarding franchise opportunities. Your information will be kept confidential.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex gap-2 items-center px-6 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl transition-all duration-300 hover:bg-gray-200"
                  >
                    <FiArrowLeft />
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex gap-2 items-center px-6 py-3 font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: '#4B9CD3' }}
                  >
                    Next
                    <FiArrowRight />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex gap-2 items-center px-8 py-3 font-semibold text-white rounded-xl transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1"
                    style={{ backgroundColor: '#4B9CD3' }}
                  >
                    Submit Application
                    <FiCheck />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA Section - removed */}
      <section className="hidden" />

      <Footer />
    </div>
  )
}

export default FranchisePage
