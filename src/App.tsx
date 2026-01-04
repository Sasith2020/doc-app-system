import { useMemo, useState } from 'react'
import './App.css'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/login/LoginPage'

type AppView = 'login' | 'dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const currentView = useMemo<AppView>(() => {
    return isAuthenticated ? 'dashboard' : 'login'
  }, [isAuthenticated])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <div className="app">
      {currentView === 'login' ? (
        <LoginPage onSuccess={handleLoginSuccess} />
      ) : (
        <DashboardPage onLogout={handleLogout} />
      )}
    </div>
  )
}

export default App
