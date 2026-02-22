package com.educhain.controller;

import com.educhain.model.Institution;
import com.educhain.repository.InstitutionRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/institutions")
@Tag(name = "Institutions", description = "Academic institution management")
public class InstitutionController {

    @Autowired private InstitutionRepository institutionRepository;

    @GetMapping
    @Operation(summary = "List all verified institutions (public)")
    public ResponseEntity<?> listVerified() {
        List<Map<String, Object>> institutions = institutionRepository.findByVerifiedTrue()
                .stream().map(this::buildView).collect(Collectors.toList());
        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "List all institutions including unverified (platform admin)")
    public ResponseEntity<?> listAll() {
        List<Map<String, Object>> institutions = institutionRepository.findAll()
                .stream().map(this::buildView).collect(Collectors.toList());
        return ResponseEntity.ok(institutions);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get institution details")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return institutionRepository.findById(id)
                .map(i -> ResponseEntity.ok(buildView(i)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/verify")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Verify/approve an institution (platform admin)")
    public ResponseEntity<?> verifyInstitution(@PathVariable Long id) {
        return institutionRepository.findById(id).map(inst -> {
            inst.setVerified(true);
            institutionRepository.save(inst);
            return ResponseEntity.ok(Map.of("message", "Institution verified successfully", "id", inst.getId()));
        }).orElse(ResponseEntity.notFound().build());
    }

    private Map<String, Object> buildView(Institution i) {
        return Map.of(
                "id", i.getId(),
                "name", i.getName(),
                "country", i.getCountry(),
                "accreditationNumber", i.getAccreditationNumber() != null ? i.getAccreditationNumber() : "",
                "contactEmail", i.getContactEmail() != null ? i.getContactEmail() : "",
                "website", i.getWebsite() != null ? i.getWebsite() : "",
                "verified", i.getVerified(),
                "logoUrl", i.getLogoUrl() != null ? i.getLogoUrl() : ""
        );
    }
}
