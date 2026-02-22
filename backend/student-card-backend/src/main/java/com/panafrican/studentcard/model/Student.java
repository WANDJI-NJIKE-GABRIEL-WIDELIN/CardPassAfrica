package com.panafrican.studentcard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;
    
    private String fullName;
    private LocalDate dateOfBirth;
    private String nationality;
    private String email;
    private String phone;

    // Lifelong Passport Extensions
    private String passportStatus; // e.g., "STUDENT", "ALUMNI", "PROFESSIONAL"
    private String professionalBio;
    private String verifiedCertifications; // JSON or CSV list of professional badges
    private String continentalId; // W3C Decentralized Identifier (DID) style
}
