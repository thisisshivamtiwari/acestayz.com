import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const handleToggleSidebar = () => {
    // On mobile, toggle open/close
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      // On desktop, toggle collapsed/expanded
      setIsSidebarCollapsed(!isSidebarCollapsed)
      setIsSidebarOpen(true)
    }
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        onToggleSidebar={handleToggleSidebar} 
        isSidebarOpen={isSidebarOpen}
        isSidebarCollapsed={isSidebarCollapsed}
      />
      <div className="flex relative">
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onClose={handleCloseSidebar}
          isCollapsed={isSidebarCollapsed}
        />
        <main 
          className={`flex-1 p-6 lg:p-8 pt-24 lg:pt-20 transition-all duration-300 ${
            isSidebarOpen && !isSidebarCollapsed 
              ? 'lg:ml-64' 
              : isSidebarOpen && isSidebarCollapsed 
                ? 'lg:ml-16' 
                : 'lg:ml-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

