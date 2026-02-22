package com.panafrican.studentcard.repository;

import com.panafrican.studentcard.model.DigitalIdentity;
import com.panafrican.studentcard.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DigitalIdentityRepository extends JpaRepository<DigitalIdentity, Long> {
    Optional<DigitalIdentity> findByStudent(Student student);
    Optional<DigitalIdentity> findByBiometricHash(String biometricHash);
}
