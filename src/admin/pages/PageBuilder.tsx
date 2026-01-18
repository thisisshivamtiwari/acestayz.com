import React, { useState } from 'react'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiChevronUp,
  FiChevronDown,
  FiSave,
  FiX,
  FiLayout,
  FiGrid,
  FiHome,
  FiStar,
  FiZap,
  FiMousePointer,
  FiAward,
  FiCopy
} from 'react-icons/fi'

// Import Footer component (others are rendered with config via preview components)
import Footer from '../../components/Footer'
import { allHotels } from '../../utils/hotelData'

// Component Configuration Types
interface HeroSectionConfig {
  backgroundImage?: string
  headline1?: string
  headline2?: string
  headline3?: string
  description?: string
  searchPlaceholder?: string
  statsYears?: string
  statsGuests?: string
  statsLocations?: string
  sponsorHotels?: number[] // Array of hotel IDs (max 2)
}

interface ShuffleHeroConfig {
  title?: string
  description?: string
  buttonText?: string
}

interface MouseImageTrailConfig {
  title?: string
  description?: string
  images?: string[]
  renderImageBuffer?: number
  rotationRange?: number
}

interface HotelShowcaseConfig {
  title?: string
  description?: string
}

interface FeaturesShowcaseConfig {
  title?: string
  description?: string
  features?: Array<{
    title: string
    description: string
    image: string
    alt: string
  }>
}

interface BentoGridShowcaseConfig {
  title?: string
  description?: string
}

interface PageComponent {
  id: string
  type: ComponentType
  order: number
  isVisible: boolean
  config: HeroSectionConfig | ShuffleHeroConfig | MouseImageTrailConfig | HotelShowcaseConfig | FeaturesShowcaseConfig | BentoGridShowcaseConfig | Record<string, any>
}

type ComponentType =
  | 'HeroSection'
  | 'ShuffleHero'
  | 'MouseImageTrailHero'
  | 'HotelShowcase'
  | 'FeaturesShowcase'
  | 'BentoGridShowcase'
  | 'Footer'

interface Page {
  id: string
  name: string
  slug: string
  components: PageComponent[]
}

const AVAILABLE_COMPONENTS = [
  {
    type: 'HeroSection',
    label: 'Hero Section',
    description: 'Main hero with background image, headline, and search bar',
    icon: <FiHome className="w-5 h-5" />,
    color: 'bg-blue-500'
  },
  {
    type: 'ShuffleHero',
    label: 'Shuffle Hero',
    description: 'Animated hero section with shuffling content',
    icon: <FiZap className="w-5 h-5" />,
    color: 'bg-purple-500'
  },
  {
    type: 'MouseImageTrailHero',
    label: 'Mouse Trail Hero',
    description: 'Interactive hero with mouse trail image effects',
    icon: <FiMousePointer className="w-5 h-5" />,
    color: 'bg-pink-500'
  },
  {
    type: 'HotelShowcase',
    label: 'Hotel Showcase',
    description: 'Featured hotels grid/carousel with booking access',
    icon: <FiGrid className="w-5 h-5" />,
    color: 'bg-green-500'
  },
  {
    type: 'FeaturesShowcase',
    label: 'Features Showcase',
    description: 'Key features and services display',
    icon: <FiAward className="w-5 h-5" />,
    color: 'bg-orange-500'
  },
  {
    type: 'BentoGridShowcase',
    label: 'Bento Grid',
    description: 'Modern bento grid layout showcasing content',
    icon: <FiLayout className="w-5 h-5" />,
    color: 'bg-indigo-500'
  },
  {
    type: 'Footer',
    label: 'Footer',
    description: 'Site footer with links and contact information',
    icon: <FiStar className="w-5 h-5" />,
    color: 'bg-gray-500'
  }
]

