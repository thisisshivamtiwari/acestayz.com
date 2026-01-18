# AceStayz Codebase Index

**Last Updated:** January 2025  
**Project:** AceStayz Website  
**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router DOM

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Entry Points](#entry-points)
5. [Routing](#routing)
6. [Pages](#pages)
7. [Components](#components)
8. [Styling & Configuration](#styling--configuration)
9. [Dependencies](#dependencies)
10. [Key Features](#key-features)

---

## 🎯 Project Overview

AceStayz is a modern accommodation booking platform built with React, TypeScript, and Vite. The platform showcases premium hotels and homestays across India, focusing on locations like Noida, Delhi, Gurugram, and upcoming cities.

### Business Context
- **Primary Goal:** Increase online bookings and franchise inquiries
- **Target Audience:** Travelers seeking premium accommodations, potential franchise partners, corporate clients
- **Key Locations:** Noida, Delhi, Gurugram, Bangalore, Jaipur, Goa

---

## 🛠️ Technology Stack

### Core Technologies
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 5.2.0** - Build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing

### UI & Styling
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Framer Motion 11.18.2** - Animation library
- **React Icons 5.5.0** - Icon library
- **Lenis 1.3.11** - Smooth scrolling

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 📁 Project Structure

```
acestayz.com/
├── dist/                    # Production build output
├── node_modules/           # Dependencies
├── public/                 # Static assets
│   ├── manifest.json
│   └── vite.svg
├── src/                    # Source code
│   ├── assets/            # Static assets (images, etc.)
│   │   └── images/
│   ├── components/        # Reusable UI components
│   │   ├── detail/        # Hotel detail page components
│   │   └── [components]  # Main components
│   ├── pages/             # Page components
│   ├── routes/            # Routing configuration
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── PROJECT_STRUCTURE.md   # Project structure documentation
└── PRD_AceStayz_Website.md # Product requirements document
```

---

## 🚀 Entry Points

### `src/main.tsx`
- React application entry point
- Renders `App` component in React StrictMode
- Imports global CSS styles

### `src/App.tsx`
- Main application component
- Wraps `AppRouter` for routing

### `index.html`
- HTML template
- Root element: `<div id="root"></div>`

---

## 🗺️ Routing

### Router Configuration
**File:** `src/routes/AppRouter.tsx`

Uses React Router DOM `BrowserRouter` with the following routes:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `ComingSoonPage` | Default landing page (coming soon) |
| `/comingsoon` | `ComingSoonPage` | Coming soon page |
| `/home` | `HomePage` | Main homepage |
| `/main` | `HomePage` | Alternative homepage route |
| `/hotel/:slug` | `HotelDetailPage` | Hotel detail page with dynamic slug |

---

## 📄 Pages

### 1. ComingSoonPage
**File:** `src/pages/ComingSoonPage.tsx`

- **Purpose:** Landing page shown while site is under development
- **Features:**
  - Animated fade-in entrance
  - Feature cards (Smooth Booking, Exclusive Offers, Premium Comfort)
  - Brand messaging with blue accent color (#4B9CD3)
  - Responsive design

### 2. HomePage
**File:** `src/pages/HomePage.tsx`

- **Purpose:** Main homepage showcasing hotels and features
- **Components Used:**
  - `Navigation`
  - `HeroSection`
  - `ShuffleHero`
  - `MouseImageTrailHero`
  - `HotelShowcase`
  - `FeaturesShowcase`
  - `BentoGridShowcase`
  - `Footer`

### 3. HotelDetailPage
**File:** `src/pages/HotelDetailPage.tsx`

- **Purpose:** Detailed view of individual hotel properties
- **Features:**
  - Hero image slider with auto-rotation
  - Summary bar with hotel name, rating, location
  - Date picker for check-in/check-out
  - Tab navigation (Rooms, Amenities, Reviews, Location, Highlights, FAQs)
  - Gallery bottom sheet
  - Calendar bottom sheet
  - Room grid display
  - Amenities grid
  - Reviews carousel
  - Location information
  - FAQ section
  - Related hotels showcase

---

## 🧩 Components

### Main Components (`src/components/`)

#### 1. Navigation
**File:** `src/components/Navigation.tsx`

- **Features:**
  - Fixed top navigation with backdrop blur
  - Responsive mobile hamburger menu
  - Hotels dropdown with city listings (10 cities)
  - Desktop and mobile navigation links
  - Login/Join CTA button
  - City cards with images and hover effects

**Cities Listed:**
- Noida, Delhi, Gurugram, Jaipur, Goa, Bangalore, Chennai, Hyderabad, Mumbai, Pune

#### 2. HeroSection
**File:** `src/components/HeroSection.tsx`

- **Features:**
  - Full-screen hero with background image
  - Gradient overlay
  - Main headline: "Premium Accommodation, hello acestayz"
  - Search bar functionality
  - Call-to-action elements
  - Responsive layout

#### 3. ShuffleHero
**File:** `src/components/ShuffleHero.tsx`

- **Purpose:** Animated hero section with shuffling content

#### 4. MouseImageTrailHero
**File:** `src/components/MouseImageTrailHero.tsx`

- **Purpose:** Interactive hero with mouse trail image effects

#### 5. HotelShowcase
**File:** `src/components/HotelShowcase.tsx`

- **Purpose:** Displays featured hotels in a grid/carousel format

#### 6. FeaturesShowcase
**File:** `src/components/FeaturesShowcase.tsx`

- **Purpose:** Highlights key features and services

#### 7. BentoGridShowcase
**File:** `src/components/BentoGridShowcase.tsx`

- **Purpose:** Modern bento grid layout showcasing content

#### 8. Footer
**File:** `src/components/Footer.tsx`

- **Features:**
  - Brand section with logo
  - Quick Links (Why AceStayz?, Developers & Owners, Careers, Loyalty Program)
  - Support links (Contact Us, For the Press, In the Media, About Us)
  - Contact information (address, phone, email)
  - Social media links (Instagram, Twitter, YouTube, Facebook)
  - Footer bottom with copyright and legal links
  - Blue theme (#4B9CD3)

### Detail Page Components (`src/components/detail/`)

#### 1. Base.tsx
**Purpose:** Base components and utilities for detail pages
- `AnimatedInView` - Animation wrapper
- `GlassCard` - Glass morphism card component
- `PrimaryButton` - Primary action button
- `Section` - Section wrapper component

#### 2. RoomsGrid.tsx
**Purpose:** Displays available room types in a grid
- Room cards with images
- Room details (guests, area)
- Pricing with discounts
- Book button

#### 3. AmenitiesGrid.tsx
**Purpose:** Shows hotel amenities in a grid layout

#### 4. ReviewsCarousel.tsx
**Purpose:** Customer reviews carousel/slider

#### 5. LocationAbout.tsx
**Purpose:** Location information and nearby attractions

#### 6. FAQ.tsx
**Purpose:** Frequently asked questions section

#### 7. OtherHotelsGrid.tsx
**Purpose:** Related/similar hotels grid

#### 8. BottomSheetGallery.tsx
**Purpose:** Fullscreen gallery bottom sheet modal
- Image sections (Rooms, Lobby, Dining, Exterior)
- Swipeable image gallery

#### 9. BottomSheetCalendar.tsx
**Purpose:** Date picker bottom sheet modal
- Check-in/check-out date selection
- Calendar interface

---

## 🎨 Styling & Configuration

### Tailwind CSS Configuration
**File:** `tailwind.config.js`

**Custom Colors:**
- `terracotta`: #A0523D
- `cream`: #F5F0E6
- `charcoal`: #333333
- `gold-dust`: #D4AF37
- `blush-pink`: #EEC9C5

**Custom Fonts:**
- `serif`: Georgia, Times New Roman, serif
- `sans`: System fonts stack

**Primary Brand Color:** `#4B9CD3` (Blue) - Used throughout the application

### Global Styles
**File:** `src/index.css`

**Custom Animations:**
- `fade-in-up` - Fade in with upward motion
- `float` - Floating animation
- `marbled-transition` - Marbled gradient transition

**Custom Classes:**
- `.bg-terracotta-texture` - Terracotta clay texture background
- `.bg-cream-texture` - Cream fabric grain texture
- `.marbled-gradient` - Marbled gradient effect
- `.btn-gold-dust` - Gold dust button with hover effects
- `.text-serif-elegant` - Elegant serif text styling
- `.text-gold-highlight` - Gold highlight text

### Vite Configuration
**File:** `vite.config.ts`

- React plugin enabled
- PostCSS configuration
- Server host: `0.0.0.0` (accessible on network)
- Allowed hosts: `acestayz.com`, `www.acestayz.com`

### TypeScript Configuration
**File:** `tsconfig.json`

- Target: ES2020
- Module: ESNext
- JSX: react-jsx
- Strict mode enabled
- No unused locals/parameters

---

## 📦 Dependencies

### Production Dependencies

```json
{
  "framer-motion": "^11.18.2",      // Animations
  "lenis": "^1.3.11",                // Smooth scrolling
  "react": "^18.2.0",                // UI library
  "react-dom": "^18.2.0",            // React DOM
  "react-icons": "^5.5.0",           // Icon library
  "react-router-dom": "^7.9.4"       // Routing
}
```

### Development Dependencies

```json
{
  "@types/react": "^18.2.66",
  "@types/react-dom": "^18.2.22",
  "@typescript-eslint/eslint-plugin": "^7.2.0",
  "@typescript-eslint/parser": "^7.2.0",
  "@vitejs/plugin-react": "^4.2.1",
  "autoprefixer": "^10.4.16",
  "eslint": "^8.57.0",
  "eslint-plugin-react-hooks": "^4.6.0",
  "eslint-plugin-react-refresh": "^0.4.6",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.4.0",
  "typescript": "^5.2.2",
  "vite": "^5.2.0"
}
```

---

## ✨ Key Features

### Implemented Features

1. **Responsive Navigation**
   - Mobile hamburger menu
   - Desktop dropdown menus
   - City-based hotel browsing

2. **Hero Sections**
   - Multiple hero variants (standard, shuffle, mouse trail)
   - Search functionality
   - Call-to-action buttons

3. **Hotel Showcase**
   - Grid/carousel layouts
   - Hotel cards with images
   - Quick booking access

4. **Hotel Detail Pages**
   - Image galleries with bottom sheets
   - Date picker for bookings
   - Room listings
   - Amenities display
   - Reviews carousel
   - Location information
   - FAQ section

5. **Animations**
   - Framer Motion animations
   - Custom CSS animations
   - Scroll-triggered animations
   - Hover effects

6. **UI Components**
   - Glass morphism cards
   - Bottom sheet modals
   - Tab navigation
   - Image sliders
   - Bento grid layouts

### Design Patterns

1. **Component Architecture**
   - Functional components with TypeScript
   - Reusable base components
   - Composition over inheritance

2. **State Management**
   - Local state with `useState`
   - URL-based state with React Router
   - No global state management library

3. **Styling Approach**
   - Tailwind utility classes
   - Custom CSS for complex animations
   - Responsive design (mobile-first)

4. **Code Organization**
   - Feature-based component grouping
   - Separate detail page components
   - Clear separation of concerns

---

## 🚦 Available Scripts

```bash
npm run dev      # Start development server (host: 0.0.0.0)
npm run build    # Build for production (TypeScript check + Vite build)
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm start        # Preview with host 0.0.0.0
```

---

## 📝 Code Style Guidelines

### Component Naming
- PascalCase for components: `Navigation.tsx`, `HeroSection.tsx`
- Descriptive names: `BottomSheetCalendar.tsx`, `ReviewsCarousel.tsx`

### File Organization
- Components in `src/components/`
- Pages in `src/pages/`
- Routes in `src/routes/`
- Detail page components in `src/components/detail/`

### TypeScript Usage
- All components typed with `React.FC`
- Props interfaces defined inline or separately
- Strict mode enabled

### Styling Conventions
- Tailwind classes preferred
- Custom CSS for complex animations
- Inline styles for dynamic values (e.g., colors, images)

---

## 🔍 Key Files Reference

| File | Purpose |
|------|---------|
| `src/main.tsx` | Application entry point |
| `src/App.tsx` | Main app wrapper |
| `src/routes/AppRouter.tsx` | Route configuration |
| `src/pages/HomePage.tsx` | Homepage component |
| `src/pages/HotelDetailPage.tsx` | Hotel detail page |
| `src/components/Navigation.tsx` | Main navigation |
| `src/components/Footer.tsx` | Footer component |
| `tailwind.config.js` | Tailwind configuration |
| `vite.config.ts` | Vite build configuration |
| `tsconfig.json` | TypeScript configuration |

---

## 🎯 Future Enhancements (From PRD)

### Planned Features
- [ ] User authentication system
- [ ] Booking functionality
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] API integration
- [ ] State management (Redux/Zustand)
- [ ] Testing setup (Jest/React Testing Library)
- [ ] CI/CD pipeline

### Content Pages Needed
- [ ] About Us page
- [ ] Franchise Partner page
- [ ] Career page
- [ ] Contact page
- [ ] Property listing pages by city

---

## 📚 Additional Documentation

- **README.md** - Basic project setup and getting started
- **PROJECT_STRUCTURE.md** - Detailed project structure documentation
- **PRD_AceStayz_Website.md** - Complete product requirements document

---

**Note:** This index provides a comprehensive overview of the codebase structure. For specific implementation details, refer to individual component files and the PRD document.





