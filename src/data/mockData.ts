import { format, subDays } from 'date-fns'

// User data
export const userData = {
  name: 'Alex Johnson',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  savingsGoal: 2000,
  currentSavings: 1250,
}

// Financial overview data
export const financialData = {
  monthly: {
    balance: 12450.75,
    income: 5800,
    expenses: 3200,
    savingsRatio: 0.45,
  },
  quarterly: {
    balance: 13200.50,
    income: 17400,
    expenses: 9600,
    savingsRatio: 0.44,
  },
  yearly: {
    balance: 15300.25,
    income: 69600,
    expenses: 38400,
    savingsRatio: 0.42,
  },
}

// Income vs Expenses chart data
export const incomeVsExpensesData = [
  { month: 'Jan', income: 5200, expenses: 3100 },
  { month: 'Feb', income: 5300, expenses: 3000 },
  { month: 'Mar', income: 5400, expenses: 3200 },
  { month: 'Apr', income: 5500, expenses: 3300 },
  { month: 'May', income: 5600, expenses: 3100 },
  { month: 'Jun', income: 5700, expenses: 3400 },
  { month: 'Jul', income: 5800, expenses: 3200 },
  { month: 'Aug', income: 5900, expenses: 3300 },
  { month: 'Sep', income: 6000, expenses: 3500 },
  { month: 'Oct', income: 6100, expenses: 3400 },
  { month: 'Nov', income: 6200, expenses: 3600 },
  { month: 'Dec', income: 6300, expenses: 3700 },
]

// Spending by category data
export const spendingByCategoryData = [
  { name: 'Housing', value: 1200, color: '#0ea5e9' },
  { name: 'Food', value: 500, color: '#8b5cf6' },
  { name: 'Transportation', value: 300, color: '#10b981' },
  { name: 'Entertainment', value: 200, color: '#f59e0b' },
  { name: 'Utilities', value: 250, color: '#ef4444' },
  { name: 'Healthcare', value: 150, color: '#3b82f6' },
  { name: 'Shopping', value: 400, color: '#ec4899' },
  { name: 'Other', value: 200, color: '#6b7280' },
]

// Subcategories for drill-down
export const subcategoriesData = {
  Housing: [
    { name: 'Rent/Mortgage', value: 950, color: '#0369a1' },
    { name: 'Insurance', value: 120, color: '#0284c7' },
    { name: 'Property Tax', value: 80, color: '#0ea5e9' },
    { name: 'Maintenance', value: 50, color: '#7dd3fc' },
  ],
  Food: [
    { name: 'Groceries', value: 300, color: '#6d28d9' },
    { name: 'Restaurants', value: 150, color: '#8b5cf6' },
    { name: 'Takeout', value: 50, color: '#c4b5fd' },
  ],
  Transportation: [
    { name: 'Gas', value: 120, color: '#059669' },
    { name: 'Public Transit', value: 80, color: '#10b981' },
    { name: 'Car Maintenance', value: 50, color: '#6ee7b7' },
    { name: 'Rideshare', value: 50, color: '#a7f3d0' },
  ],
  // Add more subcategories as needed
}

// Recent transactions
export const recentTransactions = Array(15).fill(null).map((_, index) => {
  const isIncome = Math.random() > 0.7
  const categories = ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Other']
  const descriptions = isIncome 
    ? ['Salary', 'Freelance Payment', 'Investment Return', 'Refund', 'Gift'] 
    : ['Grocery Store', 'Restaurant', 'Gas Station', 'Online Shopping', 'Utility Bill', 'Rent Payment', 'Subscription']
  
  return {
    id: `tx-${index}`,
    date: format(subDays(new Date(), index), 'yyyy-MM-dd'),
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    type: isIncome ? 'Credit' : 'Debit',
    category: isIncome ? 'Income' : categories[Math.floor(Math.random() * categories.length)],
    amount: isIncome 
      ? Math.floor(Math.random() * 2000) + 1000 
      : Math.floor(Math.random() * 200) + 10,
  }
})

// Budget data
export const budgetData = [
  { category: 'Housing', budget: 1500, spent: 1200 },
  { category: 'Food', budget: 600, spent: 500 },
  { category: 'Transportation', budget: 400, spent: 300 },
  { category: 'Entertainment', budget: 300, spent: 200 },
  { category: 'Utilities', budget: 300, spent: 250 },
  { category: 'Healthcare', budget: 200, spent: 150 },
  { category: 'Shopping', budget: 500, spent: 400 },
  { category: 'Other', budget: 300, spent: 200 },
]

// Notifications and tips
export const notifications = [
  {
    id: 'notif-1',
    type: 'warning',
    message: 'You\'ve spent 90% of your Food budget this month',
  },
  {
    id: 'notif-2',
    type: 'info',
    message: 'Your utility bill is due in 3 days',
  },
  {
    id: 'notif-3',
    type: 'success',
    message: 'You saved $300 more than last month!',
  },
]

export const financialTips = [
  'Try the 50/30/20 rule: 50% on needs, 30% on wants, and 20% on savings',
  'Set up automatic transfers to your savings account on payday',
  'Review your subscriptions regularly and cancel unused ones',
  'Consider a high-yield savings account for your emergency fund',
  'Track your daily expenses to identify areas where you can cut back',
]
