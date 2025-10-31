import { AnimatedInView, GlassCard, Section, Tag } from './Base'
import { FiStar } from 'react-icons/fi'

export default function ReviewsCarousel() {
  return (
    <Section title="Reviews" id="reviews">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <div className="flex gap-6 min-w-max pr-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <AnimatedInView key={i}>
              <GlassCard className="p-6 w-[320px]">
                <div className="flex items-center gap-2 mb-2 text-emerald-600">
                  <FiStar /> 5.0 <Tag>Tripadvisor</Tag>
                </div>
                <p className="text-gray-700 text-sm">Excellent stay, super clean rooms and very helpful staff. Great location as well.</p>
                <div className="mt-4 text-sm text-gray-500">Guest {i + 1}</div>
              </GlassCard>
            </AnimatedInView>
          ))}
        </div>
      </div>
    </Section>
  )
}


