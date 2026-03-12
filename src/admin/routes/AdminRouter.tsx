import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminAuthProvider } from '../context/AdminAuthContext'
import AdminLayout from '../components/AdminLayout'
import AdminDashboard from '../pages/AdminDashboard'
import AdminLogin from '../pages/AdminLogin'
import ProtectedRoute from '../components/ProtectedRoute'

const AdminRouter: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </AdminAuthProvider>
  )
}

export default AdminRouter

