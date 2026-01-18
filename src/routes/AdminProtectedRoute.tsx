import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { isAdminAuthenticated } from '../utils/adminAuth'

interface AdminProtectedRouteProps {
  children: React.ReactNode
}

/**
 * Protected Route Component for Admin Pages
 * Redirects to login if not authenticated
 */
const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const location = useLocation()
  const isAuthenticated = isAdminAuthenticated()

  if (!isAuthenticated) {
    // Redirect to login with return path
    return <Navigate to="/panel/admin/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default AdminProtectedRoute

