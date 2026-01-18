import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { FiCheck, FiTrendingUp, FiUsers, FiAward, FiTarget, FiArrowRight, FiArrowLeft } from 'react-icons/fi'

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="relative h-[70vh] min-h-[600px]">
          <div 
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
          </div>

          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center text-white">
              <div className="inline-block px-6 py-2 mb-6 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-sm font-semibold" style={{ color: '#4B9CD3' }}>Join Our Success Story</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl mb-6">
                Become an <span style={{ color: '#4B9CD3' }}>ACE STAYZ</span> Franchise Partner
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8">
                Partner with Delhi NCR's premium serviced apartment brand and build a profitable hospitality business
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="#franchise-form"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  style={{ backgroundColor: '#4B9CD3' }}
                >
                  Apply Now
                  <FiArrowRight />
                </a>
                <a 
                  href="#benefits"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#4B9CD3' }}>6+</div>
              <div className="text-sm text-gray-600">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#4B9CD3' }}>500+</div>
              <div className="text-sm text-gray-600">Satisfied Guests</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#4B9CD3' }}>4.9</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2" style={{ color: '#4B9CD3' }}>3</div>
              <div className="text-sm text-gray-600">Operating Properties</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#4B9CD3' }}>
              Why Partner With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join a thriving brand that's redefining premium serviced apartments in Delhi NCR
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl" style={{ backgroundColor: '#E6F1FA' }}>
                  <div className="text-3xl" style={{ color: '#4B9CD3' }}>
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Franchise Form Section */}
      <section id="franchise-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#4B9CD3' }}>
              Start Your Journey
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the application form and our team will get back to you
            </p>
          </div>

          {/* Step Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2].map((step) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center flex-1">
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
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="e.g., Delhi, Gurugram"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Business Details & Interest */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Business Details & Interest</h3>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Business Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="businessExperience"
                      value={formData.businessExperience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Investment Capacity <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="investmentCapacity"
                      value={formData.investmentCapacity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Preferred Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Timeline to Start <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tell us about your interest
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all resize-none"
                      style={{ '--tw-ring-color': '#4B9CD3' } as React.CSSProperties}
                      placeholder="Share your thoughts, questions, or what excites you about this opportunity..."
                    />
                  </div>

                  <div className="bg-blue-50 border-l-4 p-4 rounded-r-xl" style={{ borderColor: '#4B9CD3' }}>
                    <p className="text-sm text-gray-700">
                      By submitting this form, you agree to be contacted by ACE STAYZ regarding franchise opportunities. Your information will be kept confidential.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex items-center gap-2 px-6 py-3 text-gray-700 bg-gray-100 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
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
                    className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: '#4B9CD3' }}
                  >
                    Next
                    <FiArrowRight />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Have Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our franchise team is here to help you every step of the way
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:franchise@acestayz.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              Email Us
            </a>
            <a 
              href="tel:+918860602929"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
              style={{ backgroundColor: '#4B9CD3' }}
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default FranchisePage
