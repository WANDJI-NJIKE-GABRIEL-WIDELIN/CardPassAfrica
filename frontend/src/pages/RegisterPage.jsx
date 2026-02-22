import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'
import { useToast } from '../hooks/useToast'

const COUNTRIES = [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde', 'Chad', 'Comoros',
    'Congo', 'Côte d\'Ivoire', 'DR Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon',
    'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi',
    'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Senegal',
    'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Tunisia',
    'Uganda', 'Zambia', 'Zimbabwe'
]

export default function RegisterPage() {
    const [searchParams] = useSearchParams()
    const initialRole = searchParams.get('role') === 'institution' ? 'INSTITUTION_ADMIN' : 'STUDENT'

    const [role, setRole] = useState(initialRole)
    const [form, setForm] = useState({
        username: '', email: '', password: '',
        firstName: '', lastName: '', country: 'Cameroon', phone: '',
        institutionName: '', accreditationNumber: '', website: '',
    })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const { addToast, ToastContainer } = useToast()

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await authApi.register({ ...form, role })
            login(data, data.token)
            addToast('Account created! Welcome to EduChain 🎉', 'success')
            setTimeout(() => {
                if (data.role === 'STUDENT') navigate('/student/dashboard')
                else navigate('/institution/dashboard')
            }, 600)
        } catch (err) {
            const msg = err.response?.data?.error || 'Registration failed. Please try again.'
            addToast(msg, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page" style={{ alignItems: 'flex-start', paddingTop: '40px', paddingBottom: '40px' }}>
            <ToastContainer />
            <div className="auth-card" style={{ maxWidth: '540px' }}>
                <Link to="/" className="auth-logo">
                    <div className="auth-logo-icon">🎓</div>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem' }}>EduChain</span>
                </Link>

                <h1 className="auth-title">Create your identity</h1>
                <p className="auth-sub">Join Africa's academic trust network</p>

                {/* Role selector */}
                <div className="role-selector">
                    <button type="button" className={`role-option ${role === 'STUDENT' ? 'selected' : ''}`} onClick={() => setRole('STUDENT')}>
                        <span className="role-icon">🎓</span>
                        <span className="role-name">Student</span>
                    </button>
                    <button type="button" className={`role-option ${role === 'INSTITUTION_ADMIN' ? 'selected' : ''}`} onClick={() => setRole('INSTITUTION_ADMIN')}>
                        <span className="role-icon">🏛️</span>
                        <span className="role-name">Institution</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">First Name</label>
                            <input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} placeholder="John" required />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Last Name</label>
                            <input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" required />
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }} />

                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input className="form-input" name="username" value={form.username} onChange={handleChange} placeholder="john_doe" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" minLength={6} required />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Country</label>
                            <select className="form-input" name="country" value={form.country} onChange={handleChange}>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                            <label className="form-label">Phone (optional)</label>
                            <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+237 6XX XXX XXX" />
                        </div>
                    </div>
                    <div style={{ marginBottom: '20px' }} />

                    {/* Institution-specific fields */}
                    {role === 'INSTITUTION_ADMIN' && (
                        <>
                            <div style={{ padding: '12px 16px', background: 'rgba(46,204,113,0.07)', borderRadius: '10px', border: '1px solid rgba(46,204,113,0.2)', marginBottom: '20px' }}>
                                <p style={{ fontSize: '0.82rem', color: 'var(--color-green)', fontWeight: 600, marginBottom: '12px' }}>🏛️ Institution Details</p>
                                <div className="form-group">
                                    <label className="form-label">Institution Name</label>
                                    <input className="form-input" name="institutionName" value={form.institutionName} onChange={handleChange} placeholder="University of Example" required />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Accreditation Number</label>
                                    <input className="form-input" name="accreditationNumber" value={form.accreditationNumber} onChange={handleChange} placeholder="CMR-MINSUP-XXX" />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Website</label>
                                    <input className="form-input" type="url" name="website" value={form.website} onChange={handleChange} placeholder="https://www.university.edu" />
                                </div>
                            </div>
                        </>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                        {loading ? <span className="loader" /> : '🚀'} {loading ? 'Creating account…' : 'Create My EduChain ID'}
                    </button>
                </form>

                <div className="auth-footer">
                    Already registered? <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    )
}
