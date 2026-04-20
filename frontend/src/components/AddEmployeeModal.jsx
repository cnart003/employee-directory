import { useState } from 'react'
import './AddEmployeeModal.css'

const EMPTY = { name: '', department: '', title: '', email: '', phone: '', location: '' }

export default function AddEmployeeModal({ departments, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.department.trim() || form.department === '__new__') e.department = 'Required'
    if (!form.title.trim()) e.title = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setSubmitting(true)
    try { await onSubmit(form) }
    finally { setSubmitting(false) }
  }

  const field = (key, label, placeholder, type = 'text') => (
    <div className="field">
      <label>{label} {['name','title','email'].includes(key) && <span className="req">*</span>}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => { setForm(f => ({...f, [key]: e.target.value})); setErrors(er => ({...er, [key]: ''})) }}
        className={errors[key] ? 'err' : ''}
      />
      {errors[key] && <span className="err-msg">{errors[key]}</span>}
    </div>
  )

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Employee</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {field('name', 'Full Name', 'e.g. Jane Smith')}

          <div className="field">
            <label>Department <span className="req">*</span></label>
            {form.department === '__new__' ? (
              <input
                type="text"
                placeholder="Enter new department name..."
                autoFocus
                onChange={e => setForm(f => ({...f, department: e.target.value || '__new__'}))}
                className={errors.department ? 'err' : ''}
              />
            ) : (
              <select
                value={form.department}
                onChange={e => { setForm(f => ({...f, department: e.target.value})); setErrors(er => ({...er, department: ''})) }}
                className={errors.department ? 'err' : ''}
              >
                <option value="">Select department...</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
                <option value="__new__">+ New department</option>
              </select>
            )}
            {errors.department && <span className="err-msg">{errors.department}</span>}
          </div>

          {field('title', 'Job Title', 'e.g. Software Engineer')}
          {field('email', 'Email', 'jane@company.com', 'email')}
          {field('phone', 'Phone', '312-555-0000')}
          {field('location', 'Location', 'Chicago, IL')}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Employee'}
          </button>
        </div>
      </div>
    </div>
  )
}