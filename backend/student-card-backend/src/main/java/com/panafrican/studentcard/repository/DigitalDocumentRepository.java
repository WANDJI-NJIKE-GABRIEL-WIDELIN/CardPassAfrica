package com.panafrican.studentcard.repository;

import com.panafrican.studentcard.model.DigitalDocument;
import com.panafrican.studentcard.model.StudentWallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DigitalDocumentRepository extends JpaRepository<DigitalDocument, Long> {
    List<DigitalDocument> findByWallet(StudentWallet wallet);
}
