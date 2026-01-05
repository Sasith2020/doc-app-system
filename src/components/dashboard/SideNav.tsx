function SideNav() {
  return (
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
  )
}

export default SideNav
