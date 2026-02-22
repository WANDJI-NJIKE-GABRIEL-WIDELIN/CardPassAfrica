package com.panafrican.studentcard.controller;

import com.panafrican.studentcard.service.MobilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mobility")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MobilityController {

    private final MobilityService mobilityService;

    @GetMapping("/partners")
    public ResponseEntity<List<Map<String, String>>> getPartners() {
        return ResponseEntity.ok(mobilityService.getPartnerUniversities());
    }

    @PostMapping("/transfer")
    public ResponseEntity<Map<String, Object>> startTransfer(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(mobilityService.initiateCreditTransfer(
            request.get("studentId"),
            request.get("sourceUni"),
            request.get("targetUni")
        ));
    }
}
