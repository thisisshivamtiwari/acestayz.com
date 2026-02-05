import { Hotel } from '../components/HotelCard'

// ACE 55 Images
import ace55_1 from '../assets/images/ACE_55/IMG_3606-2.jpg'
import ace55_2 from '../assets/images/ACE_55/IMG_3570.jpg'
import ace55_3 from '../assets/images/ACE_55/IMG_3539.jpg'
import ace55_4 from '../assets/images/ACE_55/DSC_0254-2.jpg'
import ace55_5 from '../assets/images/ACE_55/DSC_0236.jpg'
import ace55_6 from '../assets/images/ACE_55/ChatGPTImage.jpg'

// ACE 57 Images
import ace57_1 from '../assets/images/ACE_57/IMG_5838-2.jpg'
import ace57_2 from '../assets/images/ACE_57/IMG_5828-2.jpg'
import ace57_3 from '../assets/images/ACE_57/IMG_5779.jpg'
import ace57_4 from '../assets/images/ACE_57/IMG_3570.jpg'
import ace57_5 from '../assets/images/ACE_57/DSC_0454.jpg'
import ace57_6 from '../assets/images/ACE_57/DSC_0384.jpg'

// Ace Vasant Kunj Images
import aceVK_1 from '../assets/images/Ace_Vasant_Kunj/IMG_8772.jpg'
import aceVK_2 from '../assets/images/Ace_Vasant_Kunj/IMG_8765.jpg'
import aceVK_3 from '../assets/images/Ace_Vasant_Kunj/IMG_7451.jpg'
import aceVK_4 from '../assets/images/Ace_Vasant_Kunj/IMG_7435.jpg'
import aceVK_5 from '../assets/images/Ace_Vasant_Kunj/IMG_3570.jpg'

// ACE Gautam Nagar Images
import gautamNagar_1 from '../assets/images/ACE_GautamNagar/1.png'
import gautamNagar_2 from '../assets/images/ACE_GautamNagar/2.png'
import gautamNagar_3 from '../assets/images/ACE_GautamNagar/3.png'
import gautamNagar_4 from '../assets/images/ACE_GautamNagar/4.png'
import gautamNagar_5 from '../assets/images/ACE_GautamNagar/5.jpg'

export interface LocationData {
  name: string
  fullLocationName: string
  slug: string
  description: string
  heroImage: string
  hotels: Hotel[]
  highlights: string[]
  bestTimeToVisit: string
  averageRating: number
  totalReviews: number
}

export interface RoomType {
  id: number
  name: string
  description: string
  image: string
  maxOccupancy: number
  size: string
  basePrice: number
  mealPlans: MealPlan[]
}

export interface MealPlan {
  id: number
  name: string
  description: string
  price: number
  includes: string[]
}

export interface DetailedHotel extends Hotel {
  slug: string
  images: string[]
  roomTypes: RoomType[]
  allAmenities: string[]
  specialities: string[]
  checkInTime: string
  checkOutTime: string
  policies: string[]
  nearbyAttractions: string[]
  totalReviews?: number
  bookingUrl: string
  mapUrl: string
  fullAddress: string
}

