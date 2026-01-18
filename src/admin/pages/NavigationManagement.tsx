import React, { useState } from 'react'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiLink,
  FiMapPin,
  FiMenu
} from 'react-icons/fi'

interface NavigationLink {
  id: string
  label: string
  path: string
  type: 'link' | 'button'
  order: number
  isActive: boolean
}

interface City {
  id: string
  name: string
  image: string
  alt: string
  order: number
  isActive: boolean
}

const NavigationManagement: React.FC = () => {
  const [navigationLinks, setNavigationLinks] = useState<NavigationLink[]>([
    { id: '1', label: 'About Us', path: '/about', type: 'link', order: 0, isActive: true },
    { id: '2', label: 'Franchise Partner', path: '/franchise', type: 'link', order: 1, isActive: true },
    { id: '3', label: 'Login / Join', path: '/login', type: 'button', order: 2, isActive: true }
  ])

  const [cities, setCities] = useState<City[]>([
    { id: '1', name: 'Noida', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Noida cityscape', order: 1, isActive: true },
    { id: '2', name: 'Delhi', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Delhi landmarks', order: 2, isActive: true },
    { id: '3', name: 'Gurugram', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Gurugram skyline', order: 3, isActive: true },
    { id: '4', name: 'Jaipur', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Jaipur palace', order: 4, isActive: true },
    { id: '5', name: 'Goa', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Goa beaches', order: 5, isActive: true },
    { id: '6', name: 'Bangalore', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Bangalore tech city', order: 6, isActive: true },
    { id: '7', name: 'Chennai', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Chennai landmarks', order: 7, isActive: true },
    { id: '8', name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Hyderabad city', order: 8, isActive: true },
    { id: '9', name: 'Mumbai', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Mumbai financial capital', order: 9, isActive: true },
    { id: '10', name: 'Pune', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=120&q=90', alt: 'Pune educational hub', order: 10, isActive: true }
  ])

  const [editingLink, setEditingLink] = useState<string | null>(null)
  const [editingCity, setEditingCity] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<'links' | 'cities'>('links')

  // Navigation Links Management
  const handleAddLink = () => {
    const maxOrder = navigationLinks.length > 0 
      ? Math.max(...navigationLinks.map(link => link.order)) 
      : -1
    const newLink: NavigationLink = {
      id: Date.now().toString(),
      label: 'New Link',
      path: '/',
      type: 'link',
      order: maxOrder + 1,
      isActive: true
    }
    setNavigationLinks([...navigationLinks, newLink])
    setEditingLink(newLink.id)
  }

  const handleEditLink = (id: string) => {
    setEditingLink(id)
  }

  const handleSaveLink = (updatedLink: NavigationLink) => {
    setNavigationLinks(navigationLinks.map(link => link.id === updatedLink.id ? updatedLink : link))
    setEditingLink(null)
  }

  const handleDeleteLink = (id: string) => {
    if (window.confirm('Are you sure you want to delete this navigation link?')) {
      setNavigationLinks(navigationLinks.filter(link => link.id !== id))
    }
  }

  const handleMoveLink = (id: string, direction: 'up' | 'down') => {
    const index = navigationLinks.findIndex(link => link.id === id)
    if (index === -1) return

    const newLinks = [...navigationLinks]
    const targetIndex = direction === 'up' ? index - 1 : index + 1

    if (targetIndex < 0 || targetIndex >= newLinks.length) return

    // Swap the links
    const temp = newLinks[index]
    newLinks[index] = newLinks[targetIndex]
    newLinks[targetIndex] = temp

    // Update order values
    newLinks.forEach((link, idx) => {
      link.order = idx
    })

    setNavigationLinks(newLinks)
  }

  // Cities Management
  const handleAddCity = () => {
    const newCity: City = {
      id: Date.now().toString(),
      name: 'New City',
      image: '',
      alt: '',
      order: cities.length + 1,
      isActive: true
    }
    setCities([...cities, newCity])
    setEditingCity(newCity.id)
  }

  const handleEditCity = (id: string) => {
    setEditingCity(id)
  }

  const handleSaveCity = (updatedCity: City) => {
    setCities(cities.map(city => city.id === updatedCity.id ? updatedCity : city))
    setEditingCity(null)
  }

  const handleDeleteCity = (id: string) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      setCities(cities.filter(city => city.id !== id))
    }
  }

  const handleToggleCityActive = (id: string) => {
    setCities(cities.map(city => city.id === id ? { ...city, isActive: !city.isActive } : city))
  }

  const handleToggleLinkActive = (id: string) => {
    setNavigationLinks(navigationLinks.map(link => link.id === id ? { ...link, isActive: !link.isActive } : link))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Navigation Management</h1>
        <p className="mt-2 text-gray-600">Manage navigation menu items and cities dropdown for the user-facing website</p>
      </div>

      {/* Navigation Links Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiMenu className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Navigation Links</h2>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {navigationLinks.length} items
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedSection(expandedSection === 'links' ? 'cities' : 'links')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {expandedSection === 'links' ? (
                  <FiChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleAddLink}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Add Link
              </button>
            </div>
          </div>
        </div>

        {expandedSection === 'links' && (
          <div className="p-6">
            <div className="space-y-3">
              {navigationLinks
                .sort((a, b) => a.order - b.order)
                .map((link) => (
                  <div key={link.id}>
                    {editingLink === link.id ? (
                      <LinkEditForm
                        link={link}
                        onSave={handleSaveLink}
                        onCancel={() => setEditingLink(null)}
                      />
                    ) : (
                      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleMoveLink(link.id, 'up')}
                              className={`p-1 rounded transition-colors duration-200 ${
                                link.order === 0 
                                  ? 'opacity-30 cursor-not-allowed' 
                                  : 'hover:bg-gray-200'
                              }`}
                              disabled={link.order === 0}
                              title="Move up"
                            >
                              <FiChevronUp className={`w-4 h-4 ${
                                link.order === 0 ? 'text-gray-300' : 'text-gray-600'
                              }`} />
                            </button>
                            <button
                              onClick={() => handleMoveLink(link.id, 'down')}
                              className={`p-1 rounded transition-colors duration-200 ${
                                link.order === navigationLinks.length - 1 
                                  ? 'opacity-30 cursor-not-allowed' 
                                  : 'hover:bg-gray-200'
                              }`}
                              disabled={link.order === navigationLinks.length - 1}
                              title="Move down"
                            >
                              <FiChevronDown className={`w-4 h-4 ${
                                link.order === navigationLinks.length - 1 ? 'text-gray-300' : 'text-gray-600'
                              }`} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            {link.type === 'button' && <FiLink className="w-4 h-4 text-green-600" />}
                            {link.type === 'link' && <FiLink className="w-4 h-4 text-gray-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{link.label}</span>
                              <span className="text-sm text-gray-500">({link.path})</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                link.type === 'button' ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {link.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={link.isActive}
                              onChange={() => handleToggleLinkActive(link.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                          <button
                            onClick={() => handleEditLink(link.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteLink(link.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Cities Dropdown Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiMapPin className="w-5 h-5 text-gray-600" />
              <h2 className="text-xl font-semibold text-gray-900">Hotels Dropdown Cities</h2>
              <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                {cities.length} cities
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpandedSection(expandedSection === 'cities' ? 'links' : 'cities')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {expandedSection === 'cities' ? (
                  <FiChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              <button
                onClick={handleAddCity}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <FiPlus className="w-4 h-4" />
                Add City
              </button>
            </div>
          </div>
        </div>

        {expandedSection === 'cities' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cities
                .sort((a, b) => a.order - b.order)
                .map((city) => (
                  <div key={city.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                    {editingCity === city.id ? (
                      <CityEditForm
                        city={city}
                        onSave={handleSaveCity}
                        onCancel={() => setEditingCity(null)}
                      />
                    ) : (
                      <>
                        <div className="relative h-32 bg-gray-200">
                          {city.image && (
                            <img
                              src={city.image}
                              alt={city.alt}
                              className="w-full h-full object-cover"
                            />
                          )}
                          {!city.isActive && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white text-sm font-medium">Inactive</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{city.name}</h3>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={city.isActive}
                                onChange={() => handleToggleCityActive(city.id)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                            </label>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{city.alt}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditCity(city.id)}
                              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            >
                              <FiEdit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCity(city.id)}
                              className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Link Edit Form Component
interface LinkEditFormProps {
  link: NavigationLink
  onSave: (link: NavigationLink) => void
  onCancel: () => void
}

const LinkEditForm: React.FC<LinkEditFormProps> = ({ link, onSave, onCancel }) => {
  const [formData, setFormData] = useState<NavigationLink>(link)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-2 border-blue-200 rounded-lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Path/URL</label>
          <input
            type="text"
            value={formData.path}
            onChange={(e) => setFormData({ ...formData, path: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'link' | 'button' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="link">Link</option>
            <option value="button">Button</option>
          </select>
          <p className="mt-1 text-xs text-gray-500">
            Note: Hotels dropdown is managed separately via Cities section below
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FiSave className="w-4 h-4" />
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            <FiX className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

// City Edit Form Component
interface CityEditFormProps {
  city: City
  onSave: (city: City) => void
  onCancel: () => void
}

const CityEditForm: React.FC<CityEditFormProps> = ({ city, onSave, onCancel }) => {
  const [formData, setFormData] = useState<City>(city)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
          <input
            type="text"
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="City description"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            min="1"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            <FiSave className="w-4 h-4" />
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            <FiX className="w-4 h-4" />
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}

export default NavigationManagement

