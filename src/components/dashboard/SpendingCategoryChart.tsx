import { useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts'
import { useUserData, CategoryData } from '../../context/UserDataContext'
import { motion, AnimatePresence } from 'framer-motion'

const SpendingCategoryChart = () => {
  const { spendingByCategoryData, subcategoriesData, selectedCategory, setSelectedCategory } = useUserData()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const handleCategoryClick = (data: CategoryData) => {
    if (selectedCategory === data.name) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(data.name)
    }
  }

  const currentData = selectedCategory && subcategoriesData[selectedCategory] 
    ? subcategoriesData[selectedCategory] 
    : spendingByCategoryData

  const totalSpending = currentData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="card h-80">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {selectedCategory ? `${selectedCategory} Breakdown` : 'Spending by Category'}
        </h2>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Categories
          </button>
        )}
      </div>
      
      <div className="flex h-64">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
                data={currentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                onClick={handleCategoryClick}
                cursor={!selectedCategory ? 'pointer' : 'default'}
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 pl-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory || 'main'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spending</p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">{formatCurrency(totalSpending)}</p>
              </div>
              
              <div className="space-y-2">
                {currentData.map((item, index) => (
                  <div 
                    key={item.name} 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      activeIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''
                    } ${!selectedCategory ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => !selectedCategory && handleCategoryClick(item)}
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {formatCurrency(item.value)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {((item.value / totalSpending) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default SpendingCategoryChart
