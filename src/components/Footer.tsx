import React from 'react'
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer: React.FC = () => {
  const handleSocialClick = (platform: string) => {
    // Handle social media clicks
    console.log(`Clicked ${platform}`)
  }

  const handleLinkClick = (link: string) => {
    // Handle link clicks
    console.log(`Clicked ${link}`)
  }

  return (
    <footer className="text-white relative overflow-hidden" style={{ backgroundColor: '#4B9CD3' }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3 shadow-lg">
                <span className="font-bold text-xl font-serif" style={{ color: '#4B9CD3' }}>A</span>
              </div>
              <span className="text-2xl font-bold font-serif text-white">AceStayz</span>
            </div>
            <p className="text-white/90 leading-relaxed mb-6 font-sans">
              We leverage technology to create and manage smart hotels for a new generation of young travellers.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/80 hover:text-white transition-colors duration-300"
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
                className="text-white/80 hover:text-white transition-colors duration-300"
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
                className="text-white/80 hover:text-white transition-colors duration-300"
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
                className="text-white/80 hover:text-white transition-colors duration-300"
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
            <h3 className="text-lg font-semibold mb-6 font-serif text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="Why AceStayz?"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('Why AceStayz')
                    }
                  }}
                >
                  Why AceStayz?
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="Developers and Owners"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('Developers & Owners')
                    }
                  }}
                >
                  Developers & Owners
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="Careers"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('Careers')
                    }
                  }}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="Loyalty Program"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('Loyalty Program')
                    }
                  }}
                >
                  Loyalty Program
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-serif text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="Contact Us"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('Contact Us')
                    }
                  }}
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="For the Press"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('For the Press')
                    }
                  }}
                >
                  For the Press
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="In the Media"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('In the Media')
                    }
                  }}
                >
                  In the Media
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-white/90 hover:text-white transition-colors duration-300 underline decoration-white/50 hover:decoration-white font-sans"
                  aria-label="About Us"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleLinkClick('About Us')
                    }
                  }}
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 font-serif text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FiMapPin className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white/90 font-sans">123 Hotel Street, City, State 12345</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white/90 font-sans">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                <span className="text-white/90 font-sans">info@acestayz.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm text-white/80 mb-4 md:mb-0 font-sans">
              <span>©2025 AceStayz</span>
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                aria-label="Terms and Conditions"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleLinkClick('Terms & Conditions')
                  }
                }}
              >
                Terms & Conditions
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                aria-label="Cancellation Policy"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleLinkClick('Cancellation Policy')
                  }
                }}
              >
                Cancellation Policy
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                aria-label="Privacy and Cookie Policy"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleLinkClick('Privacy & Cookie Policy')
                  }
                }}
              >
                Privacy & Cookie Policy
              </a>
              <a 
                href="#" 
                className="hover:text-white transition-colors duration-300"
                aria-label="Blog and Buzz"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleLinkClick('Blog & Buzz')
                  }
                }}
              >
                Blog & Buzz
              </a>
            </div>
            {/* <div className="text-sm text-cream/80 font-sans">
              Imperativ Hospitality Pvt Ltd
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
