import { useUserData } from '../context/UserDataContext'
import { motion } from 'framer-motion'

const Budget = () => {
  const { budgetData } = useUserData()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getProgressColor = (spent: number, budget: number) => {
    const ratio = spent / budget
    if (ratio < 0.7) return 'bg-success'
    if (ratio < 0.9) return 'bg-warning'
    return 'bg-danger'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Budget</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Track your spending against your monthly budget.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Adjust Budget</span>
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Budget</h2>
        
        <div className="space-y-6">
          {budgetData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="font-medium text-gray-800 dark:text-white">{item.category}</span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white">{formatCurrency(item.spent)}</span>
                  {' '}/{' '}
                  {formatCurrency(item.budget)}
                </div>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.spent / item.budget) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 + 0.2 }}
                  className={`h-full ${getProgressColor(item.spent, item.budget)}`}
                ></motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{((item.spent / item.budget) * 100).toFixed(0)}% used</span>
                <span>{formatCurrency(item.budget - item.spent)} remaining</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Budget Summary</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Total Budget</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {formatCurrency(budgetData.reduce((sum, item) => sum + item.budget, 0))}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Total Spent</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {formatCurrency(budgetData.reduce((sum, item) => sum + item.spent, 0))}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Remaining</span>
              <span className="font-medium text-success dark:text-green-400">
                {formatCurrency(
                  budgetData.reduce((sum, item) => sum + (item.budget - item.spent), 0)
                )}
              </span>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Budget Tips</h2>
          
          <div className="space-y-4">
            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Categories that are over 90% spent might need budget adjustments for next month.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You're doing well in some categories! Consider moving some budget from low-usage categories to high-usage ones.
                </p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300 mr-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Remember to review your budget at the beginning of each month to make sure it aligns with your financial goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget
