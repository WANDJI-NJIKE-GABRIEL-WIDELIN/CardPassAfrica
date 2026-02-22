import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const dashboardLink = () => {
        if (!user) return '/login'
        if (user.role === 'STUDENT') return '/student/dashboard'
        if (user.role === 'INSTITUTION_ADMIN') return '/institution/dashboard'
        return '/admin'
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">🎓</div>
                    EduChain
                </Link>

                <ul className="navbar-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/verify">Verify</Link></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                </ul>

                <div className="navbar-actions">
                    {user ? (
                        <>
                            <Link to={dashboardLink()} className="btn btn-secondary btn-sm">
                                Dashboard
                            </Link>
                            <button className="btn btn-primary btn-sm" onClick={handleLogout}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary btn-sm">Sign In</Link>
                            <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
