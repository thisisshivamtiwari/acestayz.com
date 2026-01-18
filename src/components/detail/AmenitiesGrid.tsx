import { AnimatedInView, GlassCard, Section } from './Base'
import { FiShield } from 'react-icons/fi'

interface AmenitiesGridProps {
  amenities?: string[]
}

export default function AmenitiesGrid({ amenities = [] }: AmenitiesGridProps) {
  return (
    <Section title="Amenities" id="amenities">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {amenities.map((label, idx) => (
          <AnimatedInView key={idx}>
            <GlassCard className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#E6F1FA', color: '#4B9CD3' }}>
                <FiShield />
              </div>
              <span className="text-sm text-gray-700">{label}</span>
            </GlassCard>
          </AnimatedInView>
        ))}
        </div>
      </div>
    </Section>
  )
}

