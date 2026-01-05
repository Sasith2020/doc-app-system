import Table from '../../common-component/Table'

type CaseRow = {
  id: string
  div: string
  status: string
}

const cases: CaseRow[] = [
  { id: 'CASE-10045', div: 'DIV-04', status: 'Inbox' },
  { id: 'CASE-10046', div: 'DIV-02', status: 'Inbox' },
  { id: 'CASE-10047', div: 'DIV-09', status: 'Inbox' },
  { id: 'CASE-10048', div: 'DIV-04', status: 'Inbox' },
  { id: 'CASE-10049', div: 'DIV-01', status: 'Inbox' },
  { id: 'CASE-10050', div: 'DIV-06', status: 'Inbox' },
]

function CasesTable() {
  const columns = [
    {
      key: 'caseId',
      header: 'Case ID',
      render: (row: CaseRow) => row.id,
    },
    {
      key: 'createdDiv',
      header: 'Created Div',
      render: (row: CaseRow) => row.div,
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: CaseRow) => <span className="status-pill">{row.status}</span>,
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right' as const,
      render: () => (
        <button type="button" className="ghost-btn">
          View
        </button>
      ),
    },
  ]

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

      <Table
        columns={columns}
        data={cases}
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 15]}
        showPageSizeSelector
        getRowKey={(row) => row.id}
      />
    </section>
  )
}

export default CasesTable
