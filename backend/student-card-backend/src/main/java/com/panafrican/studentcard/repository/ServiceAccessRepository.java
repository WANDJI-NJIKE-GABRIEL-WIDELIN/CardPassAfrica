package com.panafrican.studentcard.repository;

import com.panafrican.studentcard.model.ServiceAccess;
import com.panafrican.studentcard.model.DigitalIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceAccessRepository extends JpaRepository<ServiceAccess, Long> {
    List<ServiceAccess> findByIdentity(DigitalIdentity identity);
}
