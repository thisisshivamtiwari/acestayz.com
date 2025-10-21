import React from 'react'
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer: React.FC = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: '#4B9CD3' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold">AceStayz</span>
            </div>
            <p className="text-blue-100 leading-relaxed mb-6">
              We leverage technology to create and manage smart hotels for a new generation of young travellers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <FiYoutube className="w-5 h-5" />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  Why AceStayz?
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  Developers & Owners
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  Loyalty Program
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  For the Press
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  In the Media
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors underline">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <FiMapPin className="w-5 h-5 text-blue-200 mr-3" />
                <span className="text-blue-100">123 Hotel Street, City, State 12345</span>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-5 h-5 text-blue-200 mr-3" />
                <span className="text-blue-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-5 h-5 text-blue-200 mr-3" />
                <span className="text-blue-100">info@acestayz.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center space-x-6 text-sm text-blue-100 mb-4 md:mb-0">
              <span>©2025 AceStayz</span>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Cancellation Policy</a>
              <a href="#" className="hover:text-white transition-colors">Privacy & Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Blog & Buzz</a>
            </div>
            <div className="text-sm text-blue-100">
              Imperativ Hospitality Pvt Ltd
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
