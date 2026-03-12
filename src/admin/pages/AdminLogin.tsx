import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiKey } from 'react-icons/fi'
import logoImage from '../../assets/images/logo.svg'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, isAuthenticated } = useAdminAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const success = await login(email, password)
      
      if (success) {
        navigate('/admin', { replace: true })
      } else {
        setError('Invalid email or password. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex overflow-hidden relative justify-center items-center px-4 py-12 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="overflow-hidden absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full opacity-30 mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-200 rounded-full opacity-30 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="grid relative z-10 grid-cols-1 gap-8 w-full max-w-5xl lg:grid-cols-2">
        {/* Left Side - Branding */}
        <div className="hidden flex-col justify-center items-start px-8 space-y-8 lg:flex">
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <div className="relative">
                <img 
                  src={logoImage} 
                  alt="AceStayz Logo" 
                  className="object-contain w-auto h-20 rounded-lg"
                />
              </div>
              <div>
         
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <h2 className="text-3xl font-bold leading-tight text-gray-900">
                All Stayz<br />
                <span className="text-blue-600">in One Place</span>
              </h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Manage your premium accommodations, bookings, and guests from a single, powerful dashboard.
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 gap-4 pt-4">
            <div className="flex gap-3 items-start p-4 rounded-xl border backdrop-blur-sm bg-white/60 border-white/20">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiShield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Access</h3>
                <p className="text-sm text-gray-600">Enterprise-grade security for your admin operations</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-4 rounded-xl border backdrop-blur-sm bg-white/60 border-white/20">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiKey className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Full Control</h3>
                <p className="text-sm text-gray-600">Manage hotels, bookings, and users effortlessly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-8 text-center lg:hidden">
              <div className="inline-flex flex-col gap-3 items-center mb-4">
                <img 
                  src={logoImage} 
                  alt="AceStayz Logo" 
                  className="object-contain w-auto h-16 rounded-lg"
                />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                All Stayz <span className="text-blue-600">in One Place</span>
              </h2>
            </div>

            {/* Login Card */}
            <div className="p-8 rounded-2xl border shadow-2xl backdrop-blur-lg bg-white/80 border-white/20">
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Welcome Back</h3>
                <p className="text-gray-600">Sign in to continue to your admin dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="flex gap-2 items-center px-4 py-3 text-sm text-red-700 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <span className="text-red-500">⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                      <FiMail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="block w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="admin@acestayz.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-4 pointer-events-none">
                      <FiLock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="block w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Enter your password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex absolute inset-y-0 right-0 items-center pr-4 text-gray-400 transition-colors duration-200 hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{ 
                    background: 'linear-gradient(135deg, #4B9CD3 0%, #3B82F6 100%)',
                    boxShadow: '0 10px 25px rgba(75, 156, 211, 0.3)'
                  }}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="mr-3 -ml-1 w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="pt-6 mt-6 border-t border-gray-200">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="mb-2 text-xs font-semibold text-center text-blue-900">Demo Credentials</p>
                  <div className="flex gap-4 justify-center items-center text-xs">
                    <div className="flex gap-1 items-center">
                      <FiMail className="text-blue-600" />
                      <span className="font-mono text-gray-700">admin@acestayz.com</span>
                    </div>
                    <span className="text-gray-400">/</span>
                    <div className="flex gap-1 items-center">
                      <FiLock className="text-blue-600" />
                      <span className="font-mono text-gray-700">admin123</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-sm text-center text-gray-500">
              © 2025 AceStayz. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default AdminLogin

