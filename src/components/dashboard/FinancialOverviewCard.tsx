import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUserData, TimeFrame } from '../../context/UserDataContext'

interface FinancialOverviewCardProps {
  title: string
  type: 'balance' | 'income' | 'expenses' | 'savingsRatio'
  icon: React.ReactNode
}

const FinancialOverviewCard = ({ title, type, icon }: FinancialOverviewCardProps) => {
  const { financialData, timeFrame, setTimeFrame } = useUserData()
  const [isOpen, setIsOpen] = useState(false)

  const formatValue = (value: number, type: string) => {
    if (type === 'savingsRatio') {
      return `${(value * 100).toFixed(0)}%`
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getValue = () => {
    switch (type) {
      case 'balance':
        return financialData[timeFrame].balance
      case 'income':
        return financialData[timeFrame].income
      case 'expenses':
        return financialData[timeFrame].expenses
      case 'savingsRatio':
        return financialData[timeFrame].savingsRatio
      default:
        return 0
    }
  }

  const getColor = () => {
    switch (type) {
      case 'balance':
        return 'text-primary-600 dark:text-primary-400'
      case 'income':
        return 'text-success dark:text-green-400'
      case 'expenses':
        return 'text-danger dark:text-red-400'
      case 'savingsRatio':
        return 'text-secondary-600 dark:text-secondary-400'
      default:
        return 'text-gray-800 dark:text-gray-200'
    }
  }

  const timeFrameOptions: { label: string; value: TimeFrame }[] = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Year to Date', value: 'yearly' },
  ]

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card relative"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`p-3 rounded-lg ${getColor()} bg-opacity-10`}>
            {icon}
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
            <p className={`text-2xl font-bold ${getColor()}`}>
              {formatValue(getValue(), type)}
            </p>
          </div>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Change time frame"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700"
              >
                <div className="py-1">
                  {timeFrameOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setTimeFrame(option.value)
                        setIsOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        timeFrame === option.value
                          ? 'bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default FinancialOverviewCard
