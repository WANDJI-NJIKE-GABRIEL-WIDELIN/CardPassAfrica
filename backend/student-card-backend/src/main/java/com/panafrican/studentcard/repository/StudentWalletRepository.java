package com.panafrican.studentcard.repository;

import com.panafrican.studentcard.model.StudentWallet;
import com.panafrican.studentcard.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StudentWalletRepository extends JpaRepository<StudentWallet, Long> {
    Optional<StudentWallet> findByStudent(Student student);
}
