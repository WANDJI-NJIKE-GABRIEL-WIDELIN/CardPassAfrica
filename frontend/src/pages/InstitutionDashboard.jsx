import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/AuthContext'
import { institutionApi, studentApi, credentialApi } from '../services/api'
import { useToast } from '../hooks/useToast'

const STATUS_BADGE = { ACTIVE: 'badge-green', REVOKED: 'badge-red', PENDING: 'badge-gold' }

export default function InstitutionDashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { addToast, ToastContainer } = useToast()
    const [institution, setInstitution] = useState(null)
    const [students, setStudents] = useState([])
    const [issuedCreds, setIssuedCreds] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('issue')
    const [issuing, setIssuing] = useState(false)

    const [form, setForm] = useState({
        studentId: '', title: '', fieldOfStudy: '',
        credentialType: 'DEGREE', issueDate: new Date().toISOString().slice(0, 10),
        grade: '', honors: ''
    })

    useEffect(() => {
        if (!user) { navigate('/login'); return }
        Promise.all([
            institutionApi.listVerified(),
            studentApi.listAll().catch(() => ({ data: [] })),
        ]).then(([instRes, studRes]) => {
            const myInst = instRes.data.find(i => i.id === user.entityId)
            setInstitution(myInst)
            setStudents(studRes.data)
            if (user.entityId) {
                return credentialApi.getById('institution-placeholder').catch(() => {
                    // Fall back: load individually (hackathon demo)
                    return { data: [] }
                })
            }
        }).catch(() => addToast('Failed to load dashboard data', 'error'))
            .finally(() => setLoading(false))
    }, [user])

    const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const handleIssue = async e => {
        e.preventDefault()
        setIssuing(true)
        try {
            await credentialApi.issue({ ...form, studentId: Number(form.studentId) })
            addToast('✅ Credential issued successfully!', 'success')
            setForm(f => ({ ...f, studentId: '', title: '', fieldOfStudy: '', grade: '', honors: '' }))
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to issue credential'
            addToast(msg, 'error')
        } finally {
            setIssuing(false)
        }
    }

    if (loading) return (
        <><NavBar /><div className="page-loader" style={{ marginTop: '100px' }}><div className="loader" /><p>Loading institution dashboard…</p></div></>
    )

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="dashboard-layout">

                {/* SIDEBAR */}
                <aside className="sidebar">
                    <div style={{ padding: '0 16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
                        <div style={{ width: 52, height: 52, borderRadius: '10px', background: 'linear-gradient(135deg,#2ECC71,#27ae60)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '12px' }}>
                            🏛️
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{institution?.name || 'Institution'}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-gray-400)', marginTop: '2px' }}>{institution?.country}</div>
                        {institution?.verified ? (
                            <span className="badge badge-green" style={{ marginTop: '8px' }}>✓ Verified</span>
                        ) : (
                            <span className="badge badge-gold" style={{ marginTop: '8px' }}>⏳ Pending Verification</span>
                        )}
                    </div>

                    <div className="sidebar-section-label">Actions</div>
                    <ul className="sidebar-nav">
                        {[
                            { id: 'issue', icon: '📜', label: 'Issue Credential' },
                            { id: 'students', icon: '🎓', label: 'All Students' },
                            { id: 'profile', icon: '🏛️', label: 'Institution Profile' },
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
                        <li>
                            <Link to="/verify" className="sidebar-link">🔍 Verify Credential</Link>
                        </li>
                    </ul>

                    <div style={{ padding: '16px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { logout(); navigate('/') }}>
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* MAIN */}
                <main className="dashboard-main">

                    {activeTab === 'issue' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">Issue Credential</h1>
                                <p className="page-subtitle">Grant tamper-proof academic credentials to your students</p>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: 900 }}>
                                {/* Form */}
                                <div className="card card-no-hover">
                                    <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>📋 Credential Details</h3>
                                    <form onSubmit={handleIssue}>
                                        <div className="form-group">
                                            <label className="form-label">Student</label>
                                            <select className="form-input" name="studentId" value={form.studentId} onChange={handleChange} required>
                                                <option value="">Select student…</option>
                                                {students.map(s => (
                                                    <option key={s.id} value={s.id}>{s.firstName} {s.lastName} — {s.email}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Credential Type</label>
                                            <select className="form-input" name="credentialType" value={form.credentialType} onChange={handleChange}>
                                                <option value="DEGREE">Degree</option>
                                                <option value="DIPLOMA">Diploma</option>
                                                <option value="CERTIFICATE">Certificate</option>
                                                <option value="TRANSCRIPT">Transcript</option>
                                                <option value="BADGE">Badge</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Title</label>
                                            <input className="form-input" name="title" value={form.title} onChange={handleChange} placeholder="Bachelor of Science in Computer Science" required />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">Field of Study</label>
                                            <input className="form-input" name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} placeholder="Computer Science" />
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label className="form-label">Issue Date</label>
                                                <input className="form-input" type="date" name="issueDate" value={form.issueDate} onChange={handleChange} required />
                                            </div>
                                            <div className="form-group" style={{ marginBottom: 0 }}>
                                                <label className="form-label">Grade</label>
                                                <input className="form-input" name="grade" value={form.grade} onChange={handleChange} placeholder="A, B+, 17/20…" />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: '20px' }} />

                                        <div className="form-group">
                                            <label className="form-label">Honours (optional)</label>
                                            <input className="form-input" name="honors" value={form.honors} onChange={handleChange} placeholder="Magna Cum Laude, Cum Laude…" />
                                        </div>

                                        <button type="submit" className="btn btn-green" style={{ width: '100%', justifyContent: 'center' }} disabled={issuing}>
                                            {issuing ? <span className="loader" /> : '🔐'} {issuing ? 'Issuing…' : 'Issue Credential'}
                                        </button>
                                    </form>
                                </div>

                                {/* Info panel */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div className="card card-no-hover" style={{ background: 'rgba(46,204,113,0.06)', border: '1px solid rgba(46,204,113,0.2)' }}>
                                        <h4 style={{ color: 'var(--color-green)', marginBottom: '12px', fontSize: '0.95rem' }}>🔐 How It Works</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', lineHeight: 1.7 }}>
                                            When you issue a credential, EduChain generates a unique SHA-256 hash from the content.
                                            This hash is stored permanently and can be used to verify authenticity at any time — even if we're offline.
                                        </p>
                                    </div>
                                    <div className="card card-no-hover" style={{ background: 'rgba(232,168,56,0.06)', border: '1px solid rgba(232,168,56,0.2)' }}>
                                        <h4 style={{ color: 'var(--color-gold)', marginBottom: '12px', fontSize: '0.95rem' }}>⚠️ Important</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', lineHeight: 1.7 }}>
                                            Credentials are permanent once issued. If you issue a duplicate (same student, title, date & grade) the system will reject it to prevent fraud.
                                        </p>
                                    </div>
                                    <div className="mini-stat">
                                        <div className="mini-stat-label">Students in System</div>
                                        <div className="mini-stat-value">{students.length}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'students' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">All Students</h1>
                                <p className="page-subtitle">{students.length} students registered on EduChain</p>
                            </div>
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Country</th>
                                            <th>DID</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(s => (
                                            <tr key={s.id}>
                                                <td style={{ fontWeight: 500 }}>{s.firstName} {s.lastName}</td>
                                                <td style={{ color: 'var(--color-gray-400)' }}>{s.email}</td>
                                                <td>{s.country}</td>
                                                <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--color-gold)' }}>
                                                    {s.did ? s.did.slice(0, 28) + '…' : '—'}
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" onClick={() => { setForm(f => ({ ...f, studentId: String(s.id) })); setActiveTab('issue') }}>
                                                        Issue Credential
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {activeTab === 'profile' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">Institution Profile</h1>
                                <p className="page-subtitle">Your institution on the EduChain network</p>
                            </div>
                            <div className="card card-no-hover" style={{ maxWidth: 560 }}>
                                {[
                                    { label: 'Name', value: institution?.name },
                                    { label: 'Country', value: institution?.country },
                                    { label: 'Accreditation #', value: institution?.accreditationNumber || '—' },
                                    { label: 'Contact Email', value: institution?.contactEmail },
                                    { label: 'Website', value: institution?.website || '—' },
                                    { label: 'Status', value: institution?.verified ? '✅ Verified' : '⏳ Pending verification by admin' },
                                ].map(row => (
                                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                        <span style={{ color: 'var(--color-gray-400)', fontSize: '0.88rem' }}>{row.label}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.92rem' }}>{row.value}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                </main>
            </div>
        </>
    )
}
