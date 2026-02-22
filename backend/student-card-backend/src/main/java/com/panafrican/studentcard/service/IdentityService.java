package com.panafrican.studentcard.service;

import com.panafrican.studentcard.dto.StudentRegistrationRequest;
import com.panafrican.studentcard.model.DigitalIdentity;
import com.panafrican.studentcard.model.Student;
import com.panafrican.studentcard.model.StudentWallet;
import com.panafrican.studentcard.repository.DigitalIdentityRepository;
import com.panafrican.studentcard.repository.StudentRepository;
import com.panafrican.studentcard.repository.StudentWalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IdentityService {

    private final StudentRepository studentRepository;
    private final DigitalIdentityRepository digitalIdentityRepository;
    private final StudentWalletRepository studentWalletRepository;

    @Transactional
    public Student registerStudent(StudentRegistrationRequest request) {
        // 1. Create Student
        Student student = new Student();
        student.setFullName(request.getFullName());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setNationality(request.getNationality());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());
        student = studentRepository.save(student);

        // 2. Create Digital Identity (Mocking MOSIP behavior)
        DigitalIdentity identity = new DigitalIdentity();
        identity.setStudent(student);
        identity.setBiometricHash(UUID.randomUUID().toString()); // Mock biometric hash
        identity.setQrCodeSignature("SIG_" + UUID.randomUUID().toString());
        identity.setStatus("ACTIVE");
        digitalIdentityRepository.save(identity);

        // 3. Create Student Wallet
        StudentWallet wallet = new StudentWallet();
        wallet.setStudent(student);
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setCurrency("XAF");
        studentWalletRepository.save(wallet);

        return student;
    }

    public boolean verifyIdentity(String qrSignature) {
        // In a real scenario, this would verify the cryptographic signature
        return qrSignature != null && qrSignature.startsWith("SIG_");
    }
}
