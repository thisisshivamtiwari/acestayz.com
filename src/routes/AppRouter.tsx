import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import HotelDetailPage from '../pages/HotelDetailPage'

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel/:slug" element={<HotelDetailPage />} />
      </Routes>
    </Router>
  )
}

export default AppRouter
