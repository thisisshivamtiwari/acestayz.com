// Admin types and interfaces

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'super_admin' | 'manager'
  avatar?: string
}

export interface AdminMenuItem {
  id: string
  label: string
  icon: React.ReactNode
  path: string
  children?: AdminMenuItem[]
}

export interface AdminStats {
  totalBookings: number
  totalRevenue: number
  totalHotels: number
  totalUsers: number
  pendingBookings: number
  activeHotels: number
}



