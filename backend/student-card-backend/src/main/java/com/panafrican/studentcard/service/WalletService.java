package com.panafrican.studentcard.service;

import com.panafrican.studentcard.model.Student;
import com.panafrican.studentcard.model.StudentWallet;
import com.panafrican.studentcard.model.DigitalDocument;
import com.panafrican.studentcard.repository.StudentRepository;
import com.panafrican.studentcard.repository.StudentWalletRepository;
import com.panafrican.studentcard.repository.DigitalDocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WalletService {

    private final StudentWalletRepository walletRepository;
    private final StudentRepository studentRepository;
    private final DigitalDocumentRepository documentRepository;

    public StudentWallet getWalletByStudentId(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return walletRepository.findByStudent(student)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    @Transactional
    public void addFunds(Long studentId, BigDecimal amount) {
        StudentWallet wallet = getWalletByStudentId(studentId);
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);
    }

    @Transactional
    public boolean processPayment(Long studentId, BigDecimal amount) {
        StudentWallet wallet = getWalletByStudentId(studentId);
        if (wallet.getBalance().compareTo(amount) >= 0) {
            wallet.setBalance(wallet.getBalance().subtract(amount));
            walletRepository.save(wallet);
            return true;
        }
        return false;
    }

    public List<DigitalDocument> getDocuments(Long studentId) {
        StudentWallet wallet = getWalletByStudentId(studentId);
        return documentRepository.findByWallet(wallet);
    }
}
