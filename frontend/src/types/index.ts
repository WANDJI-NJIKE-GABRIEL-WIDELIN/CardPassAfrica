export interface Student {
    studentId: number;
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    email: string;
    phone: string;
}

export interface DigitalIdentity {
    identityId: number;
    biometricHash: string;
    qrCodeSignature: string;
    status: 'ACTIVE' | 'INACTIVE' | 'FLAGGED';
}

export interface AcademicRecord {
    recordId: number;
    credits: number;
    gpa: number;
    transcriptHash: string;
    university: {
        name: string;
        country: string;
    };
}

export interface StudentWallet {
    walletId: number;
    balance: number;
    currency: string;
    documents: DigitalDocument[];
}

export interface DigitalDocument {
    documentId: number;
    type: string;
    documentHash: string;
    issuer: string;
}
