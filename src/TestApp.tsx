import React from 'react'
import './index-test.css'

function TestApp() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Financial Dashboard</h1>
      </header>
      <main>
        <div className="card">
          <h2>Welcome to the Financial Dashboard</h2>
          <p>This is a test component to check if the application is working correctly.</p>
          <button className="button">Test Button</button>
        </div>
      </main>
    </div>
  )
}

export default TestApp
