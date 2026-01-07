import Table from '../../common-component/Table'

type CaseRow = {
  id: string
  div: string
  status: string
  bucket?: string
}

type CasesPanelProps = {
  title: string
  description: string
  data: CaseRow[]
}

function CasesPanel({ title, description, data }: CasesPanelProps) {
  const columns = [
    {
      key: 'caseId',
      header: 'Case ID',
      accessor: (row: CaseRow) => row.id,
      type: 'string' as const,
      sortable: true,
      filter: 'text' as const,
      render: (row: CaseRow) => row.id,
    },
    {
      key: 'createdDiv',
      header: 'Created Div',
      accessor: (row: CaseRow) => row.div,
      type: 'string' as const,
      sortable: true,
      filter: 'text' as const,
      render: (row: CaseRow) => row.div,
    },
    {
      key: 'bucket',
      header: 'Bucket',
      accessor: (row: CaseRow) => row.bucket ?? '',
      type: 'string' as const,
      sortable: true,
      filter: 'text' as const,
      render: (row: CaseRow) => row.bucket ?? '-',
    },
    {
      key: 'status',
      header: 'Status',
      accessor: (row: CaseRow) => row.status,
      type: 'string' as const,
      sortable: true,
      filter: 'text' as const,
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
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button type="button" className="primary-btn">
          New case
        </button>
      </div>

      <Table
        columns={columns}
        data={data}
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 15]}
        showPageSizeSelector
        getRowKey={(row) => row.id}
        enableSearch
        enableFilters
        enableSorting
        enableReset
        searchPlaceholder="Search cases"
      />
    </section>
  )
}

export default CasesPanel
