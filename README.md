# FinTech Dashboard

A responsive and interactive personal finance dashboard web interface that visualizes user financial data using charts, reusable components, and state management.

![FinTech Dashboard](https://via.placeholder.com/800x400?text=FinTech+Dashboard)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Components](#components)
- [State Management](#state-management)
- [Styling](#styling)
- [Future Enhancements](#future-enhancements)

## Overview

This project is a personal finance dashboard that provides users with a comprehensive view of their financial data. It includes visualizations for income vs expenses, category-wise spending, recent transactions, and budget tracking. The dashboard is designed to be responsive and works well on both desktop and mobile devices.

## Features

### Header & Profile Section
- Personalized greeting with user name and avatar
- Monthly savings goal status bar
- Theme toggle (light/dark mode)

### Financial Overview Cards
- Total Account Balance
- Monthly Income
- Monthly Expenses
- Savings Ratio
- Time period toggle (Monthly/Quarterly/Year-to-date)

### Charts
- Expense vs Income Chart (area chart)
- Category-Wise Spending Pie Chart
  - Clickable segments to drill down into subcategories
  - Color-coded category legends

### Recent Transactions Table
- Shows latest transactions
- Includes: Date, Description, Type (Credit/Debit), Category, Amount
- Color-coded (green for income, red for expenses)
- Filter and search options

### Budget Tracking
- Monthly budget by category
- Visual indicators of budget usage (progress bars)
- Budget summary and insights

### Notifications & Tips
- Smart alerts for financial events
- Budget tips & insights

### Other Features
- Responsive mobile-first layout
- Theme: Light and dark mode
- Basic routing with sidebar navigation
- Interactive UI elements with animations

## Project Structure

```
fintech-dashboard/
├── public/                  # Static assets
│   └── favicon.svg         # App favicon
├── src/                     # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── components/         # Reusable components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── layout/         # Layout components (Header, Sidebar)
│   │   ├── transactions/   # Transaction-related components
│   │   ├── budget/         # Budget-related components
│   │   └── ui/             # Generic UI components
│   ├── context/            # React Context for state management
│   │   ├── ThemeContext.tsx    # Theme (light/dark) management
│   │   └── UserDataContext.tsx # User data management
│   ├── data/               # Mock data
│   │   └── mockData.ts     # Sample financial data
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page layouts
│   │   └── DashboardLayout.tsx # Main dashboard layout
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx   # Main dashboard page
│   │   ├── Transactions.tsx # Transactions page
│   │   ├── Budget.tsx      # Budget management page
│   │   └── Settings.tsx    # User settings page
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component with routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles and Tailwind imports
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Tech Stack

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mausam404/fintech-dashboard
   cd fintech-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Navigation

Use the sidebar to navigate between different sections of the dashboard:
- **Dashboard**: Overview of financial data
- **Transactions**: Detailed list of all transactions
- **Budget**: Budget tracking and management
- **Settings**: User profile and application settings

### Theme Toggle

Click the sun/moon icon in the header to toggle between light and dark mode.

### Financial Overview Cards

Use the dropdown in each card to switch between Monthly, Quarterly, and Year-to-date views.

### Category Spending Chart

Click on a category segment to drill down into subcategories. Click "Back to Categories" to return to the main view.

### Transactions Table

- Use the search box to filter transactions by description or category
- Use the filter buttons to show All, Income, or Expenses
- Click column headers to sort the data

## Components

### Layout Components

- **DashboardLayout**: Main layout with sidebar and header
- **Header**: Top navigation bar with theme toggle and user profile
- **Sidebar**: Navigation sidebar with user info and menu items

### Dashboard Components

- **FinancialOverviewCard**: Cards showing financial metrics
- **IncomeExpenseChart**: Area chart comparing income and expenses
- **SpendingCategoryChart**: Interactive pie chart for spending categories
- **RecentTransactions**: Table showing recent transactions
- **NotificationsAndTips**: Alerts and financial advice

### Page Components

- **Dashboard**: Main dashboard page combining all dashboard components
- **Transactions**: Full transactions list with advanced filtering
- **Budget**: Budget management and tracking
- **Settings**: User and application settings

## State Management

The application uses React Context API for state management:

- **ThemeContext**: Manages light/dark theme preference
- **UserDataContext**: Manages all financial data including:
  - User profile information
  - Financial metrics
  - Transactions
  - Budget data
  - Categories and subcategories
  - Notifications and tips

## Styling

- **Tailwind CSS**: Utility-first CSS framework for styling
- **Custom Theme**: Extended Tailwind theme with custom colors
- **Dark Mode**: Full dark mode support
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Future Enhancements

- Calendar-based expense tracker
- Data visualization improvements
- User authentication
- Backend integration with real financial data
- Export functionality for reports
- Mobile app version

--- 

