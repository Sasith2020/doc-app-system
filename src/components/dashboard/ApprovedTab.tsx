import CasesPanel from './CasesPanel'
import type { CaseRow } from './CasesPanel'

const approvedCases = [
  { id: 'CASE-10210', div: 'DIV-03', status: 'Approved', bucket: 'Complete' },
  { id: 'CASE-10211', div: 'DIV-08', status: 'Approved', bucket: 'Complete' },
]

type ApprovedTabProps = {
  onViewCase: (row: CaseRow) => void
}

function ApprovedTab({ onViewCase }: ApprovedTabProps) {
  return (
    <CasesPanel
      title="Approved cases"
      description="Cases approved and closed out."
      data={approvedCases}
      onViewCase={onViewCase}
    />
  )
}

export default ApprovedTab
