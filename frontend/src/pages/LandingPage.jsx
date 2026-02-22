import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { dashboardApi } from '../services/api'

function useCountUp(target, duration = 2000) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setCount(target); clearInterval(timer) }
            else setCount(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [target, duration])
    return count
}

const FEATURES = [
    { icon: '🔐', color: 'gold', title: 'Tamper-Proof Credentials', desc: 'Every credential is SHA-256 hashed and stored immutably. Universities cannot alter, backdoor, or revoke records unfairly.' },
    { icon: '🌍', color: 'green', title: 'Pan-African Identity', desc: 'One digital ID works across all 54 African countries. Students carry their full academic history across borders.' },
    { icon: '⚡', color: 'blue', title: 'Instant Verification', desc: 'Employers and universities verify credentials in seconds. No delays, no phone calls to registries, no fraud.' },
    { icon: '📱', color: 'purple', title: 'Mobile-First Design', desc: 'Optimized for low-bandwidth, 2G/3G networks across Africa. Works on any device, anywhere on the continent.' },
    { icon: '💰', color: 'gold', title: 'Financial Inclusion', desc: 'Verified academic records unlock scholarships, student loans, and banking services previously inaccessible.' },
    { icon: '🤖', color: 'green', title: 'AI Fraud Detection', desc: 'Machine learning algorithms flag suspicious issuance patterns, protecting the integrity of the entire ecosystem.' },
]

const STEPS = [
    { n: '1', title: 'Institution Issues Credential', desc: 'Accredited universities and colleges issue digital credentials directly on EduChain — signed and hashed.' },
    { n: '2', title: 'Student Receives Identity', desc: 'Graduates receive a permanent, portable digital wallet with all academic achievements linked to their unique DID.' },
    { n: '3', title: 'World Verifies Instantly', desc: 'Any employer, government, or university scans the QR code or pastes a hash — verification is instant and free.' },
]

export default function LandingPage() {
    const [stats, setStats] = useState({ totalStudents: 48700, totalInstitutions: 124, totalCredentials: 215000, countriesRepresented: 32 })

    useEffect(() => {
        dashboardApi.getStats().then(r => setStats(r.data)).catch(() => { })
    }, [])

    const students = useCountUp(stats.totalStudents)
    const institutions = useCountUp(stats.totalInstitutions)
    const credentials = useCountUp(stats.totalCredentials)
    const countries = useCountUp(stats.countriesRepresented)

    return (
        <>
            <NavBar />

            {/* HERO */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-eyebrow">🌍 Pan-African Academic Trust Layer</div>
                    <h1 className="hero-title">
                        Your Degree.<br />
                        <span>Verified Forever.</span>
                    </h1>
                    <p className="hero-subtitle">
                        EduChain is the decentralized academic identity infrastructure for Africa — giving students
                        tamper-proof, portable credentials that employers and institutions trust globally.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn btn-primary btn-lg">🚀 Get Your Digital ID</Link>
                        <Link to="/verify" className="btn btn-secondary btn-lg">🔍 Verify a Credential</Link>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="stats-section">
                <div className="stats-grid">
                    {[
                        { icon: '🎓', value: students.toLocaleString() + '+', label: 'Students Registered' },
                        { icon: '🏛️', value: institutions, label: 'Partner Institutions' },
                        { icon: '📜', value: credentials.toLocaleString() + '+', label: 'Credentials Issued' },
                        { icon: '🌍', value: countries, label: 'Countries' },
                    ].map(s => (
                        <div key={s.label} className="stat-card">
                            <div className="stat-icon">{s.icon}</div>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="features-section" id="features">
                <div className="container">
                    <div className="section-header">
                        <span className="section-eyebrow">Why EduChain</span>
                        <h2 className="section-title">Built for Africa's Academic Future</h2>
                        <p className="section-subtitle">Every feature designed around the real challenges facing African students, institutions, and employers.</p>
                    </div>
                    <div className="features-grid">
                        {FEATURES.map(f => (
                            <div key={f.title} className="feature-card">
                                <div className={`feature-icon feature-icon-${f.color}`}>{f.icon}</div>
                                <h3 className="feature-title">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="how-section" id="how-it-works">
                <div className="container">
                    <div className="section-header">
                        <span className="section-eyebrow">Process</span>
                        <h2 className="section-title">How EduChain Works</h2>
                        <p className="section-subtitle">A simple, three-step flow that creates absolute trust between students, institutions, and the world.</p>
                    </div>
                    <div className="steps-grid">
                        {STEPS.map(s => (
                            <div key={s.n} className="step-card">
                                <div className="step-number">{s.n}</div>
                                <h3 className="step-title">{s.title}</h3>
                                <p className="step-desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <h2 className="cta-title">Ready to join Africa's academic revolution?</h2>
                    <p className="cta-sub">Join thousands of students and institutions already using EduChain.</p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/register" className="btn btn-primary btn-lg">Register as Student</Link>
                        <Link to="/register?role=institution" className="btn btn-secondary btn-lg">Register Institution</Link>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-logo">🎓 EduChain</div>
                <p className="footer-tagline">Pan-African Academic Digital Identity Infrastructure</p>
                <div className="footer-links">
                    <Link to="/verify">Verify Credential</Link>
                    <Link to="/login">Sign In</Link>
                    <Link to="/register">Register</Link>
                    <a href="#features">Features</a>
                </div>
                <p className="footer-copy">© 2026 EduChain · Building Africa's academic future, one credential at a time.</p>
            </footer>
        </>
    )
}
