import { createContext, useContext, useState, ReactNode } from 'react'
import { 
  userData, 
  financialData, 
  incomeVsExpensesData, 
  spendingByCategoryData, 
  subcategoriesData,
  recentTransactions,
  budgetData,
  notifications,
  financialTips
} from '../data/mockData'

// Define types
export type TimeFrame = 'monthly' | 'quarterly' | 'yearly'
export type Transaction = {
  id: string
  date: string
  description: string
  type: 'Credit' | 'Debit'
  category: string
  amount: number
}

export type CategoryData = {
  name: string
  value: number
  color: string
}

export type BudgetItem = {
  category: string
  budget: number
  spent: number
}

export type Notification = {
  id: string
  type: 'warning' | 'info' | 'success'
  message: string
}

interface UserDataContextType {
  user: typeof userData
  financialData: typeof financialData
  timeFrame: TimeFrame
  setTimeFrame: (timeFrame: TimeFrame) => void
  incomeVsExpensesData: typeof incomeVsExpensesData
  spendingByCategoryData: typeof spendingByCategoryData
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
  subcategoriesData: typeof subcategoriesData
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  searchTransactions: (query: string) => void
  filterTransactionsByType: (type: 'all' | 'Credit' | 'Debit') => void
  budgetData: BudgetItem[]
  notifications: Notification[]
  financialTips: string[]
  dismissNotification: (id: string) => void
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined)

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('monthly')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [transactionFilter, setTransactionFilter] = useState<'all' | 'Credit' | 'Debit'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentNotifications, setCurrentNotifications] = useState(notifications)

  // Filter transactions based on search query and type filter
  const filteredTransactions = recentTransactions.filter(transaction => {
    const matchesSearch = searchQuery === '' || 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = transactionFilter === 'all' || transaction.type === transactionFilter
    
    return matchesSearch && matchesType
  })

  const searchTransactions = (query: string) => {
    setSearchQuery(query)
  }

  const filterTransactionsByType = (type: 'all' | 'Credit' | 'Debit') => {
    setTransactionFilter(type)
  }

  const dismissNotification = (id: string) => {
    setCurrentNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  return (
    <UserDataContext.Provider value={{
      user: userData,
      financialData,
      timeFrame,
      setTimeFrame,
      incomeVsExpensesData,
      spendingByCategoryData,
      selectedCategory,
      setSelectedCategory,
      subcategoriesData,
      transactions: recentTransactions,
      filteredTransactions,
      searchTransactions,
      filterTransactionsByType,
      budgetData,
      notifications: currentNotifications,
      financialTips,
      dismissNotification
    }}>
      {children}
    </UserDataContext.Provider>
  )
}

export function useUserData() {
  const context = useContext(UserDataContext)
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider')
  }
  return context
}
