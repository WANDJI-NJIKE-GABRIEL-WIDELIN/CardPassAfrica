package com.panafrican.studentcard.controller;

import com.panafrican.studentcard.dto.StudentRegistrationRequest;
import com.panafrican.studentcard.model.Student;
import com.panafrican.studentcard.service.IdentityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/identity")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // For hackathon purposes, allowing all origins
public class IdentityController {

    private final IdentityService identityService;

    @PostMapping("/register")
    public ResponseEntity<Student> register(@RequestBody StudentRegistrationRequest request) {
        return ResponseEntity.ok(identityService.registerStudent(request));
    }

    @GetMapping("/verify")
    public ResponseEntity<Boolean> verify(@RequestParam String qrSignature) {
        return ResponseEntity.ok(identityService.verifyIdentity(qrSignature));
    }
}