const PageBuilder: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      name: 'Home Page',
      slug: 'home',
      components: [
        { id: 'c1', type: 'HeroSection', order: 0, isVisible: true, config: {} },
        { id: 'c2', type: 'HotelShowcase', order: 1, isVisible: true, config: {} },
        { id: 'c3', type: 'FeaturesShowcase', order: 2, isVisible: true, config: {} },
        { id: 'c4', type: 'BentoGridShowcase', order: 3, isVisible: true, config: {} },
        { id: 'c5', type: 'Footer', order: 4, isVisible: true, config: {} }
      ]
    }
  ])

  const [selectedPage, setSelectedPage] = useState<string | null>(pages[0]?.id || null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [showAddPage, setShowAddPage] = useState(false)
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [newPageName, setNewPageName] = useState('')
  const [newPageSlug, setNewPageSlug] = useState('')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const currentPage = pages.find(p => p.id === selectedPage)

  const showSaveMessage = (message: string) => {
    setSaveMessage(message)
    setTimeout(() => setSaveMessage(null), 3000)
  }

  // Load pages from localStorage on mount
  React.useEffect(() => {
    const savedPages = localStorage.getItem('admin_pages')
    if (savedPages) {
      try {
        const parsed = JSON.parse(savedPages)
        if (parsed.length > 0) {
          setPages(parsed)
          setSelectedPage(parsed[0].id)
        }
      } catch (err) {
        console.error('Error loading saved pages:', err)
      }
    }
  }, [])

  // Save pages to localStorage whenever they change
  React.useEffect(() => {
    if (pages.length > 0) {
      localStorage.setItem('admin_pages', JSON.stringify(pages))
    }
  }, [pages])

  const handleAddComponent = (componentType: ComponentType) => {
    if (!currentPage) return

    const maxOrder = currentPage.components.length > 0
      ? Math.max(...currentPage.components.map(c => c.order))
      : -1

    const defaultConfigs: Record<ComponentType, any> = {
      HeroSection: {
        headline1: 'Premium',
        headline2: 'Accommodation,',
        headline3: 'hello acestayz',
        description: 'A platform for premium hotels and homestays for intelligent travelers, at the best locations & rates across India.',
        searchPlaceholder: 'Book a Stay in Delhi, Noida, Gurugram...',
        statsYears: '6+',
        statsGuests: '500+',
        statsLocations: '15+',
        sponsorHotels: []
      },
      ShuffleHero: {
        title: 'Stays that inspire',
        description: 'From boutique homestays to premium suites, explore curated places crafted for comfort and style.',
        buttonText: 'Explore stays'
      },
      MouseImageTrailHero: {
        title: 'Hover to preview stays',
        description: 'Move your cursor to reveal a trail of beautiful hotel and homestay shots.',
        images: [
          'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
        ],
        renderImageBuffer: 20,
        rotationRange: 25
      },
      HotelShowcase: {
        title: 'AceStayz across India',
        description: 'Discover premium accommodations in top locations including Mumbai, Bengaluru, Delhi, Gurugram, Pune, Goa, Udaipur, Srinagar & Rishikesh'
      },
      FeaturesShowcase: {
        title: 'What makes us AceStayz?',
        description: 'With so much to tell & so little time, here are a few key highlights.'
      },
      BentoGridShowcase: {
        title: 'What people say about AceStayz',
        description: 'Hear from our happy guests and see why they love staying with us.'
      },
      Footer: {}
    }

    const newComponent: PageComponent = {
      id: `c${Date.now()}`,
      type: componentType,
      order: maxOrder + 1,
      isVisible: true,
      config: defaultConfigs[componentType] || {}
    }

    setPages(pages.map(page =>
      page.id === selectedPage
        ? { ...page, components: [...page.components, newComponent] }
        : page
    ))
    showSaveMessage(`${AVAILABLE_COMPONENTS.find(c => c.type === componentType)?.label || componentType} added`)
  }

  const handleMoveComponent = (componentId: string, direction: 'up' | 'down') => {
    if (!currentPage) return

    const components = [...currentPage.components]
    const index = components.findIndex(c => c.id === componentId)
    if (index === -1) return

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= components.length) return

    // Swap components
    const temp = components[index]
    components[index] = components[targetIndex]
    components[targetIndex] = temp

    // Update order values
    components.forEach((comp, idx) => {
      comp.order = idx
    })

    setPages(pages.map(page =>
      page.id === selectedPage
        ? { ...page, components }
        : page
    ))
    showSaveMessage('Component order updated')
  }

  const handleDeleteComponent = (componentId: string) => {
    if (!currentPage) return
    if (!window.confirm('Are you sure you want to remove this component?')) return

    setPages(pages.map(page =>
      page.id === selectedPage
        ? { ...page, components: page.components.filter(c => c.id !== componentId) }
        : page
    ))
  }

  const handleToggleVisibility = (componentId: string) => {
    if (!currentPage) return

    setPages(pages.map(page =>
      page.id === selectedPage
        ? {
            ...page,
            components: page.components.map(c =>
              c.id === componentId ? { ...c, isVisible: !c.isVisible } : c
            )
          }
        : page
    ))
  }

  const handleDuplicateComponent = (componentId: string) => {
    if (!currentPage) return

    const component = currentPage.components.find(c => c.id === componentId)
    if (!component) return

    const maxOrder = Math.max(...currentPage.components.map(c => c.order))
    const duplicated: PageComponent = {
      ...component,
      id: `c${Date.now()}`,
      order: maxOrder + 1
    }

    setPages(pages.map(page =>
      page.id === selectedPage
        ? { ...page, components: [...page.components, duplicated] }
        : page
    ))
  }

  const handleSaveComponentConfig = (componentId: string, config: Record<string, any>) => {
    if (!currentPage) return

    setPages(pages.map(page =>
      page.id === selectedPage
        ? {
            ...page,
            components: page.components.map(c =>
              c.id === componentId ? { ...c, config } : c
            )
          }
        : page
    ))
    setEditingComponent(null)
    showSaveMessage('Component configuration saved')
  }

  const handleAddPage = () => {
    if (!newPageName.trim() || !newPageSlug.trim()) {
      alert('Please enter both page name and slug')
      return
    }

    const slugExists = pages.some(p => p.slug === newPageSlug.trim())
    if (slugExists) {
      alert('A page with this slug already exists')
      return
    }

    const newPage: Page = {
      id: `p${Date.now()}`,
      name: newPageName.trim(),
      slug: newPageSlug.trim().toLowerCase().replace(/\s+/g, '-'),
      components: []
    }
    setPages([...pages, newPage])
    setSelectedPage(newPage.id)
    setShowAddPage(false)
    setNewPageName('')
    setNewPageSlug('')
  }

  const handleEditPage = (pageId: string) => {
    setEditingPage(pageId)
  }

  const handleSavePage = (pageId: string, name: string, slug: string) => {
    const slugExists = pages.some(p => p.slug === slug.trim() && p.id !== pageId)
    if (slugExists) {
      alert('A page with this slug already exists')
      return
    }

    setPages(pages.map(page =>
      page.id === pageId
        ? { ...page, name: name.trim(), slug: slug.trim().toLowerCase().replace(/\s+/g, '-') }
        : page
    ))
    setEditingPage(null)
  }

  const handleDeletePage = (pageId: string) => {
    if (!window.confirm('Are you sure you want to delete this page? All components will be lost.')) return
    if (pages.length === 1) {
      alert('You must have at least one page')
      return
    }
    const newPages = pages.filter(p => p.id !== pageId)
    setPages(newPages)
    if (selectedPage === pageId) {
      setSelectedPage(newPages[0]?.id || null)
    }
  }

  const handleSaveAll = () => {
    localStorage.setItem('admin_pages', JSON.stringify(pages))
    showSaveMessage('All pages saved successfully!')
  }

  const getComponentInfo = (type: ComponentType) => {
    return AVAILABLE_COMPONENTS.find(c => c.type === type)
  }

  const renderComponentPreview = (component: PageComponent) => {
    if (!component.isVisible) return null

    // Render components with their configuration applied
    switch (component.type) {
      case 'HeroSection':
        return <PreviewHeroSection config={component.config as HeroSectionConfig} />
      case 'ShuffleHero':
        return <PreviewShuffleHero config={component.config as ShuffleHeroConfig} />
      case 'MouseImageTrailHero':
        return <PreviewMouseImageTrailHero config={component.config as MouseImageTrailConfig} />
      case 'HotelShowcase':
        return <PreviewHotelShowcase config={component.config as HotelShowcaseConfig} />
      case 'FeaturesShowcase':
        return <PreviewFeaturesShowcase config={component.config as FeaturesShowcaseConfig} />
      case 'BentoGridShowcase':
        return <PreviewBentoGridShowcase config={component.config as BentoGridShowcaseConfig} />
      case 'Footer':
        return <Footer />
      default:
        return null
    }
  }

  // Handle ESC key to close preview modal
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreviewModal) {
        setShowPreviewModal(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [showPreviewModal])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Page Builder</h1>
          <p className="mt-2 text-gray-600">Create and customize pages by adding components</p>
        </div>
        <div className="flex gap-3 items-center">
          {saveMessage && (
            <div className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg animate-fade-in">
              {saveMessage}
            </div>
          )}
          <button
            onClick={handleSaveAll}
            className="flex gap-2 items-center px-4 py-2 text-white bg-green-600 rounded-lg transition-colors duration-200 hover:bg-green-700"
            title="Save all changes"
          >
            <FiSave className="w-4 h-4" />
            Save All
          </button>
          <button
            onClick={() => setShowPreviewModal(true)}
            className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors duration-200 hover:bg-blue-700"
          >
            <FiEye className="w-4 h-4" />
            Preview Page
          </button>
          <button
            onClick={() => setShowAddPage(true)}
            className="flex gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors duration-200 hover:bg-blue-700"
          >
            <FiPlus className="w-4 h-4" />
            New Page
          </button>
        </div>
      </div>

      {/* Add Page Modal */}
      {showAddPage && (
        <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50">
          <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Create New Page</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Page Name</label>
                <input
                  type="text"
                  value={newPageName}
                  onChange={(e) => setNewPageName(e.target.value)}
                  placeholder="e.g., About Page"
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddPage()
                    }
                  }}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Page Slug</label>
                <input
                  type="text"
                  value={newPageSlug}
                  onChange={(e) => setNewPageSlug(e.target.value)}
                  placeholder="e.g., about"
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddPage()
                    }
                  }}
                />
                <p className="mt-1 text-xs text-gray-500">URL-friendly identifier (e.g., about-page)</p>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={handleAddPage}
                  className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors duration-200 hover:bg-blue-700"
                >
                  Create Page
                </button>
                <button
                  onClick={() => {
                    setShowAddPage(false)
                    setNewPageName('')
                    setNewPageSlug('')
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg transition-colors duration-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Page Modal */}
      {editingPage && (
        <EditPageModal
          page={pages.find(p => p.id === editingPage)!}
          onSave={(name, slug) => handleSavePage(editingPage, name, slug)}
          onClose={() => setEditingPage(null)}
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Sidebar - Pages & Components */}
        <div className="space-y-6 lg:col-span-1">
          {/* Pages List */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Pages</h2>
            </div>
            <div className="p-4 space-y-2">
              {pages.map(page => (
                <div
                  key={page.id}
                  className={`group relative w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                    selectedPage === page.id
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <button
                    onClick={() => setSelectedPage(page.id)}
                    className="w-full text-left"
                  >
                    <div className="font-medium">{page.name}</div>
                    <div className="mt-1 text-xs text-gray-500">/{page.slug}</div>
                    <div className="mt-1 text-xs text-gray-400">
                      {page.components.length} components
                    </div>
                  </button>
                  <div className="flex absolute top-2 right-2 gap-1 items-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEditPage(page.id)
                      }}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                      title="Edit page"
                    >
                      <FiEdit2 className="w-3 h-3" />
                    </button>
                    {pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeletePage(page.id)
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded"
                        title="Delete page"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Components */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Available Components</h2>
              <p className="mt-1 text-xs text-gray-500">Click to add to page</p>
            </div>
            <div className="overflow-y-auto p-4 space-y-2 max-h-96">
              {AVAILABLE_COMPONENTS.map(component => (
                <button
                  key={component.type}
                  onClick={() => handleAddComponent(component.type as ComponentType)}
                  className="p-3 w-full text-left rounded-lg border-2 border-gray-200 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 group"
                >
                  <div className="flex gap-3 items-start">
                    <div className={`p-2 rounded-lg ${component.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                      {component.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{component.label}</div>
                      <div className="mt-1 text-xs text-gray-500">{component.description}</div>
                    </div>
                    <FiPlus className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center - Component List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                {currentPage?.name || 'Select a Page'}
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                {currentPage?.components.length || 0} components on this page
              </p>
            </div>
            {currentPage ? (
              <div className="p-4 space-y-3">
                {currentPage.components
                  .sort((a, b) => a.order - b.order)
                  .map((component, index) => {
                    const componentInfo = getComponentInfo(component.type)
                    return (
                      <div
                        key={component.id}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          component.isVisible
                            ? 'border-gray-200 bg-gray-50'
                            : 'border-gray-100 bg-gray-50 opacity-50'
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleMoveComponent(component.id, 'up')}
                              disabled={index === 0}
                              className={`p-1 rounded ${
                                index === 0
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'hover:bg-gray-200'
                              }`}
                              title="Move up"
                            >
                              <FiChevronUp className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleMoveComponent(component.id, 'down')}
                              disabled={index === currentPage.components.length - 1}
                              className={`p-1 rounded ${
                                index === currentPage.components.length - 1
                                  ? 'opacity-30 cursor-not-allowed'
                                  : 'hover:bg-gray-200'
                              }`}
                              title="Move down"
                            >
                              <FiChevronDown className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <div className="flex-1">
                            <div className="flex gap-2 items-center mb-2">
                              {componentInfo && (
                                <div className={`p-1.5 rounded ${componentInfo.color} text-white`}>
                                  {componentInfo.icon}
                                </div>
                              )}
                              <span className="font-medium text-gray-900">
                                {componentInfo?.label || component.type}
                              </span>
                              {!component.isVisible && (
                                <span className="text-xs text-gray-400">(Hidden)</span>
                              )}
                            </div>
                            <div className="flex gap-2 items-center">
                              <button
                                onClick={() => handleToggleVisibility(component.id)}
                                className={`p-1.5 rounded ${
                                  component.isVisible
                                    ? 'text-blue-600 hover:bg-blue-50'
                                    : 'text-gray-400 hover:bg-gray-100'
                                }`}
                                title={component.isVisible ? 'Hide' : 'Show'}
                              >
                                {component.isVisible ? (
                                  <FiEye className="w-4 h-4" />
                                ) : (
                                  <FiEyeOff className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                onClick={() => handleDuplicateComponent(component.id)}
                                className="p-1.5 rounded text-green-600 hover:bg-green-50"
                                title="Duplicate"
                              >
                                <FiCopy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingComponent(component.id)}
                                className="p-1.5 rounded text-blue-600 hover:bg-blue-50"
                                title="Edit"
                              >
                                <FiEdit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteComponent(component.id)}
                                className="p-1.5 rounded text-red-600 hover:bg-red-50"
                                title="Delete"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                {currentPage.components.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <FiLayout className="mx-auto mb-3 w-12 h-12 opacity-50" />
                    <p>No components added yet</p>
                    <p className="mt-1 text-sm">Add components from the left panel</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400">
                <p>Select a page to start building</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Component Config Modal */}
      {editingComponent && currentPage && (
        <ComponentConfigModal
          component={currentPage.components.find(c => c.id === editingComponent)!}
          onSave={(config) => handleSaveComponentConfig(editingComponent, config)}
          onClose={() => setEditingComponent(null)}
        />
      )}

      {/* Preview Modal */}
      {showPreviewModal && currentPage && (
        <PreviewModal
          page={currentPage}
          onClose={() => setShowPreviewModal(false)}
          renderComponent={renderComponentPreview}
        />
      )}
    </div>
  )
}

// Edit Page Modal Component
interface EditPageModalProps {
  page: Page
  onSave: (name: string, slug: string) => void
  onClose: () => void
}

const EditPageModal: React.FC<EditPageModalProps> = ({ page, onSave, onClose }) => {
  const [name, setName] = useState(page.name)
  const [slug, setSlug] = useState(page.slug)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) {
      alert('Please enter both page name and slug')
      return
    }
    onSave(name, slug)
  }

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50">
      <div className="p-6 w-full max-w-md bg-white rounded-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Edit Page</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Page Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Page Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-500">URL-friendly identifier</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors duration-200 hover:bg-blue-700"
            >
              <FiSave className="inline mr-2 w-4 h-4" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg transition-colors duration-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Component Config Modal with proper forms
interface ComponentConfigModalProps {
  component: PageComponent
  onSave: (config: Record<string, any>) => void
  onClose: () => void
}

const ComponentConfigModal: React.FC<ComponentConfigModalProps> = ({
  component,
  onSave,
  onClose
}) => {
  const [config, setConfig] = useState(component.config)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(config)
  }

  const renderConfigForm = () => {
    switch (component.type) {
      case 'HeroSection':
        const heroConfig = config as HeroSectionConfig
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Background Image URL</label>
              <input
                type="url"
                value={heroConfig.backgroundImage || ''}
                onChange={(e) => setConfig({ ...config, backgroundImage: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Headline Line 1</label>
              <input
                type="text"
                value={heroConfig.headline1 || ''}
                onChange={(e) => setConfig({ ...config, headline1: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Headline Line 2</label>
              <input
                type="text"
                value={heroConfig.headline2 || ''}
                onChange={(e) => setConfig({ ...config, headline2: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Headline Line 3</label>
              <input
                type="text"
                value={heroConfig.headline3 || ''}
                onChange={(e) => setConfig({ ...config, headline3: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={heroConfig.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Search Placeholder</label>
              <input
                type="text"
                value={heroConfig.searchPlaceholder || ''}
                onChange={(e) => setConfig({ ...config, searchPlaceholder: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Years</label>
                <input
                  type="text"
                  value={heroConfig.statsYears || ''}
                  onChange={(e) => setConfig({ ...config, statsYears: e.target.value })}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Guests</label>
                <input
                  type="text"
                  value={heroConfig.statsGuests || ''}
                  onChange={(e) => setConfig({ ...config, statsGuests: e.target.value })}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Locations</label>
                <input
                  type="text"
                  value={heroConfig.statsLocations || ''}
                  onChange={(e) => setConfig({ ...config, statsLocations: e.target.value })}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <label className="block mb-2 text-sm font-medium text-gray-700">Sponsor Hotels (Select up to 2)</label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-600">Sponsor Hotel 1</label>
                  <select
                    value={heroConfig.sponsorHotels?.[0] || ''}
                    onChange={(e) => {
                      const newSponsorHotels = [...(heroConfig.sponsorHotels || [])]
                      const selectedId = e.target.value ? parseInt(e.target.value) : null
                      
                      if (selectedId) {
                        // If hotel 2 is the same as the new selection, clear hotel 2
                        if (newSponsorHotels[1] === selectedId) {
                          newSponsorHotels.splice(1, 1)
                        }
                        newSponsorHotels[0] = selectedId
                      } else {
                        newSponsorHotels.splice(0, 1)
                      }
                      setConfig({ ...config, sponsorHotels: newSponsorHotels })
                    }}
                    className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Hotel 1</option>
                    {allHotels.map(hotel => (
                      <option 
                        key={hotel.id} 
                        value={hotel.id}
                        disabled={heroConfig.sponsorHotels?.[1] === hotel.id}
                      >
                        {hotel.title} - {hotel.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium text-gray-600">Sponsor Hotel 2</label>
                  <select
                    value={heroConfig.sponsorHotels?.[1] || ''}
                    onChange={(e) => {
                      const newSponsorHotels = [...(heroConfig.sponsorHotels || [])]
                      const selectedId = e.target.value ? parseInt(e.target.value) : null
                      
                      if (selectedId) {
                        // If hotel 1 is the same as the new selection, clear hotel 1
                        if (newSponsorHotels[0] === selectedId) {
                          newSponsorHotels.splice(0, 1)
                        }
                        newSponsorHotels[1] = selectedId
                      } else {
                        newSponsorHotels.splice(1, 1)
                      }
                      setConfig({ ...config, sponsorHotels: newSponsorHotels })
                    }}
                    className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!heroConfig.sponsorHotels?.[0]}
                  >
                    <option value="">Select Hotel 2 (Optional)</option>
                    {allHotels.map(hotel => (
                      <option 
                        key={hotel.id} 
                        value={hotel.id}
                        disabled={heroConfig.sponsorHotels?.[0] === hotel.id}
                      >
                        {hotel.title} - {hotel.location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Select up to 2 hotels to feature as sponsors in the hero section. Hotel 2 is optional.
              </p>
            </div>
          </div>
        )
      case 'ShuffleHero':
        const shuffleConfig = config as ShuffleHeroConfig
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={shuffleConfig.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={shuffleConfig.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                value={shuffleConfig.buttonText || ''}
                onChange={(e) => setConfig({ ...config, buttonText: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )
      case 'MouseImageTrailHero':
        const trailConfig = config as MouseImageTrailConfig
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={trailConfig.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={trailConfig.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Image URLs (one per line)</label>
              <textarea
                value={(trailConfig.images || []).join('\n')}
                onChange={(e) => setConfig({ ...config, images: e.target.value.split('\n').filter(url => url.trim()) })}
                className="px-3 py-2 w-full font-mono text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Render Buffer</label>
                <input
                  type="number"
                  value={trailConfig.renderImageBuffer || 20}
                  onChange={(e) => setConfig({ ...config, renderImageBuffer: parseInt(e.target.value) || 20 })}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Rotation Range</label>
                <input
                  type="number"
                  value={trailConfig.rotationRange || 25}
                  onChange={(e) => setConfig({ ...config, rotationRange: parseInt(e.target.value) || 25 })}
                  className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )
      case 'HotelShowcase':
        const hotelConfig = config as HotelShowcaseConfig
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={hotelConfig.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={hotelConfig.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <p className="text-xs text-gray-500">Note: Hotels are managed from the Hotels section</p>
          </div>
        )
      case 'FeaturesShowcase':
        const featuresConfig = config as FeaturesShowcaseConfig
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={featuresConfig.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={featuresConfig.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <p className="text-xs text-gray-500">Note: Features are managed from the Features section</p>
          </div>
        )
      case 'BentoGridShowcase':
        const bentoConfig = config as BentoGridShowcaseConfig
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={bentoConfig.title || ''}
                onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={bentoConfig.description || ''}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
          </div>
        )
      case 'Footer':
        return (
          <div className="py-8 text-center text-gray-500">
            <p>Footer component doesn't require configuration</p>
            <p className="mt-2 text-sm">It uses default content and links</p>
          </div>
        )
      default:
        return (
          <div className="py-8 text-center text-gray-500">
            <p>No configuration available for this component</p>
          </div>
        )
    }
  }

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Configure {AVAILABLE_COMPONENTS.find(c => c.type === component.type)?.label || component.type}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderConfigForm()}
          <div className="flex gap-3 items-center pt-4 border-t">
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg transition-colors duration-200 hover:bg-blue-700"
            >
              <FiSave className="inline mr-2 w-4 h-4" />
              Save Configuration
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg transition-colors duration-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Preview Modal Component
interface PreviewModalProps {
  page: Page
  onClose: () => void
  renderComponent: (component: PageComponent) => React.ReactNode
}

const PreviewModal: React.FC<PreviewModalProps> = ({ page, onClose, renderComponent }) => {
  return (
    <div className="overflow-hidden fixed inset-0 z-50 bg-black/90">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Page Preview: {page.name}</h2>
            <p className="text-sm text-gray-500">/{page.slug}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => window.open(`/${page.slug}`, '_blank')}
              className="px-4 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg transition-colors duration-200 hover:bg-blue-100"
            >
              Open in New Tab →
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 rounded-lg transition-colors duration-200 hover:bg-gray-100"
              aria-label="Close preview"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="overflow-y-auto flex-1 bg-gray-50">
          <div className="max-w-full">
            {page.components
              .filter(c => c.isVisible)
              .sort((a, b) => a.order - b.order)
              .map(component => (
                <div key={component.id} className="w-full">
                  {renderComponent(component)}
                </div>
              ))}
            {page.components.filter(c => c.isVisible).length === 0 && (
              <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-400">
                <FiLayout className="mb-4 w-16 h-16 opacity-50" />
                <p className="text-lg font-medium">No visible components</p>
                <p className="mt-2 text-sm">Add and enable components to see preview</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{page.components.filter(c => c.isVisible).length} visible components</span>
            <span>Press ESC or click X to close</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Preview Component Renderers with Configuration
const PreviewHeroSection: React.FC<{ config: HeroSectionConfig }> = ({ config }) => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="flex overflow-hidden relative justify-center items-center min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: config.backgroundImage 
              ? `url('${config.backgroundImage}')`
              : `url('https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274')`
          }}
        ></div>
      </div>
      <div className="relative z-20 px-4 mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
                <span className="block">{config.headline1 || 'Premium'}</span>
                <span className="block">{config.headline2 || 'Accommodation,'}</span>
                <span className="block" style={{color: '#4B9CD3'}}>{config.headline3 || 'hello acestayz'}</span>
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-gray-200 md:text-2xl">
                {config.description || 'A platform for premium hotels and homestays for intelligent travelers, at the best locations & rates across India.'}
              </p>
            </div>
            <div className="max-w-2xl">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <div className="relative">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={config.searchPlaceholder || 'Book a Stay in Delhi, Noida, Gurugram...'}
                    className="py-4 pr-4 pl-12 w-full text-lg placeholder-gray-500 text-gray-900 rounded-2xl border-0 shadow-2xl backdrop-blur-sm transition-all duration-300 bg-white/95 focus:outline-none focus:ring-4 focus:bg-white"
                    style={{'--tw-ring-color': '#4B9CD3'} as React.CSSProperties}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 px-6 py-2 font-semibold text-white rounded-xl transition-colors duration-200 transform -translate-y-1/2"
                    style={{backgroundColor: '#4B9CD3'}}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="flex items-center space-x-2" style={{color: '#4B9CD3'}}>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-lg font-semibold">Book Direct for Lowest Prices!</span>
            </div>
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#4B9CD3'}}>{config.statsYears || '6+'}</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#4B9CD3'}}>{config.statsGuests || '500+'}</div>
                <div className="text-sm text-gray-300">Happy Guests</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{color: '#4B9CD3'}}>{config.statsLocations || '15+'}</div>
                <div className="text-sm text-gray-300">Prime Locations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PreviewShuffleHero: React.FC<{ config: ShuffleHeroConfig }> = ({ config }) => {
  return (
    <section className="grid grid-cols-1 gap-8 items-center px-4 py-12 mx-auto w-full max-w-6xl sm:px-6 lg:px-8 md:grid-cols-2">
      <div>
        <span className="block mb-4 text-xs font-medium md:text-sm" style={{ color: '#4B9CD3' }}>Discover more</span>
        <h3 className="text-4xl font-semibold text-gray-900 md:text-6xl">{config.title || 'Stays that inspire'}</h3>
        <p className="my-4 text-base text-gray-700 md:text-lg md:my-6">
          {config.description || 'From boutique homestays to premium suites, explore curated places crafted for comfort and style.'}
        </p>
        <button
          className="px-5 py-2.5 rounded-xl font-semibold transition-colors duration-200 text-white"
          style={{ backgroundColor: '#4B9CD3' }}
        >
          {config.buttonText || 'Explore stays'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="w-full bg-gray-200 rounded-lg aspect-square"></div>
        ))}
      </div>
    </section>
  )
}

const PreviewMouseImageTrailHero: React.FC<{ config: MouseImageTrailConfig }> = ({ config }) => {
  return (
    <section className="px-4 py-20 w-full bg-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <p className="flex gap-2 justify-center items-center text-3xl font-bold text-gray-900">
          <FiMousePointer aria-hidden />
          <span>{config.title || 'Hover to preview stays'}</span>
        </p>
        <p className="mt-4 text-gray-700">
          {config.description || 'Move your cursor to reveal a trail of beautiful hotel and homestay shots.'}
        </p>
        {config.images && config.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mx-auto mt-8 max-w-2xl">
            {config.images.slice(0, 6).map((img, idx) => (
              <img key={idx} src={img} alt={`Preview ${idx + 1}`} className="object-cover w-full h-32 rounded-lg" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

const PreviewHotelShowcase: React.FC<{ config: HotelShowcaseConfig }> = ({ config }) => {
  return (
    <section className="px-4 py-16 w-full bg-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl" style={{ color: '#4B9CD3' }}>
            {config.title || 'AceStayz across India'}
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-500">
            {config.description || 'Discover premium accommodations in top locations including Mumbai, Bengaluru, Delhi, Gurugram, Pune, Goa, Udaipur, Srinagar & Rishikesh'}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg">
              <div className="h-52 bg-gray-200"></div>
              <div className="p-5">
                <h3 className="mb-2 text-base font-medium text-gray-800">Hotel {i}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">City</p>
                  <p className="text-sm font-semibold text-green-600">From ₹5,000</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PreviewFeaturesShowcase: React.FC<{ config: FeaturesShowcaseConfig }> = ({ config }) => {
  return (
    <section className="py-20 w-full" style={{ backgroundColor: '#4B9CD3' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-20">
          <h2 className="mb-6 text-5xl font-bold text-white">
            {config.title || 'What makes us AceStayz?'}
          </h2>
          <p className="text-xl text-white">
            {config.description || 'With so much to tell & so little time, here are a few key highlights.'}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-gray-200"></div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-white">Feature {i}</h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  Feature description goes here
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PreviewBentoGridShowcase: React.FC<{ config: BentoGridShowcaseConfig }> = ({ config }) => {
  return (
    <section className="px-4 py-24 w-full bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-5xl font-bold md:text-6xl" style={{ color: '#4B9CD3' }}>
            {config.title || 'What people say about AceStayz'}
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
            {config.description || 'Hear from our happy guests and see why they love staying with us.'}
          </p>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-6 h-[500px] p-6 bg-white/80 backdrop-blur-sm rounded-3xl">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className={`rounded-2xl bg-gradient-to-br ${
              i === 1 ? 'col-span-2 row-span-2' : ''
            } ${
              i % 3 === 0 ? 'from-blue-400 to-purple-400' :
              i % 3 === 1 ? 'from-green-400 to-blue-400' :
              'from-orange-400 to-pink-400'
            }`}></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PageBuilder
