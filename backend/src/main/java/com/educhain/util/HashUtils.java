package com.educhain.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;

public class HashUtils {

    private HashUtils() {}

    public static String generateCredentialHash(
            Long studentId, Long institutionId,
            String title, String fieldOfStudy,
            LocalDate issueDate, String grade) {
        String content = String.format("%d|%d|%s|%s|%s|%s",
                studentId, institutionId, title,
                fieldOfStudy != null ? fieldOfStudy : "",
                issueDate.toString(),
                grade != null ? grade : "");
        return "sha256:" + sha256Hex(content);
    }

    public static String sha256Hex(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}
