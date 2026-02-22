package com.panafrican.studentcard.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GovernanceService {

    public Map<String, Object> getContinentalAnalytics() {
        return Map.of(
            "totalVerifiedStudents", 4500000,
            "regionalMobilityIndex", 0.65, // 65% cross-border engagement
            "fraudPreventionSavings", "$1.2B",
            "activeInstitutions", 1200,
            "topMobilityCorridors", List.of(
                Map.of("from", "Cameroon", "to", "Senegal", "growth", "+12%"),
                Map.of("from", "Ghana", "to", "Ivory Coast", "growth", "+8%"),
                Map.of("from", "Nigeria", "to", "South Africa", "growth", "+15%")
            ),
            "dropoutRiskHotspots", List.of(
                Map.of("region", "Sahel North", "riskLevel", "HIGH", "primaryReason", "Connectivity Gap"),
                Map.of("region", "Congo Basin", "riskLevel", "MEDIUM", "primaryReason", "Financial Friction")
            )
        );
    }
}