export const allHotels: Hotel[] = [
  {
    id: 1,
    image: ace55_1,
    title: 'Acestayz Sector 55 Gurugram',
    location: 'Sector 55, Gurugram',
    description: 'Modern studio apartments near Sec-55/56 metro station with bathtub rooms and premium amenities.',
    rating: 4.8,
    price: 3500,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', '24-hour Front Desk'],
    slug: 'acestayz-sector-55-gurugram',
  },
  {
    id: 2,
    image: ace57_1,
    title: 'Acestayz Sector 57 Gurugram',
    location: 'Sector 57, Gurugram',
    description: 'Premium studio apartments in Sushant Lok with modern amenities and convenient location.',
    rating: 4.9,
    price: 3800,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', 'Free Parking'],
    slug: 'acestayz-sector-57-gurugram',
  },
  {
    id: 3,
    image: aceVK_1,
    title: 'Acestayz Vasant Kunj Delhi',
    location: 'Vasant Kunj, Delhi',
    description: 'Spacious studio apartments and penthouse near Apex Tower with premium facilities.',
    rating: 4.7,
    price: 4200,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', 'Room Service'],
    slug: 'acestayz-vasant-kunj-delhi',
  },
  {
    id: 4,
    image: gautamNagar_1,
    title: 'Acestayz Gautam Nagar Delhi',
    location: 'Gautam Nagar, Delhi',
    description: 'Comfortable studio apartments on Gautam Nagar Rd, Yusuf Sarai with modern amenities and free parking.',
    rating: 4.8,
    price: 3800,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', '24-hour Front Desk', 'Free Parking'],
    slug: 'acestayz-gautam-nagar-delhi',
  }
]

