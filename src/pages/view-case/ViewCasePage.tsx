import SideNav from '../../common-component/SideNav'
import TopNav from '../../common-component/TopNav'
import Table from '../../common-component/Table'

type KeyField = {
  label: string
  value: string
}

type DocumentRow = {
  id: string
  type: string
  name: string
  description: string
  date: string
  user: string
  locked: boolean
}

type ActionLogRow = {
  id: string
  user: string
  date: string
  type: string
  period: string
  nextUser: string
  comment: string
}

export type CaseDetails = {
  id: string
  initiatorName: string
  initiatorDiv: string
  initiatorDescription: string
  initiatedAt: string
  category: string
  keyFields: KeyField[]
  documents: DocumentRow[]
  caseBody: string
  actionLogs: ActionLogRow[]
  isInbox: boolean
}

type ViewCasePageProps = {
  details: CaseDetails
  onBack: () => void
  onLogout: () => void
}

function ViewCasePage({ details, onBack, onLogout }: ViewCasePageProps) {
  const documentColumns = [
    {
      key: 'type',
      header: 'Document type',
      render: (row: DocumentRow) => row.type,
    },
    {
      key: 'name',
      header: 'Document name',
      render: (row: DocumentRow) => row.name,
    },
    {
      key: 'description',
      header: 'Doc description',
      render: (row: DocumentRow) => row.description,
    },
    {
      key: 'date',
      header: 'Date',
      render: (row: DocumentRow) => row.date,
    },
    {
      key: 'user',
      header: 'User',
      render: (row: DocumentRow) => row.user,
    },
    {
      key: 'action',
      header: 'Action',
      align: 'center' as const,
      searchable: false,
      render: () => (
        <div className="table-action-group">
          <button type="button" className="table-icon-btn" aria-label="View">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 5c5.05 0 9.27 3.11 10.94 7.5C21.27 16.89 17.05 20 12 20S2.73 16.89 1.06 12.5C2.73 8.11 6.95 5 12 5Zm0 2c-3.88 0-7.16 2.27-8.68 5.5C4.84 15.73 8.12 18 12 18s7.16-2.27 8.68-5.5C19.16 9.27 15.88 7 12 7Zm0 2.5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button type="button" className="table-icon-btn" aria-label="Delete">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M9 3h6l1 2h5v2H3V5h5l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM6 9h2v9H6V9Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      ),
    },
    {
      key: 'locked',
      header: 'Lock document',
      align: 'center' as const,
      searchable: false,
      render: (row: DocumentRow) => (
        <input
          type="checkbox"
          checked={row.locked}
          onChange={() => undefined}
          aria-label={`Lock ${row.name}`}
        />
      ),
    },
  ]

  const actionLogColumns = [
    {
      key: 'user',
      header: 'Action user',
      render: (row: ActionLogRow) => row.user,
    },
    {
      key: 'date',
      header: 'Action date',
      render: (row: ActionLogRow) => row.date,
    },
    {
      key: 'type',
      header: 'Action type',
      render: (row: ActionLogRow) => row.type,
    },
    {
      key: 'period',
      header: 'Action period',
      render: (row: ActionLogRow) => row.period,
    },
    {
      key: 'nextUser',
      header: 'Next user',
      render: (row: ActionLogRow) => row.nextUser,
    },
    {
      key: 'comment',
      header: 'Action comment',
      render: (row: ActionLogRow) => row.comment,
    },
  ]

  return (
    <section className="view-case-page">
      <SideNav />
      <TopNav onLogout={onLogout} />
      <main className="view-case-content">
        <header className="view-case-header">
          <div>
            <p className="view-case-eyebrow">View case</p>
            <h1>Case {details.id}</h1>
          </div>
          <button type="button" className="ghost-btn" onClick={onBack}>
            Back to dashboard
          </button>
        </header>

        <section className="view-case-grid">
          <article className="table-card">
            <div className="section-header">
              <h2>Case info</h2>
            </div>
            <div className="case-info-list">
              <div>
                <span className="meta-label">Case ID</span>
                <span className="meta-value">{details.id}</span>
              </div>
              <div>
                <span className="meta-label">Initiator</span>
                <span className="meta-value">
                  {details.initiatorName} | {details.initiatorDiv} |{' '}
                  {details.initiatorDescription} | {details.initiatedAt}
                </span>
              </div>
              <div>
                <span className="meta-label">Category</span>
                <span className="meta-value">{details.category}</span>
              </div>
            </div>
          </article>

          <article className="table-card">
            <div className="section-header">
              <div>
                <h2>Key field</h2>
                <p>Captured values when the case was created.</p>
              </div>
              <button type="button" className="ghost-btn">
                Edit fields
              </button>
            </div>
            <div className="key-field-list">
              {details.keyFields.map((field) => (
                <div key={field.label} className="key-field-row">
                  <span className="meta-label">{field.label}</span>
                  <span className="meta-value">{field.value}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <article className="table-card">
          <div className="section-header">
            <div>
              <h2>Documents panel</h2>
              <p>Uploaded documents for this case.</p>
            </div>
            <button type="button" className="primary-btn">
              Upload
            </button>
          </div>
          <Table
            columns={documentColumns}
            data={details.documents}
            defaultPageSize={5}
            pageSizeOptions={[5, 10]}
            showPageSizeSelector
            enableColumnSearch={false}
            globalSearchPlaceholder="Search documents..."
            getRowKey={(row) => row.id}
          />
        </article>

        <article className="table-card">
          <div className="section-header">
            <h2>Case body</h2>
          </div>
          <p className="case-body">{details.caseBody}</p>
        </article>

        <article className="table-card">
          <div className="section-header">
            <h2>Action log</h2>
          </div>
          <Table
            columns={actionLogColumns}
            data={details.actionLogs}
            defaultPageSize={5}
            pageSizeOptions={[5, 10]}
            showPageSizeSelector
            enableColumnSearch={false}
            globalSearchPlaceholder="Search action log..."
            getRowKey={(row) => row.id}
          />
        </article>

        <div className="case-action-bar">
          {[
            'Submit',
            'Forward',
            'Recommend',
            'Approve',
            'Return',
            'Hold',
          ].map((label) => (
            <button
              key={label}
              type="button"
              className="primary-btn action-btn"
              disabled={!details.isInbox}
            >
              {label}
            </button>
          ))}
        </div>
      </main>
    </section>
  )
}

export default ViewCasePage
