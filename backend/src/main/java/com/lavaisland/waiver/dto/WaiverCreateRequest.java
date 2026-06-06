package com.lavaisland.waiver.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;

public class WaiverCreateRequest {

    @NotBlank(message = "Parent first name is required")
    private String parentFirstName;

    @NotBlank(message = "Parent last name is required")
    private String parentLastName;

    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @AssertTrue(message = "You must agree to the waiver terms")
    private boolean agreedToTerms;

    @Valid
    @Size(min = 1, message = "At least one participant is required")
    private List<ParticipantCreateRequest> participants = new ArrayList<>();

    public String getParentFirstName() {
        return parentFirstName;
    }

    public void setParentFirstName(String parentFirstName) {
        this.parentFirstName = parentFirstName;
    }

    public String getParentLastName() {
        return parentLastName;
    }

    public void setParentLastName(String parentLastName) {
        this.parentLastName = parentLastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isAgreedToTerms() {
        return agreedToTerms;
    }

    public void setAgreedToTerms(boolean agreedToTerms) {
        this.agreedToTerms = agreedToTerms;
    }

    public List<ParticipantCreateRequest> getParticipants() {
        return participants;
    }

    public void setParticipants(List<ParticipantCreateRequest> participants) {
        this.participants = participants;
    }
}