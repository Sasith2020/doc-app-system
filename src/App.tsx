import './App.css'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/login/LoginPage'

function App() {
  return (
    <div className="app">
      <section className="login-page">
        <div className="login-card">
          <div>
            <p className="login-eyebrow">Document App System</p>
            <h1>Log in</h1>
            <p className="login-subtitle">
              Use your assigned credentials to access the workflow dashboard.
            </p>
          </div>
          <form className="login-form">
            <label className="field">
              <span>User ID</span>
              <input type="text" placeholder="Enter your user ID" />
            </label>
            <label className="field">
              <span>Password</span>
              <input type="password" placeholder="Enter your password" />
            </label>
            <button type="submit" className="primary-btn">
              Log in
            </button>
          </form>
          <div className="login-footer">
            <span>Need access?</span>
            <button type="button" className="link-btn">
              Request support
            </button>
          </div>
        </div>
      </section>

      <section className="dashboard-page">
        <aside className="side-nav">
          <div className="side-nav-title">DOC APP</div>
          <nav className="side-nav-links">
            <button type="button" className="side-link active">
              Dashboard
            </button>
            <button type="button" className="side-link">
              New Submission
            </button>
            <button type="button" className="side-link">
              Search
            </button>
            <button type="button" className="side-link">
              Report
            </button>
          </nav>
        </aside>

        <header className="top-nav">
          <button type="button" className="link-btn">
            Log out
          </button>
          <span className="pill">Level 2</span>
          <span className="user-chip">Jordan Lee</span>
          <span className="user-chip">DIV-04</span>
          <span className="user-chip">UID-39821</span>
        </header>

        <main className="dashboard-content">
          <div className="floating-nav">
            <button type="button" className="tab active">
              Inbox
            </button>
            <button type="button" className="tab">
              Pending
            </button>
            <button type="button" className="tab">
              Approved
            </button>
            <button type="button" className="tab">
              Returned
            </button>
            <button type="button" className="tab">
              Holed
            </button>
          </div>

          <section className="table-card">
            <div className="table-header">
              <div>
                <h2>Created cases</h2>
                <p>Inbox cases awaiting review or assignment.</p>
              </div>
              <button type="button" className="primary-btn">
                New case
              </button>
            </div>

            <div className="table">
              <div className="table-row table-head">
                <span>Case ID</span>
                <span>Created Div</span>
                <span>Status</span>
                <span>Action</span>
              </div>
              {[
                { id: 'CASE-10045', div: 'DIV-04', status: 'Inbox' },
                { id: 'CASE-10046', div: 'DIV-02', status: 'Inbox' },
                { id: 'CASE-10047', div: 'DIV-09', status: 'Inbox' },
                { id: 'CASE-10048', div: 'DIV-04', status: 'Inbox' },
              ].map((row) => (
                <div className="table-row" key={row.id}>
                  <span>{row.id}</span>
                  <span>{row.div}</span>
                  <span className="status-pill">{row.status}</span>
                  <button type="button" className="ghost-btn">
                    View
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </section>
    </div>
  )
}

export default App
