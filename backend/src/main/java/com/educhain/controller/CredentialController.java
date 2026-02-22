package com.educhain.controller;

import com.educhain.dto.CredentialRequest;
import com.educhain.model.Credential;
import com.educhain.model.Institution;
import com.educhain.model.User;
import com.educhain.repository.InstitutionRepository;
import com.educhain.service.CredentialService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/credentials")
@Tag(name = "Credentials", description = "Issue and verify academic credentials")
public class CredentialController {

    @Autowired private CredentialService credentialService;
    @Autowired private InstitutionRepository institutionRepository;

    @GetMapping("/verify/{hash}")
    @Operation(summary = "Publicly verify a credential by its hash (no auth required)")
    public ResponseEntity<?> verifyByHash(@PathVariable String hash) {
        return credentialService.verifyByHash(hash)
                .map(c -> ResponseEntity.ok(Map.of(
                        "valid", true,
                        "status", c.getStatus(),
                        "credential", buildCredentialView(c)
                )))
                .orElse(ResponseEntity.ok(Map.of("valid", false, "message", "Credential not found or invalid")));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get credential by ID")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return credentialService.findById(id)
                .map(c -> ResponseEntity.ok(buildCredentialView(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('INSTITUTION_ADMIN') or hasRole('PLATFORM_ADMIN')")
    @Operation(summary = "Issue a new credential (institution admin only)")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> issueCredential(
            @Valid @RequestBody CredentialRequest req,
            @AuthenticationPrincipal User currentUser) {
        try {
            Institution institution = institutionRepository.findByUserId(currentUser.getId())
                    .orElseThrow(() -> new IllegalArgumentException("Institution not found for this user"));
            Credential credential = credentialService.issueCredential(req, institution.getId());
            return ResponseEntity.ok(buildCredentialView(credential));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PatchMapping("/{id}/revoke")
    @PreAuthorize("hasRole('INSTITUTION_ADMIN') or hasRole('PLATFORM_ADMIN')")
    @Operation(summary = "Revoke a credential")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<?> revokeCredential(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        try {
            String reason = body.getOrDefault("reason", "No reason specified");
            Credential credential = credentialService.revokeCredential(id, reason);
            return ResponseEntity.ok(Map.of("message", "Credential revoked", "id", credential.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private Map<String, Object> buildCredentialView(Credential c) {
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
        
        java.util.Map<String, Object> studentMap = new java.util.HashMap<>();
        studentMap.put("id", c.getStudent().getId());
        studentMap.put("name", c.getStudent().getFullName());
        studentMap.put("did", c.getStudent().getDid() != null ? c.getStudent().getDid() : "");
        map.put("student", studentMap);

        java.util.Map<String, Object> instMap = new java.util.HashMap<>();
        instMap.put("id", c.getInstitution().getId());
        instMap.put("name", c.getInstitution().getName());
        instMap.put("country", c.getInstitution().getCountry());
        instMap.put("verified", c.getInstitution().getVerified());
        map.put("institution", instMap);

        return map;
    }
}
