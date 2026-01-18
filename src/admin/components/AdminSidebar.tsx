import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  FiHome,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiLayout,
  FiEdit2
} from 'react-icons/fi'

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  children?: MenuItem[]
}

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose, isCollapsed = false }) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Close sidebar on mobile devices when navigating
      if (window.innerWidth < 1024) {
        onClose()
      }
    }
    
    handleRouteChange()
  }, [location.pathname, onClose])

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/admin'
    },
    {
      id: 'hotels',
      label: 'Hotels',
      icon: <FiMapPin className="w-5 h-5" />,
      path: '/admin/hotels',
      children: [
        { id: 'all-hotels', label: 'All Hotels', icon: <FiMapPin className="w-4 h-4" />, path: '/admin/hotels' },
        { id: 'manage-hotels', label: 'Manage Hotels', icon: <FiEdit2 className="w-4 h-4" />, path: '/admin/hotels/manage' }
      ]
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: <FiCalendar className="w-5 h-5" />,
      path: '/admin/bookings'
    },
    {
      id: 'users',
      label: 'Users',
      icon: <FiUsers className="w-5 h-5" />,
      path: '/admin/users'
    },
    {
      id: 'navigation',
      label: 'Navigaiton',
      icon: <FiMenu className="w-5 h-5" />,
      path: '/admin/content/navigation'
    },
    {
      id: 'page-builder',
      label: 'Page Builder',
      icon: <FiLayout className="w-5 h-5" />,
      path: '/admin/content/page-builder'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <FiSettings className="w-5 h-5" />,
      path: '/admin/settings'
    }
  ]

  const handleToggleMenu = (menuId: string) => {
    // Don't expand menus when sidebar is collapsed
    if (isCollapsed) return
    
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const handleMenuItemClick = (path: string) => {
    navigate(path)
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  const isMenuExpanded = (menuId: string) => expandedMenus.includes(menuId)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 z-30
          bg-white border-r border-t border-gray-200
          h-[calc(100vh-4rem)]
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-16' : 'w-64'}
          lg:block
        `}
      >
        <nav className="overflow-y-auto overflow-x-hidden p-4 h-full">
          <ul className="space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => {
                        if (isCollapsed) {
                          handleMenuItemClick(item.path)
                        } else {
                          handleToggleMenu(item.id)
                        }
                      }}
                      className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-3 rounded-lg transition-colors duration-200 ${
                        isMenuExpanded(item.id) && !isCollapsed
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className={`flex ${isCollapsed ? 'justify-center' : 'gap-3'} items-center`}>
                        <span className={isMenuExpanded(item.id) ? 'text-blue-600' : 'text-gray-600'}>
                          {item.icon}
                        </span>
                        {!isCollapsed && (
                          <>
                            <span className="font-medium">{item.label}</span>
                            {isMenuExpanded(item.id) ? (
                              <FiChevronDown className="ml-auto w-4 h-4" />
                            ) : (
                              <FiChevronRight className="ml-auto w-4 h-4" />
                            )}
                          </>
                        )}
                      </div>
                    </button>
                    {isMenuExpanded(item.id) && !isCollapsed && (
                      <ul className="mt-1 ml-4 space-y-1">
                        {item.children.map(child => (
                          <li key={child.id}>
                            <button
                              onClick={() => handleMenuItemClick(child.path)}
                              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                                location.pathname === child.path
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <span>{child.icon}</span>
                              <span>{child.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
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
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}

export default AdminSidebar

