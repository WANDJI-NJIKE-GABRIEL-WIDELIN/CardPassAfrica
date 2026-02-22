package com.panafrican.studentcard.controller;

import com.panafrican.studentcard.service.GovernanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/governance")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GovernanceController {

    private final GovernanceService governanceService;

    @GetMapping("/continental-insights")
    public ResponseEntity<Map<String, Object>> getInsights() {
        return ResponseEntity.ok(governanceService.getContinentalAnalytics());
    }
}
