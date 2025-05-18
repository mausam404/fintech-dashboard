import { useState } from 'react'
import { useUserData } from '../../context/UserDataContext'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const IncomeExpenseChart = () => {
  const { incomeVsExpensesData } = useUserData()
  const [hoveredData, setHoveredData] = useState<{ income: number; expenses: number } | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium text-gray-800 dark:text-white">{label}</p>
          <div className="flex flex-col mt-2 space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Income: {formatCurrency(payload[0].value)}
              </p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-danger mr-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Expenses: {formatCurrency(payload[1].value)}
              </p>
            </div>
            <div className="flex items-center pt-1 border-t border-gray-200 dark:border-gray-700 mt-1">
              <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">
                Savings: {formatCurrency(payload[0].value - payload[1].value)}
              </p>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const handleMouseMove = (data: any) => {
    if (data && data.activePayload) {
      const { income, expenses } = data.activePayload[0].payload
      setHoveredData({ income, expenses })
    }
  }

  const handleMouseLeave = () => {
    setHoveredData(null)
  }

  return (
    <div className="card h-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Income vs Expenses</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-danger mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={incomeVsExpensesData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="income" 
              stroke="#0ea5e9" 
              fillOpacity={1} 
              fill="url(#colorIncome)" 
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone" 
              dataKey="expenses" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorExpenses)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default IncomeExpenseChart
