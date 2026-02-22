package com.panafrican.studentcard.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class StudentRegistrationRequest {
    private String fullName;
    private LocalDate dateOfBirth;
    private String nationality;
    private String email;
    private String phone;
}
