import axios from 'axios';
import { Student, StudentWallet, AcademicRecord, DigitalDocument } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const identityService = {
    register: (data: any) => api.post<Student>('/identity/register', data),
    verify: (qrSignature: string) => api.get<boolean>(`/identity/verify?qrSignature=${qrSignature}`),
};

export const walletService = {
    getWallet: (studentId: number) => api.get<StudentWallet>(`/wallet/${studentId}`),
    topup: (studentId: number, amount: number) => api.post(`/wallet/${studentId}/topup?amount=${amount}`),
    getDocuments: (studentId: number) => api.get<DigitalDocument[]>(`/wallet/${studentId}/documents`),
};

export const academicService = {
    getRecords: (studentId: number) => api.get<AcademicRecord[]>(`/academic/${studentId}`),
};

export default api;
