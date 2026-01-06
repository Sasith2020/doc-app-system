import CasesPanel from './CasesPanel'

const pendingCases = [
  { id: 'CASE-10101', div: 'DIV-02', status: 'Pending', bucket: 'Review' },
  { id: 'CASE-10102', div: 'DIV-05', status: 'Pending', bucket: 'Review' },
  { id: 'CASE-10103', div: 'DIV-07', status: 'Pending', bucket: 'Validation' },
]

function PendingTab() {
  return (
    <CasesPanel
      title="Pending cases"
      description="Cases awaiting validation or review."
      data={pendingCases}
    />
  )
}

export default PendingTab
