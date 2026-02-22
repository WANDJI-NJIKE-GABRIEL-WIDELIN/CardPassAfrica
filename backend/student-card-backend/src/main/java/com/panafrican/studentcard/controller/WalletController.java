package com.panafrican.studentcard.controller;

import com.panafrican.studentcard.model.DigitalDocument;
import com.panafrican.studentcard.model.StudentWallet;
import com.panafrican.studentcard.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/wallet")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentWallet> getWallet(@PathVariable Long studentId) {
        return ResponseEntity.ok(walletService.getWalletByStudentId(studentId));
    }

    @PostMapping("/{studentId}/topup")
    public ResponseEntity<Void> topup(@PathVariable Long studentId, @RequestParam BigDecimal amount) {
        walletService.addFunds(studentId, amount);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{studentId}/documents")
    public ResponseEntity<List<DigitalDocument>> getDocuments(@PathVariable Long studentId) {
        return ResponseEntity.ok(walletService.getDocuments(studentId));
    }
}
