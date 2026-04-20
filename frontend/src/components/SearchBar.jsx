import './SearchBar.css'

export default function SearchBar({ search, onSearch, departments, activeDept, onDeptChange, count }) {
  return (
    <div className="search-section">
      <div className="search-row">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or department..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={() => onSearch('')}>×</button>
          )}
        </div>
        <span className="count-badge">{count} employee{count !== 1 ? 's' : ''}</span>
      </div>

      <div className="dept-filters">
        <button
          className={`dept-pill ${activeDept === '' ? 'active' : ''}`}
          onClick={() => onDeptChange('')}
        >All</button>
        {departments.map(d => (
          <button
            key={d}
            className={`dept-pill ${activeDept === d ? 'active' : ''}`}
            onClick={() => onDeptChange(d)}
          >{d}</button>
        ))}
      </div>
    </div>
  )
}