import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import HotelDetailPage from '../pages/HotelDetailPage'
import StayDetailPage from '../pages/StayDetailPage'
import AboutPage from '../pages/AboutPage'
import FranchisePage from '../pages/FranchisePage'
import ComingSoonPage from '../pages/ComingSoonPage'
import AdminRouter from '../admin/routes/AdminRouter'
import ScrollToTop from '../components/ScrollToTop'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/franchise" element={<FranchisePage />} />
        <Route path="/comingsoon" element={<ComingSoonPage />} />
        <Route path="/location/:location" element={<StayDetailPage />} />
        <Route path="/hotel/:slug" element={<HotelDetailPage />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
