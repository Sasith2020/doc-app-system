import { useMemo, useState } from 'react'
import FloatingNav from '../../components/dashboard/FloatingNav'
import ApprovedTab from '../../components/dashboard/ApprovedTab'
import HoledTab from '../../components/dashboard/HoledTab'
import InboxTab from '../../components/dashboard/InboxTab'
import PendingTab from '../../components/dashboard/PendingTab'
import ReturnedTab from '../../components/dashboard/ReturnedTab'
import type { CaseRow } from '../../components/dashboard/CasesPanel'
import SideNav from '../../common-component/SideNav'
import TopNav from '../../common-component/TopNav'

type DashboardPageProps = {
  onLogout: () => void
  onViewCase: (row: CaseRow) => void
}

function DashboardPage({ onLogout, onViewCase }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('inbox')

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'pending':
        return <PendingTab onViewCase={onViewCase} />
      case 'approved':
        return <ApprovedTab onViewCase={onViewCase} />
      case 'returned':
        return <ReturnedTab onViewCase={onViewCase} />
      case 'holed':
        return <HoledTab onViewCase={onViewCase} />
      case 'inbox':
      default:
        return <InboxTab onViewCase={onViewCase} />
    }
  }, [activeTab, onViewCase])

  return (
    <section className="dashboard-page">
      <SideNav />
      <TopNav onLogout={onLogout} />
      <main className="dashboard-content">
        <FloatingNav activeTab={activeTab} onChange={setActiveTab} />
        {tabContent}
      </main>
    </section>
  )
}

export default DashboardPage
