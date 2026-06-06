package com.lavaisland.waiver.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class ParticipantCreateRequest {

    @NotBlank(message = "Participant first name is required")
    @Size(max = 50, message = "Participant first name must be 50 characters or less")
    private String firstName;

    @NotBlank(message = "Participant last name is required")
    @Size(max = 50, message = "Participant last name must be 50 characters or less")
    private String lastName;

    @NotNull(message = "Participant date of birth is required")
    @Past(message = "Participant date of birth must be in the past")
    private LocalDate dateOfBirth;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
}