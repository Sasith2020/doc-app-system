import CasesPanel from './CasesPanel'
import type { CaseRow } from './CasesPanel'

const pendingCases = [
  { id: 'CASE-10101', div: 'DIV-02', status: 'Pending', bucket: 'Review' },
  { id: 'CASE-10102', div: 'DIV-05', status: 'Pending', bucket: 'Review' },
  { id: 'CASE-10103', div: 'DIV-07', status: 'Pending', bucket: 'Validation' },
]

type PendingTabProps = {
  onViewCase: (row: CaseRow) => void
}

function PendingTab({ onViewCase }: PendingTabProps) {
  return (
    <CasesPanel
      title="Pending cases"
      description="Cases awaiting validation or review."
      data={pendingCases}
      onViewCase={onViewCase}
    />
  )
}

export default PendingTab
