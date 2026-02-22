import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
})

// Attach JWT on every request
api.interceptors.request.use(config => {
    const token = localStorage.getItem('educhain_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// Auth
export const authApi = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
}

// Students
export const studentApi = {
    getMe: () => api.get('/students/me'),
    getById: (id) => api.get(`/students/${id}`),
    getCredentials: (id) => api.get(`/students/${id}/credentials`),
    listAll: () => api.get('/students'),
}

// Credentials
export const credentialApi = {
    verify: (hash) => api.get(`/credentials/verify/${encodeURIComponent(hash)}`),
    getById: (id) => api.get(`/credentials/${id}`),
    issue: (data) => api.post('/credentials', data),
    revoke: (id, reason) => api.patch(`/credentials/${id}/revoke`, { reason }),
}

// Institutions
export const institutionApi = {
    listVerified: () => api.get('/institutions'),
    listAll: () => api.get('/institutions/all'),
    getById: (id) => api.get(`/institutions/${id}`),
    verify: (id) => api.patch(`/institutions/${id}/verify`),
}

// Dashboard
export const dashboardApi = {
    getStats: () => api.get('/dashboard/stats'),
}

export default api
