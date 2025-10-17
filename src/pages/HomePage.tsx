import React from 'react'
import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
    </div>
  )
}

export default HomePage
