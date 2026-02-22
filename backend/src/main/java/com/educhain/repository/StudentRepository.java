package com.educhain.repository;

import com.educhain.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findByUserId(Long userId);
    Optional<Student> findByDid(String did);
    boolean existsByEmail(String email);
    boolean existsByNationalId(String nationalId);
}
