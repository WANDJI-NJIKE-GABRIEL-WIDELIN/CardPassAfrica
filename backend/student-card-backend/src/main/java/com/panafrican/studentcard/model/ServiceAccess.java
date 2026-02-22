package com.panafrican.studentcard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_access_logs")
@Data
public class ServiceAccess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accessId;
    
    @ManyToOne
    @JoinColumn(name = "identity_id", nullable = false)
    private DigitalIdentity identity;
    
    private String serviceType; // LIBRARY, CAFETERIA, GYM
    private LocalDateTime accessTimestamp;
    private String accessStatus; // GRANTED, DENIED
}
