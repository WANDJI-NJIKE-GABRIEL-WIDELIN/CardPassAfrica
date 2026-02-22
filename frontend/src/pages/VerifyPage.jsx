import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import NavBar from '../components/NavBar'
import { credentialApi } from '../services/api'

const STATUS_ICON = { ACTIVE: '✅', REVOKED: '❌', EXPIRED: '⏰', PENDING: '⏳' }
const STATUS_COLOR = { ACTIVE: 'var(--color-green)', REVOKED: 'var(--color-red)', EXPIRED: 'var(--color-gray-400)', PENDING: 'var(--color-gold)' }

export default function VerifyPage() {
    const { hash: urlHash } = useParams()
    const navigate = useNavigate()

    const [hash, setHash] = useState(urlHash ? decodeURIComponent(urlHash) : '')
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(!!urlHash)

    // Auto-verify if hash provided in URL
    useState(() => {
        if (urlHash) {
            verifyHash(decodeURIComponent(urlHash))
        }
    })

    async function verifyHash(h) {
        if (!h?.trim()) return
        setLoading(true)
        setResult(null)
        try {
            const { data } = await credentialApi.verify(h.trim())
            setResult(data)
            setSearched(true)
        } catch {
            setResult({ valid: false, message: 'Could not reach verification server. The credential hash format may be invalid.' })
            setSearched(true)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        navigate(`/verify/${encodeURIComponent(hash.trim())}`)
        verifyHash(hash)
    }

    const cred = result?.credential

    return (
        <>
            <NavBar />
            <div className="verify-page">
                <div className="verify-container">

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
                        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', marginBottom: '12px' }}>
                            Verify a Credential
                        </h1>
                        <p style={{ color: 'var(--color-gray-400)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                            Paste a credential hash below to instantly verify its authenticity — no account required.
                        </p>
                    </div>

                    {/* Search form */}
                    <form onSubmit={handleSubmit} className="verify-input-group">
                        <input
                            className="form-input verify-input"
                            value={hash}
                            onChange={e => setHash(e.target.value)}
                            placeholder="sha256:a1b2c3d4e5f6… or paste full hash here"
                            style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading || !hash.trim()}>
                            {loading ? <span className="loader" /> : '🔍'} {loading ? 'Verifying…' : 'Verify'}
                        </button>
                    </form>

                    {/* Demo hashes */}
                    <div style={{ marginBottom: '32px', padding: '16px', background: 'rgba(232,168,56,0.06)', borderRadius: '12px', border: '1px solid rgba(232,168,56,0.15)' }}>
                        <p style={{ fontSize: '0.78rem', color: 'var(--color-gold)', fontWeight: 600, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            🎯 Try Demo Hashes
                        </p>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {[
                                { label: 'John\'s BSc', hash: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456' },
                                { label: 'Jane\'s MEng', hash: 'sha256:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567f' },
                            ].map(d => (
                                <button
                                    key={d.label}
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => { setHash(d.hash); verifyHash(d.hash) }}
                                >
                                    {d.label}
                                </button>
                            ))}
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => { setHash('sha256:invalid-fake-hash-000000'); verifyHash('sha256:invalid-fake-hash-000000') }}
                            >
                                ❌ Invalid hash
                            </button>
                        </div>
                    </div>

                    {/* Result */}
                    {searched && result && (
                        <div className={`verify-result ${result.valid ? 'verify-valid' : 'verify-invalid'}`}>

                            {/* Status banner */}
                            <div className="verify-status">
                                <div className="verify-status-icon">
                                    {result.valid ? STATUS_ICON[cred?.status] || '✅' : '❌'}
                                </div>
                                <div>
                                    <div className="verify-status-title" style={{ color: result.valid ? STATUS_COLOR[cred?.status] : 'var(--color-red)' }}>
                                        {result.valid
                                            ? cred?.status === 'ACTIVE' ? 'Credential Verified ✓'
                                                : cred?.status === 'REVOKED' ? 'Credential Revoked'
                                                    : `Status: ${cred?.status}`
                                            : 'Credential Not Found'}
                                    </div>
                                    <div className="verify-status-sub">
                                        {result.valid
                                            ? `This credential was issued by ${cred?.institution?.name} and is ${cred?.status === 'ACTIVE' ? 'currently valid' : 'no longer valid'}.`
                                            : result.message || 'No credential matches this hash in our registry.'}
                                    </div>
                                </div>
                            </div>

                            {/* Credential details */}
                            {result.valid && cred && (
                                <>
                                    <div className="verify-detail-grid">
                                        {[
                                            { label: 'Credential Title', value: cred.title },
                                            { label: 'Field of Study', value: cred.fieldOfStudy || '—' },
                                            { label: 'Recipient', value: cred.student?.name },
                                            { label: 'Student DID', value: cred.student?.did || '—' },
                                            { label: 'Issuing Institution', value: cred.institution?.name },
                                            { label: 'Country', value: cred.institution?.country },
                                            { label: 'Issue Date', value: cred.issueDate },
                                            { label: 'Grade', value: cred.grade || '—' },
                                            { label: 'Honours', value: cred.honors || '—' },
                                            { label: 'Institution Verified', value: cred.institution?.verified ? '✅ Accredited' : '⏳ Pending' },
                                        ].map(d => (
                                            <div key={d.label} className="verify-detail-item">
                                                <div className="verify-detail-label">{d.label}</div>
                                                <div className="verify-detail-value">{d.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Hash + QR */}
                                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                                        <p style={{ fontSize: '0.78rem', color: 'var(--color-gray-400)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                                            Integrity Hash (SHA-256)
                                        </p>
                                        <div className="cred-hash" style={{ marginBottom: '20px' }}>{cred.hash}</div>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                            <div style={{ background: 'white', padding: '10px', borderRadius: '10px' }}>
                                                <QRCodeSVG value={window.location.href} size={90} />
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)', lineHeight: 1.6 }}>
                                                This QR code links directly to the verification page for this credential.
                                                Share it with employers, universities, or any third party.
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* How verification works */}
                    {!searched && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px' }}>
                            {[
                                { icon: '📋', title: 'Paste Hash', desc: 'Copy the SHA-256 hash from the credential document or email.' },
                                { icon: '⚡', title: 'Instant Check', desc: 'Our system checks the hash against the tamper-proof registry.' },
                                { icon: '✅', title: 'Trusted Result', desc: 'See full credential details, institution info, and validity status.' },
                            ].map(s => (
                                <div key={s.title} className="card" style={{ textAlign: 'center', padding: '24px' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{s.icon}</div>
                                    <h4 style={{ marginBottom: '8px', fontSize: '1rem' }}>{s.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-400)' }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
