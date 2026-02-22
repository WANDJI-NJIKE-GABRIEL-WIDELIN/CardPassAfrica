import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authApi } from '../services/api'
import { useToast } from '../hooks/useToast'

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()
    const { addToast, ToastContainer } = useToast()

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await authApi.login(form)
            login(data, data.token)
            addToast('Welcome back!', 'success')
            setTimeout(() => {
                if (data.role === 'STUDENT') navigate('/student/dashboard')
                else if (data.role === 'INSTITUTION_ADMIN') navigate('/institution/dashboard')
                else navigate('/admin')
            }, 500)
        } catch (err) {
            const msg = err.response?.data?.error || 'Login failed. Check your credentials.'
            addToast(msg, 'error')
        } finally {
            setLoading(false)
        }
    }

    // Demo quick-login buttons
    const demoLogin = async (email) => {
        setForm({ email, password: 'demo1234' })
        setLoading(true)
        try {
            const { data } = await authApi.login({ email, password: 'demo1234' })
            login(data, data.token)
            if (data.role === 'STUDENT') navigate('/student/dashboard')
            else if (data.role === 'INSTITUTION_ADMIN') navigate('/institution/dashboard')
            else navigate('/admin')
        } catch {
            addToast('Demo login unavailable — backend may not be running', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-page">
            <ToastContainer />
            <div className="auth-card">
                <Link to="/" className="auth-logo">
                    <div className="auth-logo-icon">🎓</div>
                    <span style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem' }}>EduChain</span>
                </Link>

                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-sub">Sign in to access your academic identity</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email address</label>
                        <input
                            className="form-input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            className="form-input"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                        {loading ? <span className="loader" /> : '→'} {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                {/* Demo accounts */}
                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(232,168,56,0.07)', borderRadius: '12px', border: '1px solid rgba(232,168,56,0.2)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        🎯 Demo Accounts
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button className="btn btn-secondary btn-sm" onClick={() => demoLogin('john.doe@student.educhain.africa')}>
                            👤 Student
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => demoLogin('contact@uy1.cm')}>
                            🏛️ Institution
                        </button>
                        <button className="btn btn-secondary btn-sm" onClick={() => demoLogin('admin@educhain.africa')}>
                            ⚙️ Admin
                        </button>
                    </div>
                </div>

                <div className="auth-footer">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    )
}
