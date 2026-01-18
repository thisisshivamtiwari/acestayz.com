import React, { useState } from 'react'
import {
 
  FiDollarSign,
  FiMapPin,
 
  FiTrendingUp,
  FiChevronDown,
  FiHome
} from 'react-icons/fi'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Line Chart Component using Chart.js
interface LineChartProps {
  data: number[]
  labels: string[]
  title: string
  color?: string
  yAxisLabel?: string
  formatYValue?: (value: number) => string
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  title,
  color = '#4B9CD3',
  yAxisLabel,
  formatYValue
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        borderColor: color,
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D } }) => {
          const ctx = context.chart.ctx
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, color + '80') // 50% opacity
          gradient.addColorStop(1, color + '05') // 5% opacity
          return gradient
        },
        fill: true,
        tension: 0.4, // Smooth curves
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: color,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        displayColors: false,
        callbacks: {
          label: function (context: TooltipItem<'line'>) {
            const yValue = context.parsed.y
            if (yValue === null || yValue === undefined) {
              return ''
            }
            const value = formatYValue ? formatYValue(yValue) : yValue.toString()
            return `${title}: ${value}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        border: {
          display: true,
          color: '#E5E7EB'
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal' as const
          }
        }
      },
      y: {
        beginAtZero: false,
        grid: {
          color: '#F3F4F6',
          drawBorder: false,
          lineWidth: 1,
          dash: [4, 4]
        },
        border: {
          display: true,
          color: '#E5E7EB'
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'normal' as const
          },
          callback: function (value: number | string) {
            if (typeof value === 'number') {
              return formatYValue ? formatYValue(value) : value.toString()
            }
            return value
          },
          padding: 10
        },
        title: {
          display: !!yAxisLabel,
          text: yAxisLabel,
          color: '#9CA3AF',
          font: {
            size: 11,
            weight: 'normal' as const
          },
          padding: {
            top: 10,
            bottom: 10
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const
    }
  }

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="relative" style={{ height: '240px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  )
}

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last Month')
  const [selectedPortfolio, setSelectedPortfolio] = useState('All Properties')
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false)
  const [showPortfolioDropdown, setShowPortfolioDropdown] = useState(false)

  // KPI Data
  const kpiData = {
    totalRevenue: {
      value: '₹12,45,678',
      change: '+8.2%',
      changeLabel: 'vs last month',
      trend: 'up'
    },
    todayRevenue: {
      value: '₹32,450',
      change: '+12%',
      changeLabel: 'vs yesterday',
      trend: 'up'
    },
    occupancy: {
      value: '78%',
      label: 'Avg this month'
    },
    activeUnits: {
      value: '24',
      label: 'Rooms live this month'
    }
  }

  // Chart Data - More realistic and accurate
  const revenueTrendData = [20, 28, 35, 42, 50, 48] // Revenue in thousands
  const revenueTrendLabels = ['5', '8', '16', '21', '28', '25']

  const occupancyTrendData = [65, 70, 72, 75, 78, 76] // Occupancy percentage
  const occupancyTrendLabels = ['26', '26', '26', '27', '27', '35']

  // Format revenue values with 'K' suffix
  const formatRevenue = (value: number) => `${value}K`

  // Format occupancy with percentage
  const formatOccupancy = (value: number) => `${value}%`

  // Properties Data
  const properties = [
    {
      id: '1',
      hotel: 'Ace Stayz Noida - Tower A',
      city: 'Noida',
      rooms: 20,
      todayOcc: 85,
      mtdRevenue: '₹4,20,000',
      status: 'Live'
    },
    {
      id: '2',
      hotel: 'Ace Stayz Gurugram',
      city: 'Gurugram',
      rooms: 18,
      todayOcc: 72,
      mtdRevenue: '₹3,10,000',
      status: 'Direct'
    },
    {
      id: '3',
      hotel: 'Ace Stayz Jaipur - Mi Road',
      city: 'Jaipur',
      rooms: 24,
      todayOcc: 58,
      mtdRevenue: '₹3,15,000',
      status: 'Live'
    }
  ]

  // Recent Bookings Data
  const recentBookings = [
    {
      id: '1',
      guest: 'John Doe',
      hotel: 'Ace Stayz Noida',
      checkIn: '2024-04-15',
      checkOut: '2024-04-18',
      amount: '₹9,760',
      channel: 'Booking.com'
    },
    {
      id: '2',
      guest: 'Jane Smith',
      hotel: 'Ace Stayz Gurugram',
      checkIn: '2024-04-14',
      checkOut: '2024-04-17',
      amount: '₹10,800',
      channel: 'Direct'
    },
    {
      id: '3',
      guest: 'Michael Brown',
      hotel: 'Ace Stayz Jaipur',
      checkIn: '2024-04-13',
      checkOut: '2024-04-15',
      amount: '₹7,000',
      channel: 'Airbnb'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      Live: 'bg-green-100 text-green-800',
      Direct: 'bg-blue-100 text-blue-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Cancelled: 'bg-red-100 text-red-800'
    }
    return styles[status as keyof typeof styles] || styles.Pending
  }

  const getChannelBadge = (channel: string) => {
    const styles = {
      'Booking.com': 'bg-blue-50 text-blue-700 border border-blue-200',
      Direct: 'bg-green-50 text-green-700 border border-green-200',
      Airbnb: 'bg-pink-50 text-pink-700 border border-pink-200',
      'MakeMyTrip': 'bg-orange-50 text-orange-700 border border-orange-200'
    }
    return styles[channel as keyof typeof styles] || 'bg-gray-50 text-gray-700 border border-gray-200'
  }

  const periods = ['Today', 'This Week', 'Last Month', 'Last 3 Months', 'Last 6 Months', 'This Year']
  const portfolios = ['All Properties', 'Ace Stayz Noida', 'Ace Stayz Gurugram', 'Ace Stayz Jaipur']

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dastanse</h1>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          {/* Period Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPeriodDropdown(!showPeriodDropdown)
                setShowPortfolioDropdown(false)
              }}
              className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors duration-200 hover:bg-gray-50"
            >
              {selectedPeriod}
              <FiChevronDown className="w-4 h-4" />
            </button>
            {showPeriodDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowPeriodDropdown(false)}
                />
                <div className="absolute right-0 z-20 py-2 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg">
                  {periods.map((period) => (
                    <button
                      key={period}
                      onClick={() => {
                        setSelectedPeriod(period)
                        setShowPeriodDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        selectedPeriod === period ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Portfolio Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPortfolioDropdown(!showPortfolioDropdown)
                setShowPeriodDropdown(false)
              }}
              className="flex gap-2 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 transition-colors duration-200 hover:bg-gray-50"
            >
              Portfolio: {selectedPortfolio}
              <FiChevronDown className="w-4 h-4" />
            </button>
            {showPortfolioDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowPortfolioDropdown(false)}
                />
                <div className="absolute right-0 z-20 py-2 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg">
                  {portfolios.map((portfolio) => (
                    <button
                      key={portfolio}
                      onClick={() => {
                        setSelectedPortfolio(portfolio)
                        setShowPortfolioDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                        selectedPortfolio === portfolio ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {portfolio}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <FiDollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <p className="mb-2 text-2xl font-bold text-gray-900">{kpiData.totalRevenue.value}</p>
          <div className="flex gap-1 items-center">
            <FiTrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">{kpiData.totalRevenue.change}</span>
            <span className="text-sm text-gray-500">{kpiData.totalRevenue.changeLabel}</span>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
            <FiDollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <p className="mb-2 text-2xl font-bold text-gray-900">{kpiData.todayRevenue.value}</p>
          <div className="flex gap-1 items-center">
            <FiTrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-600">{kpiData.todayRevenue.change}</span>
            <span className="text-sm text-gray-500">{kpiData.todayRevenue.changeLabel}</span>
          </div>
        </div>

        {/* Occupancy */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-600">Occupancy</p>
            <FiHome className="w-5 h-5 text-gray-400" />
          </div>
          <p className="mb-2 text-2xl font-bold text-gray-900">{kpiData.occupancy.value}</p>
          <p className="text-sm text-gray-500">{kpiData.occupancy.label}</p>
        </div>

        {/* Active Units */}
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-gray-600">Active Units</p>
            <FiMapPin className="w-5 h-5 text-gray-400" />
          </div>
          <p className="mb-2 text-2xl font-bold text-gray-900">{kpiData.activeUnits.value}</p>
          <p className="text-sm text-gray-500">{kpiData.activeUnits.label}</p>
        </div>
      </div>

      {/* Trend Graphs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <LineChart
          data={revenueTrendData}
          labels={revenueTrendLabels}
          title="Revenue Trend"
          color="#4B9CD3"
          yAxisLabel="Revenue (₹K)"
          formatYValue={formatRevenue}
        />
        <LineChart
          data={occupancyTrendData}
          labels={occupancyTrendLabels}
          title="Occupancy Trend"
          color="#10B981"
          yAxisLabel="Occupancy (%)"
          formatYValue={formatOccupancy}
        />
      </div>

      {/* My Properties Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Properties</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  HOTEL
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  CITY
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  ROOMS
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  TODAY OCC.
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  MTD REVENUE
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id} className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.hotel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{property.rooms}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{property.todayOcc}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{property.mtdRevenue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                        property.status
                      )}`}
                    >
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  GUEST
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  HOTEL
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  CHECK-IN
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  CHECK-OUT
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  AMOUNT
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  CHANNEL
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="transition-colors duration-200 hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{booking.guest}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.hotel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.checkIn}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.checkOut}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{booking.amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelBadge(
                        booking.channel
                      )}`}
                    >
                      {booking.channel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 border-t border-gray-200">
          <a
            href="/admin/bookings"
            className="text-sm font-medium"
            style={{ color: '#4B9CD3' }}
          >
            View all bookings +
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
