import { useMemo, useState } from 'react'
import './App.css'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/login/LoginPage'
import ViewCasePage from './pages/view-case/ViewCasePage'
import type { CaseRow } from './components/dashboard/CasesPanel'
import type { CaseDetails } from './pages/view-case/ViewCasePage'

type AppView = 'login' | 'dashboard' | 'viewCase'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [selectedCase, setSelectedCase] = useState<CaseRow | null>(null)

  const currentView = useMemo<AppView>(() => {
    if (!isAuthenticated) {
      return 'login'
    }
    if (selectedCase) {
      return 'viewCase'
    }
    return 'dashboard'
  }, [isAuthenticated, selectedCase])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setSelectedCase(null)
  }

  const handleViewCase = (row: CaseRow) => {
    setSelectedCase(row)
  }

  const handleBackToDashboard = () => {
    setSelectedCase(null)
  }

  const buildCaseDetails = (row: CaseRow): CaseDetails => ({
    id: row.id,
    status: row.status,
    initiatorName: 'Devi Fullname',
    initiatorDiv: row.div,
    initiatorDescription: 'Senior procurement analyst',
    initiatedAt: '12 Sep 2024, 09:45 AM',
    category: 'Procurement → Financial Approval → Asset Request',
    keyFields: [
      { label: 'Requester name', value: 'Devi Fullname' },
      { label: 'Asset type', value: 'Laptop (Engineering)' },
      { label: 'Estimated value', value: '$2,450' },
      { label: 'Justification', value: 'Device replacement for new hire.' },
    ],
    documents: [
      {
        id: 'DOC-1001',
        type: 'Purchase request',
        name: 'PR-2024-109.pdf',
        description: 'Initial asset request details.',
        date: '12 Sep 2024',
        user: 'Devi F.',
        locked: true,
      },
      {
        id: 'DOC-1002',
        type: 'Budget approval',
        name: 'Budget-Approval.xlsx',
        description: 'Finance team sign-off.',
        date: '13 Sep 2024',
        user: 'Marco R.',
        locked: false,
      },
      {
        id: 'DOC-1003',
        type: 'Vendor quote',
        name: 'Vendor-Quote.pdf',
        description: 'Preferred supplier quote.',
        date: '13 Sep 2024',
        user: 'Jules T.',
        locked: false,
      },
    ],
    caseBody:
      'Requesting approval to procure a new engineering laptop for the incoming developer. Current inventory does not have a suitable device that meets the required specifications. Please review the attached purchase request and vendor quotation before proceeding.',
    actionLogs: [
      {
        id: 'LOG-1001',
        user: 'Devi Fullname',
        date: '12 Sep 2024',
        type: 'Created',
        period: '00:05',
        nextUser: 'Jordan Lee',
        comment: 'Submitted new asset request.',
      },
      {
        id: 'LOG-1002',
        user: 'Jordan Lee',
        date: '12 Sep 2024',
        type: 'Reviewed',
        period: '01:20',
        nextUser: 'Marco Ruiz',
        comment: 'Initial review completed.',
      },
      {
        id: 'LOG-1003',
        user: 'Marco Ruiz',
        date: '13 Sep 2024',
        type: 'Finance check',
        period: '00:40',
        nextUser: 'Jordan Lee',
        comment: 'Budget verified.',
      },
    ],
    isInbox: row.status.toLowerCase() === 'inbox',
  })

  return (
    <div className="app">
      {currentView === 'login' ? (
        <LoginPage onSuccess={handleLoginSuccess} />
      ) : currentView === 'viewCase' && selectedCase ? (
        <ViewCasePage
          details={buildCaseDetails(selectedCase)}
          onBack={handleBackToDashboard}
          onLogout={handleLogout}
        />
      ) : (
        <DashboardPage onLogout={handleLogout} onViewCase={handleViewCase} />
      )}
    </div>
  )
}

export default App
