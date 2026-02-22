package com.panafrican.studentcard.service;

import com.panafrican.studentcard.model.DigitalIdentity;
import com.panafrican.studentcard.model.ServiceAccess;
import com.panafrican.studentcard.repository.ServiceAccessRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class SecurityService {

    private final ServiceAccessRepository serviceAccessRepository;
    private final Random random = new Random();

    public double calculateTrustScore(DigitalIdentity identity, String deviceId, String location) {
        // AI Trust Score Engine (Winner Level Simulation)
        double score = 100.0;

        // 1. Location Consistency Check
        // Simulate: If location is too far from last known location in a short time
        if (location != null && location.contains("Anomaly")) {
            score -= 40.0;
        }

        // 2. Device Footprint Check
        // Simulate: Unknown device signature
        if (deviceId != null && deviceId.equals("unknown-device")) {
            score -= 20.0;
        }

        // 3. Status Check
        if ("FLAGGED".equals(identity.getIdentityStatus())) {
            score -= 50.0;
        }

        return Math.max(0.0, score);
    }

    public void logAccess(DigitalIdentity identity, String serviceType, String status) {
        ServiceAccess log = new ServiceAccess();
        log.setIdentity(identity);
        log.setServiceType(serviceType);
        log.setAccessTimestamp(LocalDateTime.now());
        log.setAccessStatus(status);
        serviceAccessRepository.save(log);
    }
}
