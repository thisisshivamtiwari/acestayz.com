import  { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { brandBlue, PrimaryButton, Tag } from './Base'

export type GallerySection = { title: string; images: string[] }

export default function BottomSheetGallery({ open, onClose, sections }: { open: boolean; onClose: () => void; sections: GallerySection[] }) {
  const [active, setActive] = useState(0)
  const activeSection = useMemo(() => sections[active] ?? { title: '', images: [] }, [sections, active])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          <motion.div
            className="absolute inset-x-0 bottom-0 h-[100vh] bg-white rounded-t-3xl overflow-hidden flex flex-col"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="px-6 pt-4 pb-3 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mr-2" />
                <h3 className="text-lg font-semibold" style={{ color: brandBlue }}>All Images</h3>
                <Tag>{activeSection.title}</Tag>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
            </div>

            {/* Tabs */}
            <div className="px-6 py-3 border-b border-gray-100 overflow-x-auto">
              <div className="flex items-center gap-3 min-w-max">
                {sections.map((s, i) => (
                  <button key={s.title} onClick={() => setActive(i)} className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${i === active ? 'text-white' : 'text-gray-600'}`} style={i === active ? { backgroundColor: brandBlue } : { backgroundColor: '#E6F1FA' }}>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeSection.images.map((src, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden bg-gray-100">
                    <img src={src} alt={activeSection.title + ' image ' + (idx + 1)} className="w-full h-40 object-cover" />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
              <PrimaryButton onClick={onClose as any}>Done</PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


