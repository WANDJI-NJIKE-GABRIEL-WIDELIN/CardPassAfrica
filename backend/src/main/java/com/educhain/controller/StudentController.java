package com.educhain.controller;

import com.educhain.model.Credential;
import com.educhain.model.Student;
import com.educhain.model.User;
import com.educhain.repository.StudentRepository;
import com.educhain.service.CredentialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/students")
@Tag(name = "Students", description = "Student profile management")
@SecurityRequirement(name = "bearerAuth")
public class StudentController {

    @Autowired private StudentRepository studentRepository;
    @Autowired private CredentialService credentialService;

    @GetMapping("/{id}")
    @Operation(summary = "Get student profile by ID")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(s -> ResponseEntity.ok(buildStudentView(s)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('STUDENT')")
    @Operation(summary = "Get current student's own profile")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal User currentUser) {
        return studentRepository.findByUserId(currentUser.getId())
                .map(s -> ResponseEntity.ok(buildStudentView(s)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/credentials")
    @Operation(summary = "Get all credentials for a student")
    public ResponseEntity<?> getStudentCredentials(@PathVariable Long id) {
        List<Credential> credentials = credentialService.getStudentCredentials(id);
        List<Map<String, Object>> result = credentials.stream().map(c -> {
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", c.getId());
            map.put("title", c.getTitle());
            map.put("fieldOfStudy", c.getFieldOfStudy() != null ? c.getFieldOfStudy() : "");
            map.put("credentialType", c.getCredentialType());
            map.put("issueDate", c.getIssueDate().toString());
            map.put("grade", c.getGrade() != null ? c.getGrade() : "");
            map.put("honors", c.getHonors() != null ? c.getHonors() : "");
            map.put("hash", c.getHash());
            map.put("status", c.getStatus());
            map.put("institutionName", c.getInstitution().getName());
            map.put("institutionCountry", c.getInstitution().getCountry());
            return map;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @GetMapping
    @PreAuthorize("hasRole('PLATFORM_ADMIN') or hasRole('INSTITUTION_ADMIN')")
    @Operation(summary = "List all students (admin/institution only)")
    public ResponseEntity<?> listAll() {
        List<Map<String, Object>> students = studentRepository.findAll()
                .stream().map(this::buildStudentView).collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    private Map<String, Object> buildStudentView(Student s) {
        return Map.of(
                "id", s.getId(),
                "firstName", s.getFirstName(),
                "lastName", s.getLastName(),
                "email", s.getEmail(),
                "country", s.getCountry() != null ? s.getCountry() : "",
                "phone", s.getPhone() != null ? s.getPhone() : "",
                "did", s.getDid() != null ? s.getDid() : "",
                "photoUrl", s.getPhotoUrl() != null ? s.getPhotoUrl() : "",
                "createdAt", s.getCreatedAt() != null ? s.getCreatedAt().toString() : ""
        );
    }
}
