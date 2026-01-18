import React from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAdminToken } from '../../utils/adminAuth'

/**
 * Admin Header Component
 * Displays header with user info and logout button
 */
const AdminHeader: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeAdminToken()
    navigate('/panel/admin/login')
  }

  return (
    <header className="h-16 bg-cream border-b-2 border-terracotta/20 shadow-sm sticky top-0 z-40">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold font-serif text-terracotta">
            AceStayz Admin
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* User Info */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-terracotta/5">
            <div className="w-8 h-8 rounded-full bg-terracotta/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-terracotta"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-charcoal">Admin</span>
              <span className="text-xs text-charcoal/60">admin@acestayz.com</span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta text-cream font-semibold text-sm hover:opacity-90 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-dust focus-visible:ring-offset-2"
            style={{
              backgroundColor: '#A0523D',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#8B4535'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#A0523D'
            }}
            aria-label="Logout"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader

