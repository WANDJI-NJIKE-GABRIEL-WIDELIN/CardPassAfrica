import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import NavBar from '../components/NavBar'
import { useAuth } from '../context/AuthContext'
import { studentApi } from '../services/api'
import { useToast } from '../hooks/useToast'

const STATUS_BADGE = {
    ACTIVE: 'badge-green',
    REVOKED: 'badge-red',
    EXPIRED: 'badge-gray',
    PENDING: 'badge-gold',
}

const TYPE_ICON = {
    DEGREE: '🎓', DIPLOMA: '📜', CERTIFICATE: '🏅', TRANSCRIPT: '📋', BADGE: '⭐'
}

function CredentialCard({ cred }) {
    const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(cred.hash)}`
    return (
        <div className="credential-card">
            <div className="cred-header">
                <span className="cred-type-badge">{TYPE_ICON[cred.credentialType] || '📄'} {cred.credentialType}</span>
                <span className={`badge ${STATUS_BADGE[cred.status] || 'badge-gray'}`}>{cred.status}</span>
            </div>
            <h3 className="cred-title">{cred.title}</h3>
            <p className="cred-field">{cred.fieldOfStudy}</p>
            <div className="cred-meta">
                <div className="cred-meta-item">
                    <div className="cred-meta-label">Institution</div>
                    <div className="cred-meta-value">{cred.institutionName}</div>
                </div>
                <div className="cred-meta-item">
                    <div className="cred-meta-label">Issue Date</div>
                    <div className="cred-meta-value">{cred.issueDate}</div>
                </div>
                {cred.grade && (
                    <div className="cred-meta-item">
                        <div className="cred-meta-label">Grade</div>
                        <div className="cred-meta-value">{cred.grade}</div>
                    </div>
                )}
                {cred.honors && (
                    <div className="cred-meta-item">
                        <div className="cred-meta-label">Honours</div>
                        <div className="cred-meta-value" style={{ color: 'var(--color-gold)' }}>{cred.honors}</div>
                    </div>
                )}
            </div>

            {/* QR Code */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{ background: 'white', padding: '8px', borderRadius: '8px', flexShrink: 0 }}>
                    <QRCodeSVG value={verifyUrl} size={72} />
                </div>
                <div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)', marginBottom: '4px' }}>Scan to verify</p>
                    <a href={verifyUrl} style={{ fontSize: '0.78rem', color: 'var(--color-gold)' }} target="_blank" rel="noreferrer">
                        View verification page →
                    </a>
                </div>
            </div>

            <div className="cred-hash">
                <span style={{ color: 'var(--color-gray-600)', marginRight: '6px' }}>Hash:</span>
                {cred.hash}
            </div>
        </div>
    )
}

export default function StudentDashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { addToast, ToastContainer } = useToast()
    const [profile, setProfile] = useState(null)
    const [credentials, setCredentials] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('credentials')

    useEffect(() => {
        if (!user) { navigate('/login'); return }
        Promise.all([
            studentApi.getMe(),
            user.entityId ? studentApi.getCredentials(user.entityId) : Promise.resolve({ data: [] })
        ]).then(([profileRes, credsRes]) => {
            setProfile(profileRes.data)
            setCredentials(credsRes.data)
        }).catch(() => addToast('Failed to load profile data', 'error'))
            .finally(() => setLoading(false))
    }, [user])

    if (loading) return (
        <><NavBar /><div className="page-loader" style={{ marginTop: '100px' }}><div className="loader" /><p>Loading your academic identity…</p></div></>
    )

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="dashboard-layout">

                {/* SIDEBAR */}
                <aside className="sidebar">
                    <div style={{ padding: '0 16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }}>
                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg,#E8A838,#f5c86a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '12px' }}>
                            🎓
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{profile?.firstName} {profile?.lastName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-gray-400)', marginTop: '2px' }}>{profile?.country}</div>
                        {profile?.did && <div style={{ fontSize: '0.68rem', color: 'var(--color-gold)', marginTop: '6px', fontFamily: 'monospace', opacity: 0.8 }}>{profile.did.slice(0, 30)}…</div>}
                    </div>

                    <div className="sidebar-section-label">Navigation</div>
                    <ul className="sidebar-nav">
                        {[
                            { id: 'credentials', icon: '📜', label: 'My Credentials' },
                            { id: 'profile', icon: '👤', label: 'My Profile' },
                            { id: 'verify', icon: '🔍', label: 'Verify Credential', link: '/verify' },
                        ].map(item => (
                            <li key={item.id}>
                                {item.link
                                    ? <Link to={item.link} className="sidebar-link">{item.icon} {item.label}</Link>
                                    : <button className={`sidebar-link ${activeTab === item.id ? 'active' : ''}`} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }} onClick={() => setActiveTab(item.id)}>
                                        {item.icon} {item.label}
                                    </button>
                                }
                            </li>
                        ))}
                    </ul>

                    <div style={{ padding: '16px', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                        <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { logout(); navigate('/') }}>
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="dashboard-main">
                    {activeTab === 'credentials' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">My Credentials</h1>
                                <p className="page-subtitle">Your verified academic achievements on the blockchain</p>
                            </div>

                            <div className="stats-row">
                                <div className="mini-stat">
                                    <div className="mini-stat-label">Total Credentials</div>
                                    <div className="mini-stat-value">{credentials.length}</div>
                                </div>
                                <div className="mini-stat">
                                    <div className="mini-stat-label">Active</div>
                                    <div className="mini-stat-value" style={{ color: 'var(--color-green)' }}>
                                        {credentials.filter(c => c.status === 'ACTIVE').length}
                                    </div>
                                </div>
                                <div className="mini-stat">
                                    <div className="mini-stat-label">Your DID</div>
                                    <div style={{ fontSize: '0.75rem', marginTop: '4px', color: 'var(--color-gold)', fontFamily: 'monospace' }}>
                                        {profile?.did || 'Generating…'}
                                    </div>
                                </div>
                            </div>

                            {credentials.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-state-icon">📭</div>
                                    <h3>No credentials yet</h3>
                                    <p>Your verified academic credentials will appear here once your institution issues them.</p>
                                </div>
                            ) : (
                                <div className="credential-card-grid">
                                    {credentials.map(c => <CredentialCard key={c.id} cred={c} />)}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'profile' && (
                        <>
                            <div className="page-header">
                                <h1 className="page-title">My Profile</h1>
                                <p className="page-subtitle">Your EduChain digital identity</p>
                            </div>
                            <div className="card card-no-hover" style={{ maxWidth: 560 }}>
                                {[
                                    { label: 'Full Name', value: `${profile?.firstName} ${profile?.lastName}` },
                                    { label: 'Email', value: profile?.email },
                                    { label: 'Country', value: profile?.country },
                                    { label: 'Phone', value: profile?.phone || '—' },
                                    { label: 'Decentralized ID (DID)', value: profile?.did, mono: true },
                                    { label: 'Member Since', value: profile?.createdAt?.slice(0, 10) },
                                ].map(row => (
                                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                        <span style={{ color: 'var(--color-gray-400)', fontSize: '0.88rem' }}>{row.label}</span>
                                        <span style={{ fontWeight: 500, fontSize: '0.92rem', fontFamily: row.mono ? 'monospace' : 'inherit', color: row.mono ? 'var(--color-gold)' : 'inherit' }}>{row.value}</span>
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
