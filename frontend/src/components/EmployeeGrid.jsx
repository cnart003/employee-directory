import './EmployeeGrid.css'

const DEPT_COLORS = {
  Engineering: '#4f6ef7',
  Design:      '#7c3aed',
  IT:          '#0ea5e9',
  HR:          '#10b981',
  Finance:     '#f59e0b',
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

function EmployeeCard({ emp }) {
  const color = DEPT_COLORS[emp.department] || '#6b7280'
  return (
    <div className="emp-card">
      <div className="card-accent" style={{ background: color }} />
      <div className="card-body">
        <div className="avatar" style={{ background: color + '22', border: `2px solid ${color}55` }}>
          <span style={{ color }}>{getInitials(emp.name)}</span>
        </div>
        <h3 className="emp-name">{emp.name}</h3>
        <p className="emp-title">{emp.title}</p>
        <span className="dept-tag" style={{ background: color + '22', color }}>
          {emp.department}
        </span>
        <div className="emp-details">
          {emp.email && (
            <div className="detail-row">
              <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>{emp.email}</span>
            </div>
          )}
          {emp.phone && (
            <div className="detail-row">
              <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                <path d="M5 3h3l1.5 4-2 1.5a11 11 0 004 4l1.5-2 4 1.5V15a2 2 0 01-2 2C7 17 3 9 3 5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>{emp.phone}</span>
            </div>
          )}
          {emp.location && (
            <div className="detail-row">
              <svg viewBox="0 0 20 20" fill="none" width="13" height="13">
                <path d="M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>{emp.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function EmployeeGrid({ employees, loading }) {
  if (loading) return (
    <div className="state-msg">
      <div className="spinner" />
      <p>Loading employees...</p>
    </div>
  )
  if (!employees.length) return (
    <div className="state-msg">
      <p style={{fontSize:'40px'}}>🔍</p>
      <p>No employees found.</p>
    </div>
  )
  return (
    <div className="emp-grid">
      {employees.map(e => <EmployeeCard key={e.id} emp={e} />)}
    </div>
  )
}