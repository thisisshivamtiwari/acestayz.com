import React, { useState, useRef, useEffect } from 'react'

// ACE 55 Images
import ace55_1 from '../assets/images/ACE_55/ChatGPTImage.jpg'
import ace55_2 from '../assets/images/ACE_55/IMG_3570.jpg'

// ACE 57 Images
import ace57_1 from '../assets/images/ACE_57/IMG_5838-2.jpg'
import ace57_2 from '../assets/images/ACE_57/IMG_5779.jpg'

// Ace Vasant Kunj Images
import aceVK_1 from '../assets/images/Ace_Vasant_Kunj/IMG_8772.jpg'
import aceVK_2 from '../assets/images/Ace_Vasant_Kunj/IMG_7451.jpg'

const BRAND_BLUE = '#4B9CD3'

type GridItem = {
  id: number
  type: 'image' | 'text' | 'testimonial' | 'award'
  content?: string
  imageSrc?: string
  bgColor?: string
  textColor?: string
  spanClasses: string
  reviewText?: string
  reviewerName?: string
  rating?: number
  brandName?: string
  awardTitle?: string
  awardSubtitle?: string
  /** Index into allGuestReviews for testimonial type */
  reviewIndex?: number
}

// Slide 1: exactly 8 cells (4 cols x 2 rows)
// Row1: [img 2x2] [text] [text]  -> row2: [img 2x2] [testimonial] [testimonial]
const slide1Items: GridItem[] = [
  {
    id: 1,
    type: 'image',
    imageSrc: ace55_1,
    spanClasses: 'col-span-2 row-span-2'
  },
  {
    id: 2,
    type: 'text',
    content: 'Fashionable rooms, well designed',
    bgColor: BRAND_BLUE,
    textColor: 'text-white',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 3,
    type: 'text',
    content: '4.9 ⭐ Rating',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 4,
    type: 'testimonial',
    spanClasses: 'col-span-1 row-span-1',
    reviewIndex: 0
  },
  {
    id: 5,
    type: 'testimonial',
    spanClasses: 'col-span-1 row-span-1',
    reviewIndex: 2
  }
]

// Slide 2: exactly 8 cells
// [img 1x2] [text] [testimonial 2x1]
// [img 1x2] [img] [award]
const slide2Items: GridItem[] = [
  {
    id: 6,
    type: 'image',
    imageSrc: ace55_2,
    spanClasses: 'col-span-1 row-span-2'
  },
  {
    id: 7,
    type: 'text',
    content: '500+ Happy Guests',
    bgColor: 'bg-white',
    textColor: 'text-gray-800',
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 8,
    type: 'testimonial',
    spanClasses: 'col-span-2 row-span-1',
    reviewIndex: 3
  },
  {
    id: 9,
    type: 'image',
    imageSrc: ace57_1,
    spanClasses: 'col-span-1 row-span-1'
  },
  {
    id: 10,
    type: 'award',
    awardTitle: 'Best Hotel Chain for Customer Satisfaction 2023',
    awardSubtitle: 'Hospitality Leaders Awards',
    bgColor: BRAND_BLUE,
    textColor: 'text-white',
    spanClasses: 'col-span-2 row-span-1'
  }
]

// Slide 3: img 2x2 + 4 testimonials (reviews 1,4,5,6)
const slide3Items: GridItem[] = [
  { id: 11, type: 'image', imageSrc: ace57_2, spanClasses: 'col-span-2 row-span-2' },
  { id: 12, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 1 },
  { id: 13, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 4 },
  { id: 14, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 5 },
  { id: 15, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 6 }
]

// Slide 4: img 1x2, text, award 2x1, 3 testimonials (7,8,9)
const slide4Items: GridItem[] = [
  { id: 16, type: 'image', imageSrc: aceVK_1, spanClasses: 'col-span-1 row-span-2' },
  { id: 17, type: 'text', content: '500+ Happy Guests', bgColor: 'bg-white', textColor: 'text-gray-800', spanClasses: 'col-span-1 row-span-1' },
  { id: 18, type: 'award', awardTitle: 'Best Hotel Chain for Customer Satisfaction 2023', awardSubtitle: 'Hospitality Leaders Awards', bgColor: BRAND_BLUE, textColor: 'text-white', spanClasses: 'col-span-2 row-span-1' },
  { id: 19, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 7 },
  { id: 20, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 8 },
  { id: 21, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 9 }
]

