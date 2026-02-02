import React from 'react'

// ACE 55 Images
import ace55_1 from '../assets/images/ACE_55/IMG_3606-2.jpg'

// ACE 57 Images
import ace57_1 from '../assets/images/ACE_57/IMG_5838-2.jpg'

// Ace Vasant Kunj Images
import aceVK_1 from '../assets/images/Ace_Vasant_Kunj/IMG_8772.jpg'

type Feature = {
  id: number
  title: string
  description: string
  image: string
  alt: string
}

const features: Feature[] = [
  {
    id: 1,
    title: 'Hybrid Stayz',
    description: 'Our hybrid hotels offer you the comfort of home with the Convenience of a hotel. With a fully furnished kitchenettes that blend convenience with comfort For more uninturrupted stays',
    image: ace55_1,
    alt: 'Premium hotel room at ACE Stayz Sector 55 Gurugram'
  },
  {
    id: 2,
    title: 'Uniquely designed',
    description: 'Gone are the days of the same boring standard hotels. At Ace Stayz, we add a distinctive flair to each room, so no two stayz are ever the same',
    image: ace57_1,
    alt: 'Clean and modern hotel room at ACE Stayz Sector 57 Gurugram'
  },
  {
    id: 3,
    title: ' No Nonsense Hospitality',
    description: 'No rigid rules that make no sense! Late check-in and check-out? Getting food delivered to your room or late night partying, enjoy your stay without following nonsense rules',
    image: aceVK_1,
    alt: 'Comfortable hotel room at ACE Stayz Vasant Kunj Delhi'
  }
]

const FeaturesShowcase: React.FC = () => {
  return (
    <section className="py-20 w-full" style={{ backgroundColor: '#4B9CD3' }}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h2 className="mb-6 text-5xl font-bold text-white">
            What makes us AceStayz?
          </h2>
          <p className="text-xl text-white">
            With so much to tell & so little time, here are a few key highlights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesShowcase
