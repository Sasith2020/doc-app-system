import { useState } from 'react'
import './App.css'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/login/LoginPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div className="app">
      {isAuthenticated ? (
        <DashboardPage onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <LoginPage onSuccess={() => setIsAuthenticated(true)} />
      )}
    </div>
  )
}

export default App
