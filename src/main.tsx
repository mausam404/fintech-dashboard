import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { UserDataProvider } from './context/UserDataContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserDataProvider>
          <App />
        </UserDataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
