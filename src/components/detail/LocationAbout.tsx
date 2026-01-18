import { AnimatedInView, GlassCard, Section } from './Base'

interface LocationAboutProps {
  hotel: {
    title: string
    fullAddress: string
    description: string
    nearbyAttractions: string[]
    mapUrl: string
  }
}

export default function LocationAbout({ hotel }: LocationAboutProps) {
  return (
    <Section id="location" title="Location" subtitle={hotel.fullAddress}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatedInView>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 mb-3">Nearby Attractions</h4>
              {hotel.nearbyAttractions.slice(0, 4).map((attraction, index) => (
                <GlassCard key={index} className="p-4">
                  <div className="text-sm text-gray-700">{attraction}</div>
                </GlassCard>
              ))}
            </div>
          </AnimatedInView>
          <AnimatedInView>
            <GlassCard className="h-full min-h-[260px] overflow-hidden rounded-xl">
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(hotel.fullAddress)}&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '260px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location Map"
              />
            </GlassCard>
          </AnimatedInView>
        </div>

        <AnimatedInView className="mt-12">
          <h3 className="text-3xl font-bold mb-3" style={{ color: '#4B9CD3' }}>About {hotel.title}</h3>
          <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
        </AnimatedInView>
      </div>
    </Section>
  )
}


