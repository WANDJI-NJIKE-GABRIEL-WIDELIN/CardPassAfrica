import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('educhain_user')
        const token = localStorage.getItem('educhain_token')
        if (stored && token) {
            setUser(JSON.parse(stored))
        }
        setLoading(false)
    }, [])

    const login = (userData, token) => {
        localStorage.setItem('educhain_token', token)
        localStorage.setItem('educhain_user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('educhain_token')
        localStorage.removeItem('educhain_user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
