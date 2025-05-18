import { useUserData } from '../context/UserDataContext'
import FinancialOverviewCard from '../components/dashboard/FinancialOverviewCard'
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart'
import SpendingCategoryChart from '../components/dashboard/SpendingCategoryChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import NotificationsAndTips from '../components/dashboard/NotificationsAndTips'

const Dashboard = () => {
  const { user } = useUserData()

  return (
    <div className="space-y-6">
      {/* Greeting section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Here's what's happening with your finances today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Transaction</span>
          </div>
        </div>
      </div>

      {/* Financial overview cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinancialOverviewCard
          title="Total Balance"
          type="balance"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          }
        />
        <FinancialOverviewCard
          title="Monthly Income"
          type="income"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          }
        />
        <FinancialOverviewCard
          title="Monthly Expenses"
          type="expenses"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          }
        />
        <FinancialOverviewCard
          title="Savings Ratio"
          type="savingsRatio"
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomeExpenseChart />
        <SpendingCategoryChart />
      </div>

      {/* Recent transactions */}
      <RecentTransactions />

      {/* Notifications and tips */}
      <NotificationsAndTips />
    </div>
  )
}

export default Dashboard
