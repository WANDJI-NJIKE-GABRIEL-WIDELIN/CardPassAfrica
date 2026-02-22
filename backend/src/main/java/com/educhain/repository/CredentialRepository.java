package com.educhain.repository;

import com.educhain.model.Credential;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CredentialRepository extends JpaRepository<Credential, Long> {
    List<Credential> findByStudentId(Long studentId);
    List<Credential> findByInstitutionId(Long institutionId);
    Optional<Credential> findByHash(String hash);
    boolean existsByHash(String hash);
}
