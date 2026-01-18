import React, { useState } from 'react'
import {
  FiSave,
  FiGlobe,
  FiMail,
  FiBell,
  FiCreditCard,
  FiShield,
  FiImage,
  FiInfo,
  FiTool,
  FiDatabase,
  FiRefreshCw,
  FiTrash2,
  FiDownload
} from 'react-icons/fi'

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'notifications' | 'payment' | 'security' | 'appearance' | 'maintenance'>('general')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'AceStayz',
    siteDescription: 'Premium Accommodation, hello acestayz',
    siteUrl: 'https://acestayz.com',
    contactEmail: 'info@acestayz.com',
    contactPhone: '+91 70113 15545',
    address: 'Noida, Uttar Pradesh',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    language: 'en'
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    fromEmail: 'noreply@acestayz.com',
    fromName: 'AceStayz',
    bookingConfirmationTemplate: 'Your booking has been confirmed!',
    bookingCancellationTemplate: 'Your booking has been cancelled.',
    passwordResetTemplate: 'Click here to reset your password.'
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    newBookingAlert: true,
    bookingCancellationAlert: true,
    paymentReceivedAlert: true,
    newUserRegistrationAlert: false
  })

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    paymentGateway: 'razorpay',
    razorpayKeyId: '',
    razorpayKeySecret: '',
    stripePublishableKey: '',
    stripeSecretKey: '',
    paypalClientId: '',
    paypalClientSecret: '',
    enableTestMode: false,
    defaultCurrency: 'INR'
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordMinLength: '8',
    requireStrongPassword: true,
    enableLoginAlerts: true,
    maxLoginAttempts: '5'
  })

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#4B9CD3',
    logoUrl: '',
    faviconUrl: '',
    theme: 'light',
    enableDarkMode: false
  })

  // Maintenance Settings
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    maintenanceMode: false,
    maintenanceMessage: 'We are currently performing scheduled maintenance. We will be back shortly.',
    enableAutoBackup: true,
    backupFrequency: 'daily',
    lastBackup: '2024-04-15 10:30 AM',
    enableCache: true,
    cacheExpiry: '24',
    enableLogs: true,
    logRetentionDays: '30'
  })

  const showSaveMessage = (message: string) => {
    setSaveMessage(message)
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const handleSave = () => {
    // Here you would typically save to backend/localStorage
    // For now, just show a success message
    showSaveMessage('Settings saved successfully!')
  }

  const tabs = [
    { id: 'general', label: 'General', icon: <FiGlobe className="w-4 h-4" /> },
    { id: 'email', label: 'Email', icon: <FiMail className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <FiBell className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment', icon: <FiCreditCard className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <FiShield className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <FiImage className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Maintenance', icon: <FiTool className="w-4 h-4" /> }
  ]

  const handleClearCache = () => {
    if (window.confirm('Are you sure you want to clear all cache? This may temporarily slow down the application.')) {
      showSaveMessage('Cache cleared successfully!')
    }
  }

  const handleBackupNow = () => {
    showSaveMessage('Backup initiated. This may take a few minutes...')
    // Simulate backup
    setTimeout(() => {
      setMaintenanceSettings({ ...maintenanceSettings, lastBackup: new Date().toLocaleString() })
      showSaveMessage('Backup completed successfully!')
    }, 2000)
  }

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      showSaveMessage('Logs cleared successfully!')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your application settings and preferences</p>
        </div>
        {saveMessage && (
          <div className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg">
            {saveMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Site Name</label>
                      <input
                        type="text"
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Site Description</label>
                      <textarea
                        value={generalSettings.siteDescription}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Site URL</label>
                      <input
                        type="url"
                        value={generalSettings.siteUrl}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, siteUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Contact Email</label>
                        <input
                          type="email"
                          value={generalSettings.contactEmail}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Contact Phone</label>
                        <input
                          type="tel"
                          value={generalSettings.contactPhone}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        value={generalSettings.address}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Timezone</label>
                        <select
                          value={generalSettings.timezone}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, timezone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Asia/Kolkata">Asia/Kolkata</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New_York</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Currency</label>
                        <select
                          value={generalSettings.currency}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, currency: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="INR">INR (₹)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Language</label>
                        <select
                          value={generalSettings.language}
                          onChange={(e) => setGeneralSettings({ ...generalSettings, language: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Configuration</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">SMTP Host</label>
                        <input
                          type="text"
                          value={emailSettings.smtpHost}
                          onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">SMTP Port</label>
                        <input
                          type="text"
                          value={emailSettings.smtpPort}
                          onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">SMTP Username</label>
                        <input
                          type="text"
                          value={emailSettings.smtpUsername}
                          onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">SMTP Password</label>
                        <input
                          type="password"
                          value={emailSettings.smtpPassword}
                          onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">From Email</label>
                        <input
                          type="email"
                          value={emailSettings.fromEmail}
                          onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">From Name</label>
                        <input
                          type="text"
                          value={emailSettings.fromName}
                          onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Booking Confirmation</label>
                          <textarea
                            value={emailSettings.bookingConfirmationTemplate}
                            onChange={(e) => setEmailSettings({ ...emailSettings, bookingConfirmationTemplate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Booking Cancellation</label>
                          <textarea
                            value={emailSettings.bookingCancellationTemplate}
                            onChange={(e) => setEmailSettings({ ...emailSettings, bookingCancellationTemplate: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive notifications via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, emailNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) => setNotificationSettings({ ...notificationSettings, smsNotifications: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Types</h3>
                      <div className="space-y-3">
                        {[
                          { key: 'newBookingAlert', label: 'New Booking Alert' },
                          { key: 'bookingCancellationAlert', label: 'Booking Cancellation Alert' },
                          { key: 'paymentReceivedAlert', label: 'Payment Received Alert' },
                          { key: 'newUserRegistrationAlert', label: 'New User Registration Alert' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">{item.label}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                                onChange={(e) => setNotificationSettings({ ...notificationSettings, [item.key]: e.target.checked })}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Settings */}
            {activeTab === 'payment' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Gateway Configuration</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Payment Gateway</label>
                      <select
                        value={paymentSettings.paymentGateway}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, paymentGateway: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="razorpay">Razorpay</option>
                        <option value="stripe">Stripe</option>
                        <option value="paypal">PayPal</option>
                      </select>
                    </div>
                    {paymentSettings.paymentGateway === 'razorpay' && (
                      <>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Razorpay Key ID</label>
                          <input
                            type="text"
                            value={paymentSettings.razorpayKeyId}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeyId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="rzp_test_..."
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Razorpay Key Secret</label>
                          <input
                            type="password"
                            value={paymentSettings.razorpayKeySecret}
                            onChange={(e) => setPaymentSettings({ ...paymentSettings, razorpayKeySecret: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                          />
                        </div>
                      </>
                    )}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Test Mode</h3>
                        <p className="text-sm text-gray-600">Enable test mode for payment gateway</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentSettings.enableTestMode}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, enableTestMode: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Security Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                        <input
                          type="number"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Max Login Attempts</label>
                        <input
                          type="number"
                          value={securitySettings.maxLoginAttempts}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, maxLoginAttempts: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password Min Length</label>
                        <input
                          type="number"
                          value={securitySettings.passwordMinLength}
                          onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">Require Strong Password</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={securitySettings.requireStrongPassword}
                            onChange={(e) => setSecuritySettings({ ...securitySettings, requireStrongPassword: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === 'appearance' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Appearance Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Primary Color</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          value={appearanceSettings.primaryColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                          className="h-10 w-20 rounded-lg border border-gray-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={appearanceSettings.primaryColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#4B9CD3"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Logo URL</label>
                      <input
                        type="url"
                        value={appearanceSettings.logoUrl}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, logoUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Favicon URL</label>
                      <input
                        type="url"
                        value={appearanceSettings.faviconUrl}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, faviconUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/favicon.ico"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Theme</label>
                      <select
                        value={appearanceSettings.theme}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, theme: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Maintenance Settings */}
            {activeTab === 'maintenance' && (
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">System Maintenance</h2>
                  
                  {/* Maintenance Mode */}
                  <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                        <p className="text-sm text-gray-600">Enable maintenance mode to temporarily disable public access</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={maintenanceSettings.maintenanceMode}
                          onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, maintenanceMode: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                    {maintenanceSettings.maintenanceMode && (
                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Maintenance Message</label>
                        <textarea
                          value={maintenanceSettings.maintenanceMessage}
                          onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, maintenanceMessage: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>

                  {/* Database Backup */}
                  <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          <FiDatabase className="w-5 h-5 text-blue-600" />
                          Database Backup
                        </h3>
                        <p className="text-sm text-gray-600">Manage automatic backups and restore data</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Auto Backup</span>
                          <p className="text-xs text-gray-500">Automatically backup database</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={maintenanceSettings.enableAutoBackup}
                            onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, enableAutoBackup: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      {maintenanceSettings.enableAutoBackup && (
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Backup Frequency</label>
                          <select
                            value={maintenanceSettings.backupFrequency}
                            onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, backupFrequency: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="hourly">Hourly</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                      )}
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Last Backup</span>
                          <p className="text-xs text-gray-500">{maintenanceSettings.lastBackup}</p>
                        </div>
                        <button
                          onClick={handleBackupNow}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <FiDownload className="w-4 h-4" />
                          Backup Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cache Management */}
                  <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          <FiRefreshCw className="w-5 h-5 text-green-600" />
                          Cache Management
                        </h3>
                        <p className="text-sm text-gray-600">Manage application cache and performance</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Enable Cache</span>
                          <p className="text-xs text-gray-500">Improve performance with caching</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={maintenanceSettings.enableCache}
                            onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, enableCache: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      {maintenanceSettings.enableCache && (
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Cache Expiry (hours)</label>
                          <input
                            type="number"
                            value={maintenanceSettings.cacheExpiry}
                            onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, cacheExpiry: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            min="1"
                          />
                        </div>
                      )}
                      <button
                        onClick={handleClearCache}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <FiRefreshCw className="w-4 h-4" />
                        Clear All Cache
                      </button>
                    </div>
                  </div>

                  {/* Logs Management */}
                  <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center gap-2">
                          <FiInfo className="w-5 h-5 text-purple-600" />
                          System Logs
                        </h3>
                        <p className="text-sm text-gray-600">Manage application logs and monitoring</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Enable Logging</span>
                          <p className="text-xs text-gray-500">Record system events and errors</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={maintenanceSettings.enableLogs}
                            onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, enableLogs: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      {maintenanceSettings.enableLogs && (
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-700">Log Retention (days)</label>
                          <input
                            type="number"
                            value={maintenanceSettings.logRetentionDays}
                            onChange={(e) => setMaintenanceSettings({ ...maintenanceSettings, logRetentionDays: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            min="1"
                          />
                        </div>
                      )}
                      <button
                        onClick={handleClearLogs}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Clear All Logs
                      </button>
                    </div>
                  </div>

                  {/* System Information */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <FiInfo className="w-5 h-5 text-gray-600" />
                      System Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Application Version:</span>
                        <span className="ml-2 font-medium text-gray-900">v1.0.0</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Environment:</span>
                        <span className="ml-2 font-medium text-gray-900">Production</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Server Time:</span>
                        <span className="ml-2 font-medium text-gray-900">{new Date().toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Uptime:</span>
                        <span className="ml-2 font-medium text-gray-900">99.9%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FiSave className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

