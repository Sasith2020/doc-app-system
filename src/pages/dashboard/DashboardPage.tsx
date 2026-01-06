import { useMemo, useState } from 'react'
import FloatingNav from '../../components/dashboard/FloatingNav'
import ApprovedTab from '../../components/dashboard/ApprovedTab'
import HoledTab from '../../components/dashboard/HoledTab'
import InboxTab from '../../components/dashboard/InboxTab'
import PendingTab from '../../components/dashboard/PendingTab'
import ReturnedTab from '../../components/dashboard/ReturnedTab'
import SideNav from '../../common-component/SideNav'
import TopNav from '../../common-component/TopNav'

type DashboardPageProps = {
  onLogout: () => void
}

function DashboardPage({ onLogout }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('inbox')

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 'pending':
        return <PendingTab />
      case 'approved':
        return <ApprovedTab />
      case 'returned':
        return <ReturnedTab />
      case 'holed':
        return <HoledTab />
      case 'inbox':
      default:
        return <InboxTab />
    }
  }, [activeTab])

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
