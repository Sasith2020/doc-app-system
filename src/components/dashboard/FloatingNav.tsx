type FloatingNavProps = {
  activeTab: string
  onChange: (tab: string) => void
}

const tabs = ['inbox', 'pending', 'approved', 'returned', 'holed']

function FloatingNav({ activeTab, onChange }: FloatingNavProps) {
  return (
    <div className="floating-nav">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`tab ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default FloatingNav
