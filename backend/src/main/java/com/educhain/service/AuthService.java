package com.educhain.service;

import com.educhain.dto.AuthResponse;
import com.educhain.dto.LoginRequest;
import com.educhain.dto.RegisterRequest;
import com.educhain.model.Institution;
import com.educhain.model.Student;
import com.educhain.model.User;
import com.educhain.repository.InstitutionRepository;
import com.educhain.repository.StudentRepository;
import com.educhain.repository.UserRepository;
import com.educhain.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class AuthService {

    @Autowired private UserRepository userRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private InstitutionRepository institutionRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtils jwtUtils;

    @Transactional
    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }

        User user = User.builder()
                .username(req.getUsername())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .role(req.getRole() != null ? req.getRole() : User.Role.STUDENT)
                .enabled(true)
                .build();
        user = userRepository.save(user);

        Long entityId = null;

        if (user.getRole() == User.Role.STUDENT) {
            Student student = Student.builder()
                    .firstName(req.getFirstName())
                    .lastName(req.getLastName())
                    .email(req.getEmail())
                    .country(req.getCountry())
                    .phone(req.getPhone())
                    .did(generateDid(req.getCountry(), req.getUsername()))
                    .user(user)
                    .build();
            student = studentRepository.save(student);
            entityId = student.getId();
        } else if (user.getRole() == User.Role.INSTITUTION_ADMIN) {
            Institution institution = Institution.builder()
                    .name(req.getInstitutionName() != null ? req.getInstitutionName() : req.getFirstName())
                    .country(req.getCountry() != null ? req.getCountry() : "Africa")
                    .contactEmail(req.getEmail())
                    .contactPhone(req.getPhone())
                    .website(req.getWebsite())
                    .accreditationNumber(req.getAccreditationNumber())
                    .verified(false)
                    .user(user)
                    .build();
            institution = institutionRepository.save(institution);
            entityId = institution.getId();
        }

        String token = jwtUtils.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .entityId(entityId)
                .build();
    }

    public AuthResponse login(LoginRequest req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!user.getEnabled()) {
            throw new IllegalArgumentException("Account is disabled");
        }

        Long entityId = null;
        if (user.getRole() == User.Role.STUDENT) {
            entityId = studentRepository.findByUserId(user.getId())
                    .map(Student::getId).orElse(null);
        } else if (user.getRole() == User.Role.INSTITUTION_ADMIN) {
            entityId = institutionRepository.findByUserId(user.getId())
                    .map(Institution::getId).orElse(null);
        }

        String token = jwtUtils.generateToken(user);
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .role(user.getRole())
                .entityId(entityId)
                .build();
    }

    private String generateDid(String country, String username) {
        String countryCode = country != null ? country.substring(0, Math.min(3, country.length())).toLowerCase() : "afr";
        return "did:educhain:" + countryCode + ":" + username + UUID.randomUUID().toString().substring(0, 8);
    }
}
