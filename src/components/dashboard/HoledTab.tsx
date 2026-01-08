import CasesPanel from './CasesPanel'
import type { CaseRow } from './CasesPanel'

const holedCases = [
  { id: 'CASE-10401', div: 'DIV-01', status: 'Holed', bucket: 'On Hold' },
  { id: 'CASE-10402', div: 'DIV-09', status: 'Holed', bucket: 'On Hold' },
]

type HoledTabProps = {
  onViewCase: (row: CaseRow) => void
}

function HoledTab({ onViewCase }: HoledTabProps) {
  return (
    <CasesPanel
      title="Holed cases"
      description="Cases currently placed on hold."
      data={holedCases}
      onViewCase={onViewCase}
    />
  )
}

export default HoledTab
