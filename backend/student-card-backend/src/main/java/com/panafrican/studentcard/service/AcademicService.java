package com.panafrican.studentcard.service;

import com.panafrican.studentcard.model.AcademicRecord;
import com.panafrican.studentcard.model.Student;
import com.panafrican.studentcard.model.University;
import com.panafrican.studentcard.repository.AcademicRecordRepository;
import com.panafrican.studentcard.repository.StudentRepository;
import com.panafrican.studentcard.repository.UniversityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AcademicService {

    private final AcademicRecordRepository academicRecordRepository;
    private final StudentRepository studentRepository;
    private final UniversityRepository universityRepository;

    public List<AcademicRecord> getStudentRecords(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return academicRecordRepository.findByStudent(student);
    }

    @Transactional
    public AcademicRecord addRecord(Long studentId, Long universityId, Integer credits, Double gpa) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        University university = universityRepository.findById(universityId)
                .orElseThrow(() -> new RuntimeException("University not found"));

        AcademicRecord record = new AcademicRecord();
        record.setStudent(student);
        record.setUniversity(university);
        record.setCredits(credits);
        record.setGpa(gpa);
        record.setTranscriptHash(UUID.randomUUID().toString()); // Mock hash
        
        return academicRecordRepository.save(record);
    }
}