// Slide 5: img 2x2 + 4 testimonials (10,11,12,13)
const slide5Items: GridItem[] = [
  { id: 22, type: 'image', imageSrc: aceVK_2, spanClasses: 'col-span-2 row-span-2' },
  { id: 23, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 10 },
  { id: 24, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 11 },
  { id: 25, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 12 },
  { id: 26, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 13 }
]

// Slide 6: img 1x2, text, img 1x1, award 1x1, 3 testimonials (14,15,16)
const slide6Items: GridItem[] = [
  { id: 27, type: 'image', imageSrc: ace55_2, spanClasses: 'col-span-1 row-span-2' },
  { id: 28, type: 'text', content: '6+ Years Experience', bgColor: 'bg-white', textColor: 'text-gray-800', spanClasses: 'col-span-1 row-span-1' },
  { id: 29, type: 'image', imageSrc: ace57_1, spanClasses: 'col-span-1 row-span-1' },
  { id: 30, type: 'award', awardTitle: 'Best Hotel Chain for Customer Satisfaction 2023', awardSubtitle: 'Hospitality Leaders Awards', bgColor: BRAND_BLUE, textColor: 'text-white', spanClasses: 'col-span-1 row-span-1' },
  { id: 31, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 14 },
  { id: 32, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 15 },
  { id: 33, type: 'testimonial', spanClasses: 'col-span-1 row-span-1', reviewIndex: 16 }
]

const slides = [slide1Items, slide2Items, slide3Items, slide4Items, slide5Items, slide6Items]

type GuestReview = {
  id: number
  name: string
  timeAgo: string
  rating: number
  category?: string
  text: string
  rooms?: number
  service?: number
  location?: number
  highlights?: string
}

