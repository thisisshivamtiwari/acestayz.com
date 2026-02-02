import React from 'react'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ShuffleHero from '../components/ShuffleHero'
import MouseImageTrailHero from '../components/MouseImageTrailHero'
import HotelShowcase from '../components/HotelShowcase'
import FeaturesShowcase from '../components/FeaturesShowcase'
import BrainsBehindSection from '../components/BrainsBehindSection'
import BentoGridShowcase from '../components/BentoGridShowcase'
import MembershipCardStrip from '../components/MembershipCardStrip'
import Footer from '../components/Footer'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MembershipCardStrip />
      <ShuffleHero />
      <MouseImageTrailHero />
      <HotelShowcase />
      <FeaturesShowcase />
      <BrainsBehindSection />
      <BentoGridShowcase />
      <Footer />
    </div>
  )
}

export default HomePage
