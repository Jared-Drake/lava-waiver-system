package com.lavaisland.waiver.mapper;

import com.lavaisland.waiver.dto.ParticipantCreateRequest;
import com.lavaisland.waiver.dto.ParticipantResponse;
import com.lavaisland.waiver.dto.WaiverCreateRequest;
import com.lavaisland.waiver.dto.WaiverResponse;
import com.lavaisland.waiver.model.Participant;
import com.lavaisland.waiver.model.Waiver;

import java.util.List;

public class WaiverMapper {

    private WaiverMapper() {
    }

    public static Waiver toEntity(WaiverCreateRequest request) {
        Waiver waiver = new Waiver();

        waiver.setParentFirstName(request.getParentFirstName());
        waiver.setParentLastName(request.getParentLastName());
        waiver.setEmail(request.getEmail());
        waiver.setPhone(request.getPhone());
        waiver.setAgreedToTerms(request.isAgreedToTerms());

        if (request.getParticipants() != null) {
            List<Participant> participants = request.getParticipants()
                    .stream()
                    .map(WaiverMapper::toEntity)
                    .toList();

            waiver.setParticipants(participants);
        }

        return waiver;
    }

    private static Participant toEntity(ParticipantCreateRequest request) {
        Participant participant = new Participant();

        participant.setFirstName(request.getFirstName());
        participant.setLastName(request.getLastName());
        participant.setDateOfBirth(request.getDateOfBirth());

        return participant;
    }

    public static WaiverResponse toResponse(Waiver waiver) {
        List<ParticipantResponse> participants = waiver.getParticipants()
                .stream()
                .map(WaiverMapper::toResponse)
                .toList();

        return new WaiverResponse(
                waiver.getId(),
                waiver.getParentFirstName(),
                waiver.getParentLastName(),
                waiver.getEmail(),
                waiver.getPhone(),
                waiver.isSigned(),
                waiver.getSignedAt(),
                waiver.getExpiresAt(),
                waiver.isActive(),
                waiver.getConfirmationCode(),
                participants
        );
    }

    private static ParticipantResponse toResponse(Participant participant) {
        return new ParticipantResponse(
                participant.getId(),
                participant.getFirstName(),
                participant.getLastName(),
                participant.getDateOfBirth()
        );
    }
}