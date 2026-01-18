import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

interface AdminAuthContextType {
  adminUser: AdminUser | null
  adminToken: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const ADMIN_TOKEN_KEY = 'adminToken'
const ADMIN_USER_KEY = 'adminUser'

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [adminToken, setAdminToken] = useState<string | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Load admin token and user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY)
    const userStr = localStorage.getItem(ADMIN_USER_KEY)
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        setAdminToken(token)
        setAdminUser(user)
      } catch (error) {
        console.error('Error parsing admin user data:', error)
        localStorage.removeItem(ADMIN_TOKEN_KEY)
        localStorage.removeItem(ADMIN_USER_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // TODO: Replace with actual API call
      // For now, using mock authentication
      // In production, this should call your backend API
      
      // Mock admin credentials (remove in production)
      const mockAdminCredentials = {
        email: 'admin@acestayz.com',
        password: 'admin123'
      }

      if (email === mockAdminCredentials.email && password === mockAdminCredentials.password) {
        const token = `admin_token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        const user: AdminUser = {
          id: '1',
          email: email,
          name: 'Admin User',
          role: 'admin'
        }

        localStorage.setItem(ADMIN_TOKEN_KEY, token)
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user))
        
        setAdminToken(token)
        setAdminUser(user)
        
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    localStorage.removeItem(ADMIN_USER_KEY)
    setAdminToken(null)
    setAdminUser(null)
  }

  const value: AdminAuthContextType = {
    adminUser,
    adminToken,
    isAuthenticated: !!adminToken,
    login,
    logout,
    loading
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}



