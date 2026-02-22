package com.educhain.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "credentials")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id", nullable = false)
    private Institution institution;

    @Column(nullable = false)
    private String title;

    @Column(name = "field_of_study")
    private String fieldOfStudy;

    @Enumerated(EnumType.STRING)
    @Column(name = "credential_type", nullable = false)
    private CredentialType credentialType = CredentialType.DEGREE;

    @Column(name = "issue_date", nullable = false)
    private LocalDate issueDate;

    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    private String grade;
    private String honors;

    @Column(name = "qr_code_url")
    private String qrCodeUrl;

    @Column(nullable = false, unique = true)
    private String hash; // SHA-256 of credential content

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CredentialStatus status = CredentialStatus.ACTIVE;

    @Column(name = "revocation_reason")
    private String revocationReason;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum CredentialType {
        DEGREE, DIPLOMA, CERTIFICATE, TRANSCRIPT, BADGE
    }

    public enum CredentialStatus {
        ACTIVE, REVOKED, EXPIRED, PENDING
    }
}
