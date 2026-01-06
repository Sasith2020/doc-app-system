import CasesPanel from './CasesPanel'

const holedCases = [
  { id: 'CASE-10401', div: 'DIV-01', status: 'Holed', bucket: 'On Hold' },
  { id: 'CASE-10402', div: 'DIV-09', status: 'Holed', bucket: 'On Hold' },
]

function HoledTab() {
  return (
    <CasesPanel
      title="Holed cases"
      description="Cases currently placed on hold."
      data={holedCases}
    />
  )
}

export default HoledTab
