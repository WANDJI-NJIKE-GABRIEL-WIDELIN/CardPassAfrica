package com.educhain.dto;

import com.educhain.model.Credential;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CredentialRequest {
    @NotNull
    private Long studentId;

    @NotBlank
    private String title;

    private String fieldOfStudy;

    @NotNull
    private Credential.CredentialType credentialType;

    @NotNull
    private LocalDate issueDate;

    private LocalDate expiryDate;
    private String grade;
    private String honors;
}
