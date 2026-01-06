import { useState } from 'react'
import PopupBox from '../../common-component/PopupBox'

type TopNavProps = {
  onLogout: () => void
}

function TopNav({ onLogout }: TopNavProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleLogoutRequest = () => {
    setIsPopupOpen(true)
  }

  const handleConfirmLogout = () => {
    setIsPopupOpen(false)
    onLogout()
  }

  return (
    <>
      <header className="top-nav">
        <span className="user-chip">UID-39821</span>
        <span className="user-chip">Jordan Lee</span>
        <span className="pill">Level 2</span>
        <span className="user-chip">DIV-04</span>
        <button type="button" className="link-btn" onClick={handleLogoutRequest}>
          Log out
        </button>
      </header>

      <PopupBox
        isOpen={isPopupOpen}
        title="Confirm log out"
        message="You will be signed out of the dashboard. Unsaved changes may be lost."
        variant="danger"
        dataList={[
          { label: 'User', value: 'Jordan Lee' },
          { label: 'Session', value: 'Active' },
        ]}
        primaryAction={{
          label: 'Log out',
          onClick: handleConfirmLogout,
          variant: 'danger',
        }}
        secondaryAction={{
          label: 'Cancel',
          onClick: () => setIsPopupOpen(false),
        }}
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}

export default TopNav
