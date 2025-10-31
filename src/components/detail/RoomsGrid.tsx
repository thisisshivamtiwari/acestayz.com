import { AnimatedInView, GlassCard, PrimaryButton, Section } from './Base'

const IMG = "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2274"

export default function RoomsGrid() {
  return (
    <Section title="Rooms" id="rooms">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, idx) => (
          <AnimatedInView key={idx}>
            <GlassCard className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-52 md:h-full bg-center bg-cover" style={{ backgroundImage: `url('${IMG}')` }} />
                <div className="p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Superior King</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>2 Guests max</div>
                      <div>220 sq. ft. Area</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-500 line-through">₹ 8,360</div>
                      <div className="text-emerald-600 font-bold">₹ 7,560 <span className="text-gray-500 font-normal text-xs">onwards</span></div>
                    </div>
                    <PrimaryButton>Book</PrimaryButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </AnimatedInView>
        ))}
      </div>
    </Section>
  )
}


