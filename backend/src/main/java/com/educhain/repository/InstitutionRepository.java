package com.educhain.repository;

import com.educhain.model.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    List<Institution> findByVerifiedTrue();
    Optional<Institution> findByUserId(Long userId);
    boolean existsByAccreditationNumber(String accreditationNumber);
}
