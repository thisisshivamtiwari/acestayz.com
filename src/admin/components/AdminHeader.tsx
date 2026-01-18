import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiBell, FiSearch, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'
import { useAdminAuth } from '../context/AdminAuthContext'

interface AdminHeaderProps {
  onToggleSidebar: () => void
  isSidebarOpen: boolean
  isSidebarCollapsed?: boolean
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, isSidebarOpen, isSidebarCollapsed = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { adminUser, logout } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleToggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
    setIsProfileOpen(false)
  }

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle sidebar"
            >
              {(() => {
                // On mobile: show X when open, hamburger when closed
                // On desktop: show X when expanded (not collapsed), hamburger when collapsed
                if (isMobile) {
                  return isSidebarOpen ? (
                    <FiX className="w-5 h-5 text-gray-600" />
                  ) : (
                    <FiMenu className="w-5 h-5 text-gray-600" />
                  )
                } else {
                  return !isSidebarCollapsed ? (
                    <FiX className="w-5 h-5 text-gray-600" />
                  ) : (
                    <FiMenu className="w-5 h-5 text-gray-600" />
                  )
                }
              })()}
            </button>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-2xl font-bold" style={{ color: '#4B9CD3' }}>
                acestayz
              </span>
              <span className="text-sm text-gray-500 font-medium">Admin</span>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings, hotels, users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              aria-label="Notifications"
            >
              <FiBell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={handleToggleProfile}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">Admin</span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{adminUser?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500">{adminUser?.email || 'admin@acestayz.com'}</p>
                  </div>
                  <a
                    href="#"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate('/admin/settings')
                      setIsProfileOpen(false)
                    }}
                  >
                    <FiSettings className="w-4 h-4" />
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

