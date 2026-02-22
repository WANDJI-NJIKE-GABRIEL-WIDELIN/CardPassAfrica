package com.educhain.controller;

import com.educhain.repository.CredentialRepository;
import com.educhain.repository.InstitutionRepository;
import com.educhain.repository.StudentRepository;
import com.educhain.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@Tag(name = "Dashboard", description = "Platform statistics")
public class DashboardController {

    @Autowired private StudentRepository studentRepository;
    @Autowired private InstitutionRepository institutionRepository;
    @Autowired private CredentialRepository credentialRepository;
    @Autowired private UserRepository userRepository;

    @GetMapping("/stats")
    @Operation(summary = "Get platform-wide statistics (public)")
    public ResponseEntity<?> getStats() {
        long totalStudents = studentRepository.count();
        long totalInstitutions = institutionRepository.findByVerifiedTrue().size();
        long totalCredentials = credentialRepository.count();

        // Count unique countries from students
        long countries = studentRepository.findAll()
                .stream()
                .map(s -> s.getCountry())
                .filter(c -> c != null && !c.isBlank())
                .distinct()
                .count();

        return ResponseEntity.ok(Map.of(
                "totalStudents", (Object) totalStudents,
                "totalInstitutions", (Object) totalInstitutions,
                "totalCredentials", (Object) totalCredentials,
                "countriesRepresented", (Object) Math.max(countries, 1)
        ));
    }
}
