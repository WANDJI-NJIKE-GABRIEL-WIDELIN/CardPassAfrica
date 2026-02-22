package com.panafrican.studentcard.repository;

import com.panafrican.studentcard.model.AcademicRecord;
import com.panafrican.studentcard.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AcademicRecordRepository extends JpaRepository<AcademicRecord, Long> {
    List<AcademicRecord> findByStudent(Student student);
}
