package com.lavaisland.waiver.service;

import com.lavaisland.waiver.exception.WaiverNotFoundException;
import com.lavaisland.waiver.dto.WaiverCreateRequest;
import com.lavaisland.waiver.dto.WaiverResponse;
import com.lavaisland.waiver.mapper.WaiverMapper;
import com.lavaisland.waiver.model.Waiver;
import com.lavaisland.waiver.repository.WaiverRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class WaiverService {

    private final WaiverRepository waiverRepository;

    public WaiverService(WaiverRepository waiverRepository) {
        this.waiverRepository = waiverRepository;
    }

    public WaiverResponse createWaiver(WaiverCreateRequest request) {
        Waiver waiver = WaiverMapper.toEntity(request);

        waiver.setSigned(true);
        waiver.setSignedAt(LocalDateTime.now());
        waiver.setExpiresAt(LocalDate.now().plusYears(1));
        waiver.setActive(true);
        waiver.setConfirmationCode(generateConfirmationCode());

        if (waiver.getParticipants() != null) {
            waiver.getParticipants().forEach(participant -> participant.setWaiver(waiver));
        }

        Waiver savedWaiver = waiverRepository.save(waiver);
        return WaiverMapper.toResponse(savedWaiver);
    }

    private String generateConfirmationCode() {
        return "LIW-" + java.util.UUID.randomUUID()
                .toString()
                .substring(0, 6)
                .toUpperCase();
    }

    public List<WaiverResponse> getAllWaivers() {
        return waiverRepository.findAll()
                .stream()
                .map(WaiverMapper::toResponse)
                .toList();
    }

    public List<WaiverResponse> searchByParentLastName(String lastName) {
        return waiverRepository.findByParentLastNameContainingIgnoreCase(lastName)
                .stream()
                .map(WaiverMapper::toResponse)
                .toList();
    }

    public List<WaiverResponse> searchByParticipantLastName(String lastName) {
        return waiverRepository.findDistinctByParticipantsLastNameContainingIgnoreCase(lastName)
                .stream()
                .map(WaiverMapper::toResponse)
                .toList();
    }

    public WaiverResponse findByConfirmationCode(String confirmationCode) {
        Waiver waiver = waiverRepository.findByConfirmationCode(confirmationCode)
                .orElseThrow(() -> new WaiverNotFoundException(confirmationCode));

        return WaiverMapper.toResponse(waiver);
    }

    public boolean isWaiverValid(Waiver waiver) {
        return waiver.isActive()
                && waiver.getExpiresAt() != null
                && !waiver.getExpiresAt().isBefore(LocalDate.now());
    }
}