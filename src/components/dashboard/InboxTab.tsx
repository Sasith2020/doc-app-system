import CasesPanel from './CasesPanel'
import type { CaseRow } from './CasesPanel'

const inboxCases = [
  { id: 'CASE-10045', div: 'DIV-04', status: 'Inbox', bucket: 'Created' },
  { id: 'CASE-10046', div: 'DIV-02', status: 'Inbox', bucket: 'Created' },
  { id: 'CASE-10047', div: 'DIV-09', status: 'Inbox', bucket: 'Created' },
  { id: 'CASE-10048', div: 'DIV-04', status: 'Inbox', bucket: 'Assigned' },
  { id: 'CASE-10049', div: 'DIV-01', status: 'Inbox', bucket: 'Assigned' },
  { id: 'CASE-10050', div: 'DIV-06', status: 'Inbox', bucket: 'Assigned' },
]

type InboxTabProps = {
  onViewCase: (row: CaseRow) => void
}

function InboxTab({ onViewCase }: InboxTabProps) {
  return (
    <CasesPanel
      title="Inbox cases"
      description="Created cases and cases assigned to your account."
      data={inboxCases}
      onViewCase={onViewCase}
    />
  )
}

export default InboxTab
