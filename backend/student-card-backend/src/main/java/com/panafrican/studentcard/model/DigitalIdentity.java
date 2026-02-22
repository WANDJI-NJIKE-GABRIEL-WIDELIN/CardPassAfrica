package com.panafrican.studentcard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "digital_identities")
@Data
public class DigitalIdentity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long identityId;
    
    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    private String biometricHash;
    private String qrCodeSignature;
    private String status; // ACTIVE, INACTIVE, FLAGGED

    // Continental Trust (W3C/MOSIP Aligned)
    private String decentralizedId; // "did:pan:student-..."
    private String proofLevel; // "LOW", "MEDIUM", "HIGH" (Biometric binding level)
    private String credentialVersion; // "v1.0-AfCFTA"
}