export const detailedHotels: DetailedHotel[] = [
  {
    id: 1,
    slug: 'acestayz-sector-55-gurugram',
    title: 'Acestayz Sector 55 Gurugram',
    location: 'Sector 55, Gurugram',
    fullAddress: 'A-18, Sushant Lok 2, Sector 55, Gurugram 122011. Near sec-55/56 metro station',
    image: ace55_1,
    images: [
      ace55_1,
      ace55_2,
      ace55_3,
      ace55_4,
      ace55_5,
      ace55_6,
    ],
    description: 'Modern studio apartments near Sec-55/56 metro station with bathtub rooms and premium amenities.',
    rating: 4.8,
    price: 3500,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', '24-hour Front Desk'],
    roomTypes: [
      {
        id: 1,
        name: 'Studio with Bathtub',
        description: 'Spacious studio apartment with luxurious bathtub and modern amenities',
        image: ace55_2,
        maxOccupancy: 2,
        size: '350 sq ft',
        basePrice: 3500,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Air conditioning']
          }
        ]
      },
      {
        id: 2,
        name: 'Studio without Bathtub',
        description: 'Comfortable studio apartment with shower and modern facilities',
        image: ace55_3,
        maxOccupancy: 2,
        size: '300 sq ft',
        basePrice: 3000,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Air conditioning']
          }
        ]
      }
    ],
    allAmenities: [
      'Free Wi-Fi',
      '24-hour Front Desk',
      'Washing Machine Provided',
      'Room Service',
      'Air Conditioning',
      'Kitchen',
      'Free Parking',
      'Accessible Property'
    ],
    specialities: [
      '14 Total Rooms',
      '10 Rooms with Bathtub',
      '4 Rooms without Bathtub',
      'Near Metro Station',
      'Modern Kitchen Facilities'
    ],
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    policies: [
      'Valid ID proof required at check-in',
      'No smoking inside rooms',
      'Pets not allowed',
      'Early check-in subject to availability'
    ],
    nearbyAttractions: [
      'Sector 55-56 Metro Station - 5 min walk',
      'Cyber Hub - 10 min drive',
      'Kingdom of Dreams - 15 min drive',
      'Ambience Mall - 10 min drive'
    ],
    totalReviews: 156,
    bookingUrl: 'https://www.zotel.ai/hotels/acestayz-55-gurugram',
    mapUrl: 'https://maps.app.goo.gl/u4ZWJrRuomjnmTPE9?g_st=aw'
  },
  {
    id: 2,
    slug: 'acestayz-sector-57-gurugram',
    title: 'Acestayz Sector 57 Gurugram',
    location: 'Sector 57, Gurugram',
    fullAddress: 'G-219, Phase 2, Sushant Lok Phase I, Sector 57, Gurugram, Haryana 122011',
    image: ace57_1,
    images: [
      ace57_1,
      ace57_2,
      ace57_3,
      ace57_4,
      ace57_5,
      ace57_6,
    ],
    description: 'Premium studio apartments in Sushant Lok with modern amenities and convenient location.',
    rating: 4.9,
    price: 3800,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', 'Free Parking'],
    roomTypes: [
      {
        id: 1,
        name: 'Studio Apartment',
        description: 'Fully furnished studio apartment with kitchen and modern amenities',
        image: ace57_2,
        maxOccupancy: 2,
        size: '380 sq ft',
        basePrice: 3800,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Kitchen facilities']
          }
        ]
      }
    ],
    allAmenities: [
      'Free Wi-Fi',
      '24-hour Front Desk',
      'Washing Machine Provided',
      'Room Service',
      'Air Conditioning',
      'Kitchen',
      'Free Parking',
      'Accessible Property'
    ],
    specialities: [
      '17 Total Rooms',
      'All Studio Apartments',
      'Prime Sushant Lok Location',
      'Fully Equipped Kitchen',
      'Modern Furnishing'
    ],
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    policies: [
      'Valid ID proof required at check-in',
      'No smoking inside rooms',
      'Pets not allowed',
      'Early check-in subject to availability'
    ],
    nearbyAttractions: [
      'Sushant Lok Market - 5 min walk',
      'Golf Course Road - 10 min drive',
      'Cyber Hub - 12 min drive',
      'DLF Phase 1 - 8 min drive'
    ],
    totalReviews: 189,
    bookingUrl: 'https://www.zotel.ai/hotels/ace-stays-57-gurugramgur',
    mapUrl: 'https://maps.app.goo.gl/FK2noijfw6PcQkwU8'
          },
  {
    id: 3,
    slug: 'acestayz-vasant-kunj-delhi',
    title: 'Acestayz Vasant Kunj Delhi',
    location: 'Vasant Kunj, Delhi',
    fullAddress: '157/9, Kishangarh, Vasant Kunj, New Delhi - 110070. Near Apex Tower',
    image: aceVK_1,
    images: [
      aceVK_1,
      aceVK_2,
      aceVK_3,
      aceVK_4,
      aceVK_5,
    ],
    description: 'Spacious studio apartments and penthouse near Apex Tower with premium facilities.',
    rating: 4.7,
    price: 4200,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', 'Room Service'],
    roomTypes: [
      {
        id: 1,
        name: 'Studio Apartment',
        description: 'Comfortable studio apartment with kitchen and modern amenities',
        image: aceVK_2,
        maxOccupancy: 2,
        size: '400 sq ft',
        basePrice: 4200,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Kitchen facilities']
          }
        ]
      },
      {
        id: 2,
        name: 'Penthouse',
        description: 'Luxurious penthouse with premium amenities and spacious layout',
        image: aceVK_3,
        maxOccupancy: 4,
        size: '800 sq ft',
        basePrice: 6500,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Premium furnishing']
          }
        ]
      }
    ],
    allAmenities: [
      'Free Wi-Fi',
      '24-hour Front Desk',
      'Washing Machine Provided',
      'Room Service',
      'Air Conditioning',
      'Kitchen',
      'Free Parking',
      'Accessible Property'
    ],
    specialities: [
      '20 Total Rooms',
      '19 Studio Apartments',
      '1 Luxury Penthouse',
      'Near Apex Tower',
      'Premium Location in Delhi'
    ],
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    policies: [
      'Valid ID proof required at check-in',
      'No smoking inside rooms',
      'Pets not allowed',
      'Early check-in subject to availability'
    ],
    nearbyAttractions: [
      'Apex Tower - 2 min walk',
      'Select Citywalk Mall - 10 min drive',
      'Qutub Minar - 15 min drive',
      'IGI Airport - 20 min drive'
    ],
    totalReviews: 203,
    bookingUrl: 'https://www.zotel.ai/hotels/ace-stayz',
    mapUrl: 'https://maps.app.goo.gl/YPTHFkAd6mgQpFGZA'
  },
  {
    id: 4,
    slug: 'acestayz-gautam-nagar-delhi',
    title: 'Acestayz Gautam Nagar Delhi',
    location: 'Gautam Nagar, Delhi',
    fullAddress: '135/5/1 Gautam Nagar Rd, Yusuf Sarai New Delhi, DELHI - 110049',
    image: gautamNagar_1,
    images: [
      gautamNagar_1,
      gautamNagar_2,
      gautamNagar_3,
      gautamNagar_4,
      gautamNagar_5,
    ],
    description: 'Comfortable studio apartments on Gautam Nagar Rd, Yusuf Sarai with modern amenities and free parking.',
    rating: 4.8,
    price: 3800,
    amenities: ['Free WiFi', 'Air Conditioning', 'Kitchen', '24-hour Front Desk', 'Free Parking'],
    roomTypes: [
      {
        id: 1,
        name: 'Classic',
        description: 'Comfortable classic room with modern amenities',
        image: gautamNagar_2,
        maxOccupancy: 2,
        size: '300 sq ft',
        basePrice: 3800,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Air conditioning', 'Kitchen']
          }
        ]
      },
      {
        id: 2,
        name: 'Signature',
        description: 'Signature room with premium amenities',
        image: gautamNagar_3,
        maxOccupancy: 2,
        size: '350 sq ft',
        basePrice: 4500,
        mealPlans: [
          {
            id: 1,
            name: 'Room Only',
            description: 'Stay without meals',
            price: 0,
            includes: ['Room accommodation', 'Free WiFi', 'Air conditioning', 'Kitchen']
          }
        ]
      }
    ],
    allAmenities: [
      'Free Wi-Fi',
      '24-hour Front Desk',
      'Washing Machine Provided',
      'Room Service',
      'Air Conditioning',
      'Kitchen',
      'Free Parking',
      'Accessible Property'
    ],
    specialities: [
      '35 Total Rooms',
      '28 Classic Rooms',
      '7 Signature Rooms',
      'Yusuf Sarai Location',
      'Modern Kitchen Facilities'
    ],
    checkInTime: '2:00 PM',
    checkOutTime: '11:00 AM',
    policies: [
      'Valid ID proof required at check-in',
      'No smoking inside rooms',
      'Pets not allowed',
      'Early check-in subject to availability'
    ],
    nearbyAttractions: [
      'Yusuf Sarai - 2 min walk',
      'Green Park Metro - 10 min drive',
      'Select Citywalk Mall - 15 min drive',
      'IGI Airport - 25 min drive'
    ],
    totalReviews: 120,
    bookingUrl: 'https://www.zotel.ai/hotels/acestayz-gautam-nagar-delhi',
    mapUrl: 'https://maps.app.goo.gl/qjtZUTXxCJ7pQSWZ8'
  }
]

