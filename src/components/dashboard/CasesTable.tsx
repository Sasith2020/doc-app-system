const cases = [
  { id: 'CASE-10045', div: 'DIV-04', status: 'Inbox' },
  { id: 'CASE-10046', div: 'DIV-02', status: 'Inbox' },
  { id: 'CASE-10047', div: 'DIV-09', status: 'Inbox' },
  { id: 'CASE-10048', div: 'DIV-04', status: 'Inbox' },
]

function CasesTable() {
  return (
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
        {cases.map((row) => (
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
  )
}

export default CasesTable
