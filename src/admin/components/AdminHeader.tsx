import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useAdminAuth } from '../context/AdminAuthContext'
import logoImage from '../../assets/images/logo.svg'

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
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleToggleProfile = () => setIsProfileOpen(!isProfileOpen)

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
    setIsProfileOpen(false)
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-4 items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              {isMobile
                ? (isSidebarOpen ? <FiX className="w-5 h-5 text-gray-600" /> : <FiMenu className="w-5 h-5 text-gray-600" />)
                : (!isSidebarCollapsed ? <FiX className="w-5 h-5 text-gray-600" /> : <FiMenu className="w-5 h-5 text-gray-600" />)}
            </button>
            <div className="hidden gap-2 items-center md:flex">
              <img
                src={logoImage}
                alt="Ace Stayz"
                className="w-auto h-8 sm:h-9"
              />
 
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={handleToggleProfile}
                className="flex gap-2 items-center p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
                aria-label="User menu"
              >
                <div className="flex justify-center items-center w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
                <span className="hidden text-sm font-medium text-gray-700 md:block">Admin</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 z-50 py-2 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{adminUser?.name || 'Admin User'}</p>
                    <p className="text-xs text-gray-500">{adminUser?.email || 'admin@acestayz.com'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex gap-2 items-center px-4 py-2 w-full text-sm text-red-600 transition-colors duration-200 hover:bg-red-50"
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

