type ActionButtonsProps = {
  status: string
  isInbox: boolean
}

function ActionButtons({ status, isInbox }: ActionButtonsProps) {
  if (status.toLowerCase() === 'holed') {
    return (
      <button type="button" className="primary-btn action-btn">
        Resume
      </button>
    )
  }

  return (
    <>
      {['Submit', 'Forward', 'Recommend', 'Approve', 'Return', 'Hold'].map(
        (label) => (
          <button
            key={label}
            type="button"
            className="primary-btn action-btn"
            disabled={!isInbox}
          >
            {label}
          </button>
        ),
      )}
    </>
  )
}

export default ActionButtons
