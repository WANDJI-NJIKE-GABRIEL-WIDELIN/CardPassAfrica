package com.panafrican.studentcard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "student_wallets")
@Data
public class StudentWallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walletId;
    
    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
    
    private BigDecimal balance;
    private String currency; // e.g., "XAF", "USD"
    
    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
    private List<DigitalDocument> documents;
}
