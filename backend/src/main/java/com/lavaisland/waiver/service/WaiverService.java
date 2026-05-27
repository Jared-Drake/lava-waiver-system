package com.lavaisland.waiver.service;

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

    public Waiver createWaiver(Waiver waiver) {
        waiver.setSigned(true);
        waiver.setSignedAt(LocalDateTime.now());
        waiver.setExpiresAt(LocalDate.now().plusYears(1));
        waiver.setActive(true);
        waiver.setConfirmationCode(generateConfirmationCode());

        return waiverRepository.save(waiver);
    }

    private String generateConfirmationCode() {
        return "LIW-" + java.util.UUID.randomUUID()
                .toString()
                .substring(0, 6)
                .toUpperCase();
    }

    public List<Waiver> getAllWaivers() {
        return waiverRepository.findAll();
    }

    public List<Waiver> searchByParentLastName(String lastName) {
        return waiverRepository.findByParentLastNameContainingIgnoreCase(lastName);
    }

    public List<Waiver> searchByParticipantLastName(String lastName) {
        return waiverRepository.findByParticipantLastNameContainingIgnoreCase(lastName);
    }

    public Waiver findByConfirmationCode(String confirmationCode) {
        return waiverRepository.findByConfirmationCode(confirmationCode)
                .orElseThrow(() -> new RuntimeException("Waiver not found with confirmation code: " + confirmationCode));
    }

    public boolean isWaiverValid(Waiver waiver) {
        return waiver.isActive()
                && waiver.getExpiresAt() != null
                && !waiver.getExpiresAt().isBefore(LocalDate.now());
    }
}