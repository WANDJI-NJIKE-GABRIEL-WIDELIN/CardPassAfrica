import { useState, useCallback } from 'react'

export function useToast() {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now()
        setToasts(t => [...t, { id, message, type }])
        setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), 4000)
    }, [])

    const ToastContainer = () => (
        <div className="toast-container">
            {toasts.map(t => (
                <div key={t.id} className={`toast toast-${t.type}`}>
                    <span>{t.type === 'success' ? '✅' : '❌'}</span>
                    {t.message}
                </div>
            ))}
        </div>
    )

    return { addToast, ToastContainer }
}