export const locationData: { [key: string]: LocationData } = {
  gurugram: {
    name: 'Gurugram',
    fullLocationName: 'Gurugram, Haryana',
    slug: 'gurugram',
    description: 'Modern corporate hub with premium accommodations',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    hotels: allHotels.filter(h => h.location.includes('Gurugram')),
    highlights: ['Corporate Hub', 'Modern Amenities', 'Great Connectivity'],
    bestTimeToVisit: 'October to March',
    averageRating: 4.85,
    totalReviews: 345
  },
  delhi: {
    name: 'Delhi',
    fullLocationName: 'New Delhi',
    slug: 'delhi',
    description: 'Capital city with rich heritage and modern facilities',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80',
    hotels: allHotels.filter(h => h.location.includes('Delhi')),
    highlights: ['Historic Sites', 'Cultural Hub', 'Shopping Paradise'],
    bestTimeToVisit: 'October to March',
    averageRating: 4.75,
    totalReviews: 323
  }
}

export const getHotelBySlug = (slug: string): DetailedHotel | undefined => {
  return detailedHotels.find(hotel => hotel.slug === slug)
}

export const getHotelsByLocation = (location: string): Hotel[] => {
  return allHotels.filter(hotel => 
    hotel.location.toLowerCase().includes(location.toLowerCase())
  )
}

export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locationData[slug]
}
