import React, { useState, useRef } from 'react'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiUpload,
  FiImage,
  FiXCircle,
  FiHome,
  FiAward,
  FiShield
} from 'react-icons/fi'

interface City {
  id: string
  name: string
}

interface MealPlan {
  id: number
  name: string
  description: string
  price: number
  includes: string[]
}

interface RoomType {
  id: number
  name: string
  description: string
  image: File | string | null
  maxOccupancy: number
  size: string
  basePrice: number
  mealPlans: MealPlan[]
}

interface Hotel {
  id: string
  title: string
  city: string
  location: string
  description: string
  rating: number
  price: number
  slug: string
  images: (File | string)[]
  roomTypes: RoomType[]
  allAmenities: string[]
  specialities: string[]
  checkInTime: string
  checkOutTime: string
  policies: string[]
  nearbyAttractions: string[]
  status: 'active' | 'inactive'
}

const HotelCRUD: React.FC = () => {
  // Get cities from localStorage or use default
  const getCities = (): City[] => {
    try {
      const saved = localStorage.getItem('admin_cities')
      if (saved) {
        const cities = JSON.parse(saved)
        return cities.map((c: any) => ({ id: c.id, name: c.name }))
      }
    } catch (e) {
      console.error('Error loading cities:', e)
    }
    return [
      { id: '1', name: 'Noida' },
      { id: '2', name: 'Delhi' },
      { id: '3', name: 'Gurugram' },
      { id: '4', name: 'Jaipur' },
      { id: '5', name: 'Goa' },
      { id: '6', name: 'Bangalore' },
      { id: '7', name: 'Chennai' },
      { id: '8', name: 'Hyderabad' },
      { id: '9', name: 'Mumbai' },
      { id: '10', name: 'Pune' }
    ]
  }

  const [hotels, setHotels] = useState<Hotel[]>([])
  const [cities] = useState<City[]>(getCities())
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState<'basic' | 'images' | 'rooms' | 'amenities' | 'details'>('basic')
  
  const [formData, setFormData] = useState<Partial<Hotel>>({
    title: '',
    city: '',
    location: '',
    description: '',
    rating: 0,
    price: 0,
    slug: '',
    images: [] as (File | string)[],
    roomTypes: [],
    allAmenities: [],
    specialities: [],
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    policies: [],
    nearbyAttractions: [],
    status: 'active'
  })

  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const roomImageInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({})

  // Load hotels from localStorage
  React.useEffect(() => {
    const saved = localStorage.getItem('admin_hotels')
    if (saved) {
      try {
        setHotels(JSON.parse(saved))
      } catch (e) {
        console.error('Error loading hotels:', e)
      }
    }
  }, [])

  // Save hotels to localStorage
  const saveHotels = (updatedHotels: Hotel[]) => {
    setHotels(updatedHotels)
    localStorage.setItem('admin_hotels', JSON.stringify(updatedHotels))
  }

  const handleAddHotel = () => {
    setFormData({
      title: '',
      city: '',
      location: '',
      description: '',
      rating: 0,
      price: 0,
      slug: '',
      images: [],
      roomTypes: [],
      allAmenities: [],
      specialities: [],
      checkInTime: '2:00 PM',
      checkOutTime: '11:00 AM',
      policies: [],
      nearbyAttractions: [],
      status: 'active'
    })
    setEditingHotel(null)
    setShowForm(true)
    setActiveTab('basic')
  }

  const handleEditHotel = (hotel: Hotel) => {
    setFormData(hotel)
    setEditingHotel(hotel)
    setShowForm(true)
    setActiveTab('basic')
  }

  const handleDeleteHotel = (id: string) => {
    if (window.confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      const updatedHotels = hotels.filter(h => h.id !== id)
      saveHotels(updatedHotels)
    }
  }

  const handleSaveHotel = () => {
    if (!formData.title || !formData.city || !formData.location) {
      alert('Please fill in all required fields (Title, City, Location)')
      return
    }

    // Generate slug from title
    const slug = formData.slug || formData.title!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    const hotelData: Hotel = {
      id: editingHotel?.id || Date.now().toString(),
      title: formData.title!,
      city: formData.city!,
      location: formData.location!,
      description: formData.description || '',
      rating: formData.rating || 0,
      price: formData.price || 0,
      slug,
      images: formData.images || [],
      roomTypes: formData.roomTypes || [],
      allAmenities: formData.allAmenities || [],
      specialities: formData.specialities || [],
      checkInTime: formData.checkInTime || '2:00 PM',
      checkOutTime: formData.checkOutTime || '11:00 AM',
      policies: formData.policies || [],
      nearbyAttractions: formData.nearbyAttractions || [],
      status: formData.status || 'active'
    }

    if (editingHotel) {
      const updatedHotels = hotels.map(h => h.id === editingHotel.id ? hotelData : h)
      saveHotels(updatedHotels)
    } else {
      saveHotels([...hotels, hotelData])
    }

    setShowForm(false)
    setEditingHotel(null)
    setFormData({})
  }

  // Image handling with drag and drop
  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    const currentImages = (formData.images || []) as (File | string)[]
    const newImages: (File | string)[] = [...currentImages, ...files]
    setFormData({ ...formData, images: newImages })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const currentImages = (formData.images || []) as (File | string)[]
      const newImages: (File | string)[] = [...currentImages, ...files]
      setFormData({ ...formData, images: newImages })
    }
  }

  const handleRemoveImage = (index: number) => {
    const currentImages = (formData.images || []) as (File | string)[]
    const newImages: (File | string)[] = [...currentImages]
    newImages.splice(index, 1)
    setFormData({ ...formData, images: newImages })
  }

  const handleDragStart = (index: number) => {
    setDraggedImageIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedImageIndex === null) return

    const currentImages = (formData.images || []) as (File | string)[]
    const images: (File | string)[] = [...currentImages]
    const draggedImage = images[draggedImageIndex]
    images.splice(draggedImageIndex, 1)
    images.splice(index, 0, draggedImage)
    setFormData({ ...formData, images })
    setDraggedImageIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedImageIndex(null)
  }

  const getImagePreview = (image: File | string): string => {
    if (image instanceof File) {
      return URL.createObjectURL(image)
    }
    return image
  }

  // Room Types Management
  const handleAddRoomType = () => {
    const newRoom: RoomType = {
      id: Date.now(),
      name: '',
      description: '',
      image: null,
      maxOccupancy: 2,
      size: '',
      basePrice: 0,
      mealPlans: []
    }
    setFormData({
      ...formData,
      roomTypes: [...(formData.roomTypes || []), newRoom]
    })
  }

  const handleUpdateRoomType = (roomId: number, updates: Partial<RoomType>) => {
    const updatedRooms = (formData.roomTypes || []).map(room =>
      room.id === roomId ? { ...room, ...updates } : room
    )
    setFormData({ ...formData, roomTypes: updatedRooms })
  }

  const handleDeleteRoomType = (roomId: number) => {
    const updatedRooms = (formData.roomTypes || []).filter(room => room.id !== roomId)
    setFormData({ ...formData, roomTypes: updatedRooms })
  }

  const handleRoomImageSelect = (roomId: number, file: File) => {
    handleUpdateRoomType(roomId, { image: file })
  }

  const handleAddMealPlan = (roomId: number) => {
    const room = (formData.roomTypes || []).find(r => r.id === roomId)
    if (!room) return

    const newMealPlan: MealPlan = {
      id: Date.now(),
      name: '',
      description: '',
      price: 0,
      includes: []
    }
    handleUpdateRoomType(roomId, {
      mealPlans: [...room.mealPlans, newMealPlan]
    })
  }

  const handleUpdateMealPlan = (roomId: number, mealPlanId: number, updates: Partial<MealPlan>) => {
    const room = (formData.roomTypes || []).find(r => r.id === roomId)
    if (!room) return

    const updatedMealPlans = room.mealPlans.map(mp =>
      mp.id === mealPlanId ? { ...mp, ...updates } : mp
    )
    handleUpdateRoomType(roomId, { mealPlans: updatedMealPlans })
  }

  const handleDeleteMealPlan = (roomId: number, mealPlanId: number) => {
    const room = (formData.roomTypes || []).find(r => r.id === roomId)
    if (!room) return

    const updatedMealPlans = room.mealPlans.filter(mp => mp.id !== mealPlanId)
    handleUpdateRoomType(roomId, { mealPlans: updatedMealPlans })
  }

  // Amenities Management
  const [newAmenity, setNewAmenity] = useState('')
  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        allAmenities: [...(formData.allAmenities || []), newAmenity.trim()]
      })
      setNewAmenity('')
    }
  }

  const handleRemoveAmenity = (index: number) => {
    const updated = [...(formData.allAmenities || [])]
    updated.splice(index, 1)
    setFormData({ ...formData, allAmenities: updated })
  }

  // Specialities Management
  const [newSpeciality, setNewSpeciality] = useState('')
  const handleAddSpeciality = () => {
    if (newSpeciality.trim()) {
      setFormData({
        ...formData,
        specialities: [...(formData.specialities || []), newSpeciality.trim()]
      })
      setNewSpeciality('')
    }
  }

  const handleRemoveSpeciality = (index: number) => {
    const updated = [...(formData.specialities || [])]
    updated.splice(index, 1)
    setFormData({ ...formData, specialities: updated })
  }

  // Policies Management
  const [newPolicy, setNewPolicy] = useState('')
  const handleAddPolicy = () => {
    if (newPolicy.trim()) {
      setFormData({
        ...formData,
        policies: [...(formData.policies || []), newPolicy.trim()]
      })
      setNewPolicy('')
    }
  }

  const handleRemovePolicy = (index: number) => {
    const updated = [...(formData.policies || [])]
    updated.splice(index, 1)
    setFormData({ ...formData, policies: updated })
  }

  // Nearby Attractions Management
  const [newAttraction, setNewAttraction] = useState('')
  const handleAddAttraction = () => {
    if (newAttraction.trim()) {
      setFormData({
        ...formData,
        nearbyAttractions: [...(formData.nearbyAttractions || []), newAttraction.trim()]
      })
      setNewAttraction('')
    }
  }

  const handleRemoveAttraction = (index: number) => {
    const updated = [...(formData.nearbyAttractions || [])]
    updated.splice(index, 1)
    setFormData({ ...formData, nearbyAttractions: updated })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hotels Management</h1>
          <p className="mt-2 text-gray-600">Create, edit, and manage hotels with complete details</p>
        </div>
        <button
          onClick={handleAddHotel}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FiPlus className="w-4 h-4" />
          Add New Hotel
        </button>
      </div>

      {/* Hotels List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{hotel.title}</div>
                      <div className="text-sm text-gray-500">{hotel.location}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{hotel.city}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{hotel.rating || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{hotel.price?.toLocaleString() || '0'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        hotel.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {hotel.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditHotel(hotel)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteHotel(hotel.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No hotels added yet. Click "Add New Hotel" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hotel Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full my-8 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingHotel(null)
                }}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 px-6">
              <div className="flex gap-4 overflow-x-auto">
                {[
                  { id: 'basic', label: 'Basic Info', icon: <FiHome /> },
                  { id: 'images', label: 'Images', icon: <FiImage /> },
                  { id: 'rooms', label: 'Rooms', icon: <FiHome /> },
                  { id: 'amenities', label: 'Amenities', icon: <FiAward /> },
                  { id: 'details', label: 'Details', icon: <FiShield /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Basic Info Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        Hotel Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">
                        City <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.city || ''}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city.id} value={city.name}>{city.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Karol Bagh, New Delhi"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating || 0}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Base Price (₹)</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.price || 0}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={formData.status || 'active'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Slug (URL-friendly)</label>
                    <input
                      type="text"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated from name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Images Tab */}
              {activeTab === 'images' && (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Hotel Images</label>
                    <div
                      onDrop={handleImageDrop}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FiUpload className="mx-auto mb-2 w-8 h-8 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-1">Drag and drop images here, or click to select</p>
                      <p className="text-xs text-gray-500">Supports JPG, PNG, GIF (max 10MB each)</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                    </div>
                  </div>
                  {formData.images && formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          className="relative group border border-gray-200 rounded-lg overflow-hidden cursor-move"
                        >
                          <img
                            src={getImagePreview(image)}
                            alt={`Hotel image ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            <button
                              onClick={() => handleRemoveImage(index)}
                              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                              <FiXCircle className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Rooms Tab */}
              {activeTab === 'rooms' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Room Types</h3>
                    <button
                      onClick={handleAddRoomType}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <FiPlus className="w-4 h-4" />
                      Add Room Type
                    </button>
                  </div>
                  {formData.roomTypes && formData.roomTypes.length > 0 ? (
                    <div className="space-y-6">
                      {formData.roomTypes.map((room) => (
                        <div key={room.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-semibold text-gray-900">Room Type #{room.id}</h4>
                            <button
                              onClick={() => handleDeleteRoomType(room.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block mb-1 text-sm font-medium text-gray-700">Room Name</label>
                              <input
                                type="text"
                                value={room.name}
                                onChange={(e) => handleUpdateRoomType(room.id, { name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-sm font-medium text-gray-700">Size</label>
                              <input
                                type="text"
                                value={room.size}
                                onChange={(e) => handleUpdateRoomType(room.id, { size: e.target.value })}
                                placeholder="e.g., 300 sq ft"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                          <div className="mb-4">
                            <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
                            <textarea
                              value={room.description}
                              onChange={(e) => handleUpdateRoomType(room.id, { description: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <label className="block mb-1 text-sm font-medium text-gray-700">Max Occupancy</label>
                              <input
                                type="number"
                                min="1"
                                value={room.maxOccupancy}
                                onChange={(e) => handleUpdateRoomType(room.id, { maxOccupancy: parseInt(e.target.value) || 1 })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-sm font-medium text-gray-700">Base Price (₹)</label>
                              <input
                                type="number"
                                min="0"
                                value={room.basePrice}
                                onChange={(e) => handleUpdateRoomType(room.id, { basePrice: parseInt(e.target.value) || 0 })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-sm font-medium text-gray-700">Room Image</label>
                              <div className="relative">
                                {room.image ? (
                                  <div className="relative">
                                    <img
                                      src={room.image instanceof File ? URL.createObjectURL(room.image) : room.image}
                                      alt="Room"
                                      className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                      onClick={() => handleUpdateRoomType(room.id, { image: null })}
                                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded"
                                    >
                                      <FiX className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <div
                                    onClick={() => roomImageInputRefs.current[room.id]?.click()}
                                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500"
                                  >
                                    <FiUpload className="mx-auto mb-1 w-5 h-5 text-gray-400" />
                                    <span className="text-xs text-gray-600">Click to upload</span>
                                    <input
                                      ref={el => roomImageInputRefs.current[room.id] = el}
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (e.target.files?.[0]) {
                                          handleRoomImageSelect(room.id, e.target.files[0])
                                        }
                                      }}
                                      className="hidden"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* Meal Plans */}
                          <div className="border-t pt-4">
                            <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-gray-900">Meal Plans</h5>
                              <button
                                onClick={() => handleAddMealPlan(room.id)}
                                className="text-sm text-blue-600 hover:text-blue-700"
                              >
                                <FiPlus className="w-4 h-4 inline mr-1" />
                                Add Meal Plan
                              </button>
                            </div>
                            {room.mealPlans.map((mp) => (
                              <div key={mp.id} className="grid grid-cols-4 gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
                                <input
                                  type="text"
                                  value={mp.name}
                                  onChange={(e) => handleUpdateMealPlan(room.id, mp.id, { name: e.target.value })}
                                  placeholder="Name"
                                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="text"
                                  value={mp.description}
                                  onChange={(e) => handleUpdateMealPlan(room.id, mp.id, { description: e.target.value })}
                                  placeholder="Description"
                                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                  type="number"
                                  value={mp.price}
                                  onChange={(e) => handleUpdateMealPlan(room.id, mp.id, { price: parseInt(e.target.value) || 0 })}
                                  placeholder="Price"
                                  className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                  onClick={() => handleDeleteMealPlan(room.id, mp.id)}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No room types added yet. Click "Add Room Type" to get started.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Amenities Tab */}
              {activeTab === 'amenities' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddAmenity()}
                        placeholder="Add amenity (e.g., Free WiFi)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddAmenity}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.allAmenities?.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                        >
                          {amenity}
                          <button
                            onClick={() => handleRemoveAmenity(index)}
                            className="hover:text-blue-900"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Check-in Time</label>
                      <input
                        type="text"
                        value={formData.checkInTime || ''}
                        onChange={(e) => setFormData({ ...formData, checkInTime: e.target.value })}
                        placeholder="e.g., 2:00 PM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Check-out Time</label>
                      <input
                        type="text"
                        value={formData.checkOutTime || ''}
                        onChange={(e) => setFormData({ ...formData, checkOutTime: e.target.value })}
                        placeholder="e.g., 11:00 AM"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Specialities */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialities</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newSpeciality}
                        onChange={(e) => setNewSpeciality(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddSpeciality()}
                        placeholder="Add speciality"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddSpeciality}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.specialities?.map((speciality, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{speciality}</span>
                          <button
                            onClick={() => handleRemoveSpeciality(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Policies */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newPolicy}
                        onChange={(e) => setNewPolicy(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddPolicy()}
                        placeholder="Add policy (e.g., No smoking)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddPolicy}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.policies?.map((policy, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{policy}</span>
                          <button
                            onClick={() => handleRemovePolicy(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Nearby Attractions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Attractions</h3>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={newAttraction}
                        onChange={(e) => setNewAttraction(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddAttraction()}
                        placeholder="Add attraction"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={handleAddAttraction}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.nearbyAttractions?.map((attraction, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{attraction}</span>
                          <button
                            onClick={() => handleRemoveAttraction(index)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingHotel(null)
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveHotel}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FiSave className="w-4 h-4" />
                {editingHotel ? 'Update Hotel' : 'Create Hotel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelCRUD

