package com.lavaisland.waiver.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class WaiverResponse {

    private Long id;
    private String parentFirstName;
    private String parentLastName;
    private String email;
    private String phone;
    private boolean signed;
    private LocalDateTime signedAt;
    private LocalDate expiresAt;
    private boolean active;
    private String confirmationCode;
    private List<ParticipantResponse> participants;

    public WaiverResponse(
            Long id,
            String parentFirstName,
            String parentLastName,
            String email,
            String phone,
            boolean signed,
            LocalDateTime signedAt,
            LocalDate expiresAt,
            boolean active,
            String confirmationCode,
            List<ParticipantResponse> participants
    ) {
        this.id = id;
        this.parentFirstName = parentFirstName;
        this.parentLastName = parentLastName;
        this.email = email;
        this.phone = phone;
        this.signed = signed;
        this.signedAt = signedAt;
        this.expiresAt = expiresAt;
        this.active = active;
        this.confirmationCode = confirmationCode;
        this.participants = participants;
    }

    public Long getId() {
        return id;
    }

    public String getParentFirstName() {
        return parentFirstName;
    }

    public String getParentLastName() {
        return parentLastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public boolean isSigned() {
        return signed;
    }

    public LocalDateTime getSignedAt() {
        return signedAt;
    }

    public LocalDate getExpiresAt() {
        return expiresAt;
    }

    public boolean isActive() {
        return active;
    }

    public String getConfirmationCode() {
        return confirmationCode;
    }

    public List<ParticipantResponse> getParticipants() {
        return participants;
    }
}