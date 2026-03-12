import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
}

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <FiHome className="w-5 h-5" />,
    path: '/admin'
  }
]

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, isCollapsed = false }) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth < 1024) {
      onClose()
    }
  }, [location.pathname, onClose])

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-16 left-0 z-30
          bg-white border-r border-t border-gray-200
          h-[calc(100vh-4rem)]
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-16' : 'w-64'}
          lg:block
        `}
      >
        <nav className="overflow-y-auto overflow-x-hidden p-4 h-full">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuItemClick(item.path)}
                  className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className={location.pathname === item.path ? 'text-blue-600' : 'text-gray-600'}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar

