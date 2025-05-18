import { useState } from 'react'
import { useUserData, Transaction } from '../../context/UserDataContext'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'

const RecentTransactions = () => {
  const { filteredTransactions, searchTransactions, filterTransactionsByType } = useUserData()
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'Credit' | 'Debit'>('all')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    searchTransactions(query)
  }

  const handleFilterChange = (type: 'all' | 'Credit' | 'Debit') => {
    setTypeFilter(type)
    filterTransactionsByType(type)
  }

  const formatCurrency = (amount: number, type: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(type === 'Credit' ? amount : -amount)
  }

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), 'MMM dd, yyyy')
  }

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, string> = {
      Housing: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Food: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      Transportation: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Entertainment: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      Utilities: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      Healthcare: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      Income: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    }
    
    return categoryColors[category] || categoryColors.Other
  }

  const displayedTransactions = filteredTransactions.slice(0, 10)

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Transactions</h2>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Search input */}
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          {/* Filter buttons */}
          <div className="flex space-x-1">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                typeFilter === 'all'
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange('Credit')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                typeFilter === 'Credit'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => handleFilterChange('Debit')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                typeFilter === 'Debit'
                  ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Expenses
            </button>
          </div>
        </div>
      </div>
      
      {/* Transactions list */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {displayedTransactions.length > 0 ? (
              displayedTransactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                    {transaction.description}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`px-4 py-3 whitespace-nowrap text-sm font-medium text-right ${
                    transaction.type === 'Credit' ? 'text-success dark:text-green-400' : 'text-danger dark:text-red-400'
                  }`}>
                    {formatCurrency(transaction.amount, transaction.type)}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  No transactions found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredTransactions.length > 10 && (
        <div className="mt-4 text-center">
          <a href="/transactions" className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
            View all transactions
          </a>
        </div>
      )}
    </div>
  )
}

export default RecentTransactions