const allGuestReviews: GuestReview[] = [
  {
    id: 1,
    name: 'Shalini Sahu',
    timeAgo: '2 months ago',
    rating: 4,
    category: 'Business | Solo',
    text: "The concept is good. They have a small kitchenette with induction, microwave, RO, even a washing machine and some basic utensils too. However I didn't use any as it was just a night stay for me. Though they don't have proper reception and the experience was smooth and hassle-free check-in."
  },
  {
    id: 2,
    name: 'Pawan',
    timeAgo: '4 months ago',
    rating: 4,
    text: 'Found smooth and hassle-free check-in experience, making arrival convenient. The host, Ganesh, is very helpful and quick to respond to any queries, which adds to the comfort of the stay. The property maintains a clean and pleasant environment.'
  },
  {
    id: 3,
    name: 'swastika dreamvalley',
    timeAgo: 'a month ago',
    rating: 5,
    text: 'Very comfortable and very cooperative staff. The rooms were clean and even the staff is really well mannered. It was an awesome stay.',
    rooms: 5,
    service: 5,
    location: 5
  },
  {
    id: 4,
    name: 'Rajan Kumar',
    timeAgo: '2 weeks ago',
    rating: 5,
    text: 'Nice Hospitality and staff behaviour is good. Hotel room was clean and all necessary accessories were available.',
    rooms: 5,
    service: 5,
    location: 5
  },
  {
    id: 5,
    name: 'ARMAN SAIYED',
    timeAgo: 'a week ago',
    rating: 5,
    category: 'Holiday | Friends',
    text: 'I would like to appreciate everything about this hotel. The rooms, the hospitality, the cleanliness. No complaints.',
    rooms: 5,
    service: 5,
    location: 5,
    highlights: 'Luxury · Quiet'
  },
  {
    id: 6,
    name: 'prishu kagra',
    timeAgo: '5 months ago',
    rating: 5,
    text: 'Highly recommended property with all the amenities in the room — fridge, ac, geyser, tv, RO, induction, even washing machine in the balcony. Also have basic cooking utensils.'
  },
  {
    id: 7,
    name: 'JAI',
    timeAgo: '6 months ago',
    rating: 5,
    category: 'Friends',
    text: "Had a wonderful experience at Ace Stayz. The hotel is beautifully designed, clean, and very well-maintained. The staff was incredibly friendly, polite, and always ready to help with a smile. The rooms were spacious, comfortable, and had all the modern amenities I needed.",
    rooms: 5,
    service: 5,
    location: 5,
    highlights: 'Great value'
  },
  {
    id: 8,
    name: 'Shobhit Raj',
    timeAgo: '7 months ago',
    rating: 5,
    category: 'Holiday | Couple',
    text: "I had a really nice stay at this property. Friendly staffs, neat and clean rooms and washroom. You will get everything you need to make your stay amazing and they have an attached balcony which is another x-factor.",
    rooms: 5,
    service: 5,
    location: 5,
    highlights: 'Quiet · Great value'
  },
  {
    id: 9,
    name: 'aprajita jaiswal',
    timeAgo: '2 weeks ago',
    rating: 5,
    text: 'Nice stay with clean rooms and washroom, good ambience, very good parking and a very good budget in Delhi.. go for it 👍',
    rooms: 5,
    service: 5,
    location: 5
  },
  {
    id: 10,
    name: 'vandit jain',
    timeAgo: '8 months ago',
    rating: 5,
    category: 'Holiday | Friends',
    text: "I had the pleasure of staying at the property last night, and I must say it exceeded my expectations in every way!"
  },
  {
    id: 11,
    name: 'Renu Grover',
    timeAgo: '10 months ago',
    rating: 5,
    text: "Ace Stayz was everything I needed! It was super clean, cozy, and fully equipped with all the amenities. Kitchen has RO, induction, fridge, kettle, microwave and all the essential cutlery. Bathroom was luxurious! Has hair dryer, geyser and all the essential things. Would recommend for sure.",
    rooms: 5,
    service: 5,
    location: 5
  },
  {
    id: 12,
    name: 'Aarushi Grover',
    timeAgo: '10 months ago',
    rating: 5,
    category: 'Holiday | Friends',
    text: "I had an amazing experience at Ace Stayz! The stay was incredibly comfortable, with all the essentials taken care of. The small kitchen was perfect for quick meals, the bathroom was spotless and well-maintained, and the balcony provided a lovely space to unwind."
  },
  {
    id: 13,
    name: 'Sanyam Jain',
    timeAgo: '8 months ago',
    rating: 5,
    text: "I had a lovely stay at ACE STAYZ last weekend. The check-in process was very smooth & support staff was really co-operative. The amenities these guys are providing (at such an affordable price) are at par with other Airbnbs which are rather expensive. Kudos to their team & I highly recommend it.",
    rooms: 5,
    service: 5,
    location: 5
  },
  {
    id: 14,
    name: 'Chirag Jain',
    timeAgo: '9 months ago',
    rating: 5,
    category: 'Holiday | Friends',
    text: "This place is definitely your go-to for an unbeatable value-for-money stay in the NCR. With an amazing location, stylish room aesthetics, top-notch amenities, and warm hospitality, it truly checks all the boxes. Whether you're planning a short trip or a longer stay, Ace Stayz delivers."
  },
  {
    id: 15,
    name: 'vardhan jain',
    timeAgo: '8 months ago',
    rating: 5,
    text: "I had a wonderful stay at the Ace Stayz. The room was exceptionally clean and well-maintained, with a comfortable bed and a spacious bathroom with quality toiletries and a kitchen with all the essentials. The staff was friendly and helpful."
  },
  {
    id: 16,
    name: 'sheikh abdul',
    timeAgo: 'a month ago',
    rating: 4,
    text: 'The rooms are perfect for both short and long stay, staffs are polite and co-operative.',
    rooms: 4,
    service: 4,
    location: 3
  },
  {
    id: 17,
    name: 'Shaina Jindal',
    timeAgo: '8 months ago',
    rating: 5,
    category: 'Holiday | Friends',
    text: "I really enjoyed my stay here. The room was cozy, well-maintained, and had everything I needed. The small pantry with a fridge, microwave, induction, and RO was a big plus. Highly recommended for a comfortable and convenient stay.",
    rooms: 5,
    service: 5,
    location: 5
  }
]

const BentoGridShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<number | null>(null)

  const totalSlides = slides.length

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < totalSlides - 1

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!isPaused && totalSlides > 1) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }, 5000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, totalSlides])

  const renderGridItem = (item: GridItem) => {
    switch (item.type) {
      case 'image':
        return (
          <div className="relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl h-full w-full">
            <img
              src={item.imageSrc}
              alt={`ACE STAYZ property ${item.id}`}
              className="object-cover w-full h-full min-h-[120px] transition-transform duration-500 hover:scale-105"
            />
          </div>
        )
      case 'text':
        return (
          <div
            className={`flex items-center justify-center rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl p-6 h-full w-full ${item.textColor}`}
            style={{ backgroundColor: item.bgColor }}
          >
            <p className="text-lg font-bold leading-snug text-center md:text-xl">{item.content}</p>
          </div>
        )
      case 'testimonial': {
        const review = item.reviewIndex != null ? allGuestReviews[item.reviewIndex] : null
        const rating = review?.rating ?? item.rating ?? 5
        const reviewText = review?.text ?? item.reviewText ?? ''
        const reviewerName = review?.name ?? item.reviewerName ?? ''
        return (
          <div className="flex flex-col justify-center rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl p-5 md:p-6 overflow-hidden h-full w-full bg-white text-gray-800">
            <img
              src="https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"
              alt="Google"
              className="object-contain w-16 h-6 mb-2 flex-shrink-0"
            />
            <div className="flex gap-0.5 mb-2 flex-shrink-0" aria-label={`${rating} stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < rating ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-center line-clamp-4 mb-2 flex-1 min-h-0">
              &ldquo;{reviewText}&rdquo;
            </p>
            <p className="text-xs font-semibold text-gray-600 text-center flex-shrink-0">
              — {reviewerName}
            </p>
          </div>
        )
      }
      case 'award':
        return (
          <div
            className={`flex flex-col items-center justify-center rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl p-5 md:p-6 h-full w-full ${item.textColor}`}
            style={{ backgroundColor: item.bgColor }}
          >
            <span className="text-4xl mb-2" aria-hidden>🏆</span>
            <p className="text-sm font-bold leading-tight text-center line-clamp-2 mb-1">
              {item.awardTitle}
            </p>
            <p className="text-xs opacity-90 text-center">{item.awardSubtitle}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="w-full px-4 py-20 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center md:mb-16">
          <h2
            className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: BRAND_BLUE }}
          >
            Hear From Our Dear Guests
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
            Hear from our happy Stayerz and see why they love Ace Stayz.
          </p>
        </header>

        {/* Slider + Arrows */}
        <div
          className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!canGoPrevious}
            aria-label="Previous slide"
            className={`order-2 sm:order-1 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 sm:w-14 sm:h-14 ${
              canGoPrevious
                ? 'bg-white text-gray-700 border-gray-200 shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100'
            }`}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={containerRef}
            className="order-1 sm:order-2 flex-1 min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((items, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4 py-6 sm:px-6 sm:py-8">
                  <div
                    className="grid grid-cols-4 grid-rows-2 gap-4 sm:gap-6 auto-rows-fr min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]"
                  >
                    {items.map((item) => (
                      <div key={item.id} className={`min-h-0 min-w-0 ${item.spanClasses}`}>
                        {renderGridItem(item)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next slide"
            className={`order-3 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 sm:w-14 sm:h-14 ${
              canGoNext
                ? 'bg-white text-gray-700 border-gray-200 shadow-lg hover:shadow-xl hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-100'
            }`}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slide indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8" aria-hidden>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-200 ${
                  i === currentIndex ? 'w-8' : 'w-2'
                }`}
                style={{ backgroundColor: i === currentIndex ? BRAND_BLUE : '#cbd5e1' }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default BentoGridShowcase
