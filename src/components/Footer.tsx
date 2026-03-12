import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import logoImage from '../assets/images/logo.svg'

const Footer: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    // Handle social media clicks
    console.log(`Clicked ${platform}`)
  }

  return (
    <footer className="overflow-hidden relative text-white" style={{ backgroundColor: '#4B9CD3' }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-transparent via-white/5" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link to="/" className="inline-block" aria-label="Ace Stayz home">
                <img
                  src={logoImage}
                  alt="Ace Stayz"
                  className="w-auto h-14 sm:h-16"
                />
              </Link>
            </div>
            <p className="mb-6 font-sans leading-relaxed text-white/90">
            Modern Apart-hotels in Delhi NCR. Experience comfort, convenience, and style at prime locations across Gurugram and Delhi.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="transition-colors duration-300 text-white/80 hover:text-white"
                aria-label="Follow us on Instagram"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSocialClick('Instagram')
                  }
                }}
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="transition-colors duration-300 text-white/80 hover:text-white"
                aria-label="Follow us on Twitter"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSocialClick('Twitter')
                  }
                }}
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="transition-colors duration-300 text-white/80 hover:text-white"
                aria-label="Follow us on YouTube"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSocialClick('YouTube')
                  }
                }}
              >
                <FiYoutube className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="transition-colors duration-300 text-white/80 hover:text-white"
                aria-label="Follow us on Facebook"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSocialClick('Facebook')
                  }
                }}
              >
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/" 
                  className="font-sans underline transition-colors duration-300 text-white/90 hover:text-white decoration-white/50 hover:decoration-white"
                  aria-label="Home"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="font-sans underline transition-colors duration-300 text-white/90 hover:text-white decoration-white/50 hover:decoration-white"
                  aria-label="About Us"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/franchise" 
                  className="font-sans underline transition-colors duration-300 text-white/90 hover:text-white decoration-white/50 hover:decoration-white"
                  aria-label="Franchise Partner"
                >
                  Franchise Partner
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">Our Locations</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/location/delhi" 
                  className="font-sans underline transition-colors duration-300 text-white/90 hover:text-white decoration-white/50 hover:decoration-white"
                  aria-label="Delhi Properties"
                >
                  Delhi
                </a>
              </li>
              <li>
                <a 
                  href="/location/gurugram" 
                  className="font-sans underline transition-colors duration-300 text-white/90 hover:text-white decoration-white/50 hover:decoration-white"
                  aria-label="Gurugram Properties"
                >
                  Gurugram
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <FiMapPin className="flex-shrink-0 mt-1 mr-3 w-5 h-5 text-white" />
                <div className="font-sans text-white/90">
                  <p className="mb-2">Modern Apart-hotels across Delhi NCR</p>
                  <p className="text-sm text-white/70">Gurugram • Delhi</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiPhone className="flex-shrink-0 mr-3 w-5 h-5 text-white" />
                <a href="tel:+919403890663" className="font-sans transition-colors text-white/90 hover:text-white">+91 94038 90663</a>
              </div>
              <div className="flex items-center">
                <FiMail className="flex-shrink-0 mr-3 w-5 h-5 text-white" />
                <a href="mailto:info@acestayz.com" className="font-sans transition-colors text-white/90 hover:text-white">info@acestayz.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-white/20">
        <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between items-center text-center md:flex-row md:text-left">
            <div className="mb-2 font-sans text-sm text-white/80 md:mb-0">
              ©2026 ACE STAYZ - Modern Apart-hotels
            </div>
            <div className="font-sans text-sm text-white/80">
              <p>All Rights Reserved</p>
              <p className="mt-1">
                <span className="font-semibold text-white/90">Registration Number:</span> U55109UP2025PTC215341
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
