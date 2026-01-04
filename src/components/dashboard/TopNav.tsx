type TopNavProps = {
  onLogout: () => void
}

function TopNav({ onLogout }: TopNavProps) {
  return (
    <header className="top-nav">
      <button type="button" className="link-btn" onClick={onLogout}>
        Log out
      </button>
      <span className="pill">Level 2</span>
      <span className="user-chip">Jordan Lee</span>
      <span className="user-chip">DIV-04</span>
      <span className="user-chip">UID-39821</span>
    </header>
  )
}

export default TopNav
