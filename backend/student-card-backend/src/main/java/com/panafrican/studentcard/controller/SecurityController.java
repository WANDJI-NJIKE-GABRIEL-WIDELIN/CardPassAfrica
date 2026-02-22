package com.panafrican.studentcard.controller;

import com.panafrican.studentcard.model.DigitalIdentity;
import com.panafrican.studentcard.repository.DigitalIdentityRepository;
import com.panafrican.studentcard.service.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/security")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SecurityController {

    private final SecurityService securityService;
    private final DigitalIdentityRepository identityRepository;

    @GetMapping("/trust-score/{identityId}")
    public ResponseEntity<Map<String, Object>> getTrustScore(
            @PathVariable Long identityId,
            @RequestParam(required = false) String deviceId,
            @RequestParam(required = false) String location) {
        
        return identityRepository.findById(identityId)
                .map(identity -> {
                    double score = securityService.calculateTrustScore(identity, deviceId, location);
                    return ResponseEntity.ok(Map.of(
                            "identityId", identityId,
                            "trustScore", score,
                            "status", score > 70 ? "SECURE" : (score > 40 ? "WARNING" : "CRITICAL"),
                            "checks", Map.of(
                                "location", location != null && !location.contains("Anomaly"),
                                "device", deviceId != null && !deviceId.equals("unknown-device"),
                                "identity", !"FLAGGED".equals(identity.getIdentityStatus())
                            )
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
