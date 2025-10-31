import { AnimatedInView, GlassCard, Section } from './Base'

const IMG = "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274"

export default function OtherHotelsGrid() {
  return (
    <Section title="Other Hotels">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <AnimatedInView key={i}>
            <GlassCard className="overflow-hidden">
              <div className="h-56 bg-center bg-cover" style={{ backgroundImage: `url('${IMG}')` }} />
              <div className="p-5">
                <div className="font-semibold text-gray-900 mb-1">AceStayz @ Location {i + 1}</div>
                <div className="text-sm text-gray-500">City neighborhood, Country</div>
                <div className="mt-3 text-emerald-600 font-semibold">₹ 8,100 <span className="text-gray-500 font-normal text-xs">/ night onwards</span></div>
              </div>
            </GlassCard>
          </AnimatedInView>
        ))}
      </div>
    </Section>
  )
}


