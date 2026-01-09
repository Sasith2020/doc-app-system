import CasesPanel from './CasesPanel'
import type { CaseRow } from './CasesPanel'

const returnedCases = [
  { id: 'CASE-10320', div: 'DIV-06', status: 'Returned', bucket: 'Fixes' },
  { id: 'CASE-10321', div: 'DIV-04', status: 'Returned', bucket: 'Fixes' },
]

type ReturnedTabProps = {
  onViewCase: (row: CaseRow) => void
}

function ReturnedTab({ onViewCase }: ReturnedTabProps) {
  return (
    <CasesPanel
      title="Returned cases"
      description="Cases returned for corrections or updates."
      data={returnedCases}
      onViewCase={onViewCase}
    />
  )
}

export default ReturnedTab
