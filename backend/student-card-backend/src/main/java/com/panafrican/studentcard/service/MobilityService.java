package com.panafrican.studentcard.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MobilityService {

    public Map<String, Object> initiateCreditTransfer(String studentId, String sourceUni, String targetUni) {
        // Mock Panafrican Credit Transfer Workflow
        return Map.of(
            "transferId", "TRANS-" + System.currentTimeMillis(),
            "status", "IN_PROGRESS",
            "source", sourceUni,
            "target", targetUni,
            "verificationStep", "CRYPTOGRAPHIC_HASH_CHECK",
            "estimatedCompletion", "2 hours"
        );
    }

    public List<Map<String, String>> getPartnerUniversities() {
        return List.of(
            Map.of("id", "U-Y1", "name", "University of Yaoundé I", "country", "Cameroon"),
            Map.of("id", "U-ABI", "name", "Université Félix Houphouët-Boigny", "country", "Ivory Coast"),
            Map.of("id", "U-LEG", "name", "University of Ghana", "country", "Ghana"),
            Map.of("id", "U-DAK", "name", "Université Cheikh Anta Diop", "country", "Senegal")
        );
    }
}
