function FloatingNav() {
  return (
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
  )
}

export default FloatingNav
