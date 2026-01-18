import React from 'react'
import AdminLayout from '../../components/admin/AdminLayout'

/**
 * Admin Dashboard Page
 * Main dashboard for admin panel
 */
const AdminDashboardPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-terracotta mb-2">
            Dashboard
          </h1>
          <p className="text-charcoal/70">
            Welcome to the AceStayz Admin Panel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Bookings */}
          <div className="bg-cream border-2 border-terracotta/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-terracotta/10">
                <svg
                  className="w-6 h-6 text-terracotta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-1">1,234</h3>
            <p className="text-sm text-charcoal/60">Total Bookings</p>
          </div>

          {/* Active Hotels */}
          <div className="bg-cream border-2 border-terracotta/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gold-dust/10">
                <svg
                  className="w-6 h-6 text-gold-dust"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-1">56</h3>
            <p className="text-sm text-charcoal/60">Active Hotels</p>
          </div>

          {/* Total Users */}
          <div className="bg-cream border-2 border-terracotta/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blush-pink/10">
                <svg
                  className="w-6 h-6 text-terracotta"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-1">8,901</h3>
            <p className="text-sm text-charcoal/60">Total Users</p>
          </div>

          {/* Revenue */}
          <div className="bg-cream border-2 border-terracotta/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-gold-dust/10">
                <svg
                  className="w-6 h-6 text-gold-dust"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-charcoal mb-1">₹12.5L</h3>
            <p className="text-sm text-charcoal/60">Total Revenue</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-cream border-2 border-terracotta/20 rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold font-serif text-terracotta mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-cream border border-terracotta/10">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">
                  New booking received
                </p>
                <p className="text-xs text-charcoal/60">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-cream border border-terracotta/10">
              <div className="w-10 h-10 rounded-full bg-gold-dust/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-gold-dust"
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
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">
                  New user registered
                </p>
                <p className="text-xs text-charcoal/60">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-cream border border-terracotta/10">
              <div className="w-10 h-10 rounded-full bg-blush-pink/10 flex items-center justify-center">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-charcoal">
                  Hotel added to Manali
                </p>
                <p className="text-xs text-charcoal/60">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboardPage

