import CasesTable from '../../components/dashboard/CasesTable'
import FloatingNav from '../../components/dashboard/FloatingNav'
import SideNav from '../../components/dashboard/SideNav'
import TopNav from '../../components/dashboard/TopNav'

type DashboardPageProps = {
  onLogout: () => void
}

function DashboardPage({ onLogout }: DashboardPageProps) {
  return (
    <section className="dashboard-page">
      <SideNav />
      <TopNav onLogout={onLogout} />
      <main className="dashboard-content">
        <FloatingNav />
        <CasesTable />
      </main>
    </section>
  )
}

export default DashboardPage
