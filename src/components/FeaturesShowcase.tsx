import React from 'react'

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
    title: 'Tech with heart',
    description: 'Like a best friend you can always trust & rely on, we\'re there for you every step of your stay helping you bloom to your best.',
    image: 'https://st4.depositphotos.com/4678277/40445/i/1600/depositphotos_404453754-stock-photo-full-size-photo-of-positive.jpg',
    alt: 'Friendly hotel staff member at reception desk'
  },
  {
    id: 2,
    title: 'Automated Cleanliness',
    description: 'We actually design our hotels to be easier to clean which is probably why people keep saying we\'re the cleanest hotel chain in India.',
    image: 'https://cdn.decorpad.com/photos/2018/01/01/m_pink-and-blue-girl-bedroom-colors.jpg',
    alt: 'Modern clean hotel room with desk and lighting'
  },
  {
    id: 3,
    title: 'Sleep Tech',
    description: 'Our custom built CloudBeds™ are so comfortable you may just find yourself hitting the alarm snooze a few too many times.',
    image: 'https://cdn.homedit.com/wp-content/uploads/2020/10/turquoise-and-pink-girls-bed-room-girl-room-colors.jpg',
    alt: 'Comfortable hotel bed with modern amenities'
  }
]

const FeaturesShowcase: React.FC = () => {
  return (
    <section className="w-full py-20" style={{ backgroundColor: '#4B9CD3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-5xl font-bold text-white mb-6">
            What makes us AceStayz?
          </h2>
          <p className="text-xl text-white">
            With so much to tell & so little time, here are a few key highlights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="flex flex-col">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={feature.image} 
                  alt={feature.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
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
