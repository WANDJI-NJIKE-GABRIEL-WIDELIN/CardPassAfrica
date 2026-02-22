package com.educhain.service;

import com.educhain.dto.CredentialRequest;
import com.educhain.model.Credential;
import com.educhain.model.Institution;
import com.educhain.model.Student;
import com.educhain.repository.CredentialRepository;
import com.educhain.repository.InstitutionRepository;
import com.educhain.repository.StudentRepository;
import com.educhain.util.HashUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CredentialService {

    @Autowired private CredentialRepository credentialRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private InstitutionRepository institutionRepository;

    @Transactional
    public Credential issueCredential(CredentialRequest req, Long institutionId) {
        Student student = studentRepository.findById(req.getStudentId())
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        Institution institution = institutionRepository.findById(institutionId)
                .orElseThrow(() -> new IllegalArgumentException("Institution not found"));

        String hash = HashUtils.generateCredentialHash(
                student.getId(), institution.getId(),
                req.getTitle(), req.getFieldOfStudy(),
                req.getIssueDate(), req.getGrade());

        if (credentialRepository.existsByHash(hash)) {
            throw new IllegalArgumentException("Duplicate credential: this credential has already been issued");
        }

        Credential credential = Credential.builder()
                .student(student)
                .institution(institution)
                .title(req.getTitle())
                .fieldOfStudy(req.getFieldOfStudy())
                .credentialType(req.getCredentialType())
                .issueDate(req.getIssueDate())
                .expiryDate(req.getExpiryDate())
                .grade(req.getGrade())
                .honors(req.getHonors())
                .hash(hash)
                .status(Credential.CredentialStatus.ACTIVE)
                .build();

        return credentialRepository.save(credential);
    }

    public List<Credential> getStudentCredentials(Long studentId) {
        return credentialRepository.findByStudentId(studentId);
    }

    public List<Credential> getInstitutionCredentials(Long institutionId) {
        return credentialRepository.findByInstitutionId(institutionId);
    }

    public Optional<Credential> findById(Long id) {
        return credentialRepository.findById(id);
    }

    public Optional<Credential> verifyByHash(String hash) {
        return credentialRepository.findByHash(hash);
    }

    @Transactional
    public Credential revokeCredential(Long id, String reason) {
        Credential credential = credentialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Credential not found"));
        credential.setStatus(Credential.CredentialStatus.REVOKED);
        credential.setRevocationReason(reason);
        return credentialRepository.save(credential);
    }

    public long countAll() {
        return credentialRepository.count();
    }
}
