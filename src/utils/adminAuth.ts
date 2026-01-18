/**
 * Admin Authentication Utilities
 * Handles admin token storage and validation
 */

const ADMIN_TOKEN_KEY = 'adminToken'

/**
 * Save admin token to localStorage
 */
export const saveAdminToken = (token: string): void => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token)
}

/**
 * Get admin token from localStorage
 */
export const getAdminToken = (): string | null => {
  return localStorage.getItem(ADMIN_TOKEN_KEY)
}

/**
 * Remove admin token from localStorage
 */
export const removeAdminToken = (): void => {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
}

/**
 * Check if admin is authenticated
 */
export const isAdminAuthenticated = (): boolean => {
  const token = getAdminToken()
  return token !== null && token !== ''
}

/**
 * Dummy login function - validates credentials and returns token
 */
export const adminLogin = (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Dummy credentials check
      if (email === 'admin@acestayz.com' && password === 'admin123') {
        const token = 'dummy_admin_token_' + Date.now()
        resolve(token)
      } else {
        reject(new Error('Invalid email or password'))
      }
    }, 1000)
  })
}


