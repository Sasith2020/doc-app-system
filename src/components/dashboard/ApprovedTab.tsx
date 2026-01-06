import CasesPanel from './CasesPanel'

const approvedCases = [
  { id: 'CASE-10210', div: 'DIV-03', status: 'Approved', bucket: 'Complete' },
  { id: 'CASE-10211', div: 'DIV-08', status: 'Approved', bucket: 'Complete' },
]

function ApprovedTab() {
  return (
    <CasesPanel
      title="Approved cases"
      description="Cases approved and closed out."
      data={approvedCases}
    />
  )
}

export default ApprovedTab
