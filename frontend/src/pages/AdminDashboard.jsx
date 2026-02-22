import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/AuthContext'
import { institutionApi, studentApi, dashboardApi } from '../services/api'
import { useToast } from '../hooks/useToast'

export default function AdminDashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { addToast, ToastContainer } = useToast()
    const [institutions, setInstitutions] = useState([])
    const [students, setStudents] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        if (!user || user.role !== 'PLATFORM_ADMIN') { navigate('/login'); return }
        Promise.all([
            institutionApi.listAll(),
            studentApi.listAll(),
            dashboardApi.getStats(),
        ]).then(([instRes, studRes, statsRes]) => {
            setInstitutions(instRes.data)
            setStudents(studRes.data)
            setStats(statsRes.data)
        }).catch(() => addToast('Failed to load admin data', 'error'))
            .finally(() => setLoading(false))
    }, [user])

    const verifyInstitution = async (id) => {
        try {
            await institutionApi.verify(id)
            setInstitutions(prev => prev.map(i => i.id === id ? { ...i, verified: true } : i))
            addToast('Institution verified successfully! ✅', 'success')
        } catch {
            addToast('Failed to verify institution', 'error')
        }
    }

    if (loading) return (
        <><NavBar /><div className="page-loader" style={{ marginTop: '100px' }}><div className="loader" /><p>Loading admin dashboard…</p></div></>
    )

    const pending = institutions.filter(i => !i.verified)
    const verified = institutions.filter(i => i.verified)

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="dashboard-layout">
                <aside className="sidebar">
                    <div style={{ padding: '0 16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
                        <div style={{ width: 52, height: 52, borderRadius: '10px', background: 'linear-gradient(135deg,#9b59b6,#8e44ad)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '12px' }}>
                            ⚙️
                        </div>
                        <div style={{ fontWeight: 600 }}>Platform Admin</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-gray-400)', marginTop: '2px' }}>{user?.email}</div>
                    </div>

                    <div className="sidebar-section-label">Admin Panel</div>
                    <ul className="sidebar-nav">
                        {[
                            { id: 'overview', icon: '📊', label: 'Overview' },
                            { id: 'institutions', icon: '🏛️', label: `Institutions (${pending.length} pending)` },
                            { id: 'students', icon: '🎓', label: 'All Students' },
                        ].map(item => (
                            <li key={item.id}>
                                <button
                                    className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`}
                                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    {item.icon} {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div style={{ padding: '16px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { logout(); navigate('/') }}>
                            Sign Out
                        </button>
                    </div>
                </aside>

                <main className="dashboard-main">
                    {activeTab === 'overview' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">EduChain Overview</h1>
                                <p className="page-subtitle">Platform-wide statistics and health</p>
                            </div>
                            <div className="stats-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                                {[
                                    { label: 'Total Students', value: stats?.totalStudents || students.length, icon: '🎓', color: 'var(--color-gold)' },
                                    { label: 'Credentials Issued', value: stats?.totalCredentials || '—', icon: '📜', color: 'var(--color-green)' },
                                    { label: 'Verified Institutions', value: verified.length, icon: '🏛️', color: '#3498db' },
                                    { label: 'Pending Approval', value: pending.length, icon: '⏳', color: 'var(--color-gold)' },
                                    { label: 'Countries', value: stats?.countriesRepresented || '—', icon: '🌍', color: 'var(--color-green)' },
                                ].map(s => (
                                    <div key={s.label} className="mini-stat">
                                        <div className="mini-stat-label">{s.icon} {s.label}</div>
                                        <div className="mini-stat-value" style={{ color: s.color }}>{s.value}</div>
                                    </div>
                                ))}
                            </div>

                            {pending.length > 0 && (
                                <div className="card" style={{ background: 'rgba(232,168,56,0.05)', borderColor: 'rgba(232,168,56,0.3)', marginTop: '8px' }}>
                                    <h3 style={{ color: 'var(--color-gold)', marginBottom: '16px' }}>⏳ {pending.length} Institution(s) Awaiting Verification</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {pending.map(inst => (
                                            <div key={inst.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px' }}>
                                                <div>
                                                    <div style={{ fontWeight: 600 }}>{inst.name}</div>
                                                    <div style={{ fontSize: '0.82rem', color: 'var(--color-gray-400)' }}>{inst.country} · {inst.contactEmail}</div>
                                                </div>
                                                <button className="btn btn-green btn-sm" onClick={() => verifyInstitution(inst.id)}>
                                                    ✓ Approve
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'institutions' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">Institutions</h1>
                                <p className="page-subtitle">{institutions.length} total · {verified.length} verified · {pending.length} pending</p>
                            </div>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Country</th>
                                            <th>Accreditation #</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {institutions.map(inst => (
                                            <tr key={inst.id}>
                                                <td style={{ fontWeight: 500 }}>{inst.name}</td>
                                                <td>{inst.country}</td>
                                                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{inst.accreditationNumber || '—'}</td>
                                                <td style={{ color: 'var(--color-gray-400)' }}>{inst.contactEmail}</td>
                                                <td>
                                                    <span className={`badge ${inst.verified ? 'badge-green' : 'badge-gold'}`}>
                                                        {inst.verified ? '✓ Verified' : '⏳ Pending'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {!inst.verified && (
                                                        <button className="btn btn-green btn-sm" onClick={() => verifyInstitution(inst.id)}>
                                                            Approve
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === 'students' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">All Students</h1>
                                <p className="page-subtitle">{students.length} registered students across Africa</p>
                            </div>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Country</th>
                                            <th>DID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(s => (
                                            <tr key={s.id}>
                                                <td style={{ fontWeight: 500 }}>{s.firstName} {s.lastName}</td>
                                                <td style={{ color: 'var(--color-gray-400)' }}>{s.email}</td>
                                                <td>{s.country}</td>
                                                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--color-gold)' }}>
                                                    {s.did ? s.did.slice(0, 32) + '…' : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    )
}
