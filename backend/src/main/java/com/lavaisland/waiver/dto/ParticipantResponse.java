package com.lavaisland.waiver.dto;

import java.time.LocalDate;

public class ParticipantResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    public ParticipantResponse(Long id, String firstName, String lastName, LocalDate dateOfBirth) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
    }

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }
}