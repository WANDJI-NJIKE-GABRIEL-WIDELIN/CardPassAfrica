package com.panafrican.studentcard.controller;

import com.panafrican.studentcard.model.AcademicRecord;
import com.panafrican.studentcard.service.AcademicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AcademicController {

    private final AcademicService academicService;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<AcademicRecord>> getRecords(@PathVariable Long studentId) {
        return ResponseEntity.ok(academicService.getStudentRecords(studentId));
    }

    @PostMapping("/{studentId}/record")
    public ResponseEntity<AcademicRecord> addRecord(
            @PathVariable Long studentId,
            @RequestParam Long universityId,
            @RequestParam Integer credits,
            @RequestParam Double gpa) {
        return ResponseEntity.ok(academicService.addRecord(studentId, universityId, credits, gpa));
    }
}
