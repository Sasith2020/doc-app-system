type TopNavProps = {
  onLogout: () => void
}

function TopNav({ onLogout }: TopNavProps) {
  return (
    <header className="top-nav">
      <span className="user-chip">UID-39821</span>
      <span className="user-chip">Jordan Lee</span>
      <span className="pill">Level 2</span>
      <span className="user-chip">DIV-04</span>
      <button type="button" className="link-btn" onClick={onLogout}>
        Log out
      </button>
    </header>
  )
}

export default TopNav
