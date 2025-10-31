import { AnimatedInView, GlassCard, Section } from './Base'

export default function LocationAbout() {
  return (
    <Section id="location" title="Location" subtitle="17A/32, Gurudwara Road, Near Pusa Road, Karol Bagh, New Delhi, 110005">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedInView>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-4">
                <div className="font-semibold text-gray-900 mb-1">Indra Gandhi International Airport</div>
                <div className="text-sm text-gray-600">13 km • 30 mins</div>
              </GlassCard>
              <GlassCard className="p-4">
                <div className="font-semibold text-gray-900 mb-1">New Delhi Railway Station</div>
                <div className="text-sm text-gray-600">4 km • 15 mins</div>
              </GlassCard>
            </div>
          </AnimatedInView>
          <AnimatedInView>
            <GlassCard className="h-[260px] flex items-center justify-center text-gray-600">Map placeholder</GlassCard>
          </AnimatedInView>
        </div>

        <AnimatedInView className="mt-12">
          <h3 className="text-3xl font-bold mb-3" style={{ color: '#4B9CD3' }}>About Bloom Hotel - Karol Bagh</h3>
          <p className="text-gray-700 leading-relaxed">Nestled in a commercial and residential area, Bloom Hotel - Karol Bagh offers chic interiors and thoughtfully designed rooms with a wide array of amenities to ensure comfort. High‑speed Wi‑Fi, 32” smart TV, ensuite bathroom and more help you recharge after a long day.</p>
        </AnimatedInView>
      </div>
    </Section>
  )
}


