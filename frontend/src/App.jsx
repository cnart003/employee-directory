import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import EmployeeGrid from './components/EmployeeGrid'
import SearchBar from './components/SearchBar'
import AddEmployeeModal from './components/AddEmployeeModal'
import './App.css'

const API = 'http://localhost:5000/api'

export default function App() {
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')
  const [activeDept, setActiveDept] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (activeDept) params.department = activeDept
      const res = await axios.get(`${API}/employees`, { params })
      setEmployees(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [search, activeDept])

  useEffect(() => { fetchEmployees() }, [fetchEmployees])

  useEffect(() => {
    axios.get(`${API}/departments`).then(r => setDepartments(r.data))
  }, [])

  const handleAdd = async (formData) => {
    await axios.post(`${API}/employees`, formData)
    setShowModal(false)
    fetchEmployees()
    const deptRes = await axios.get(`${API}/departments`)
    setDepartments(deptRes.data)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <div className="logo-mark">ED</div>
          <div>
            <h1 className="app-title">Employee Directory</h1>
            <p className="app-sub">Internal Staff Portal</p>
          </div>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <span>+</span> Add Employee
        </button>
      </header>

      <main className="main">
        <SearchBar
          search={search}
          onSearch={setSearch}
          departments={departments}
          activeDept={activeDept}
          onDeptChange={setActiveDept}
          count={employees.length}
        />
        <EmployeeGrid employees={employees} loading={loading} />
      </main>

      {showModal && (
        <AddEmployeeModal
          departments={departments}
          onClose={() => setShowModal(false)}
          onSubmit={handleAdd}
        />
      )}
    </div>
  )
}