package com.lavaisland.waiver.service;

import com.lavaisland.waiver.dto.ParticipantCreateRequest;
import com.lavaisland.waiver.dto.WaiverCreateRequest;
import com.lavaisland.waiver.dto.WaiverResponse;
import com.lavaisland.waiver.exception.WaiverNotFoundException;
import com.lavaisland.waiver.model.Participant;
import com.lavaisland.waiver.model.Waiver;
import com.lavaisland.waiver.repository.WaiverRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WaiverServiceTest {

    private WaiverRepository waiverRepository;
    private WaiverService waiverService;

    @BeforeEach
    void setUp() {
        waiverRepository = mock(WaiverRepository.class);
        waiverService = new WaiverService(waiverRepository);
    }

    @Test
    void createWaiverShouldSetSystemGeneratedFieldsAndSaveWaiver() {
        WaiverCreateRequest request = createValidRequest();

        when(waiverRepository.save(any(Waiver.class))).thenAnswer(invocation -> {
            Waiver waiver = invocation.getArgument(0);
            waiver.getParticipants().forEach(participant -> participant.setWaiver(waiver));
            return waiver;
        });

        WaiverResponse response = waiverService.createWaiver(request);

        ArgumentCaptor<Waiver> waiverCaptor = ArgumentCaptor.forClass(Waiver.class);
        verify(waiverRepository).save(waiverCaptor.capture());

        Waiver savedWaiver = waiverCaptor.getValue();

        assertTrue(savedWaiver.isSigned());
        assertTrue(savedWaiver.isActive());
        assertNotNull(savedWaiver.getSignedAt());
        assertEquals(LocalDate.now().plusYears(1), savedWaiver.getExpiresAt());
        assertNotNull(savedWaiver.getConfirmationCode());
        assertTrue(savedWaiver.getConfirmationCode().startsWith("LIW-"));
        assertEquals(1, savedWaiver.getParticipants().size());
        assertSame(savedWaiver, savedWaiver.getParticipants().get(0).getWaiver());

        assertEquals("Jared", response.getParentFirstName());
        assertEquals("Drake", response.getParentLastName());
        assertEquals("jared@example.com", response.getEmail());
        assertEquals(1, response.getParticipants().size());
    }

    @Test
    void findByConfirmationCodeShouldReturnWaiverWhenFound() {
        Waiver waiver = createSavedWaiver();

        when(waiverRepository.findByConfirmationCode("LIW-123ABC"))
                .thenReturn(Optional.of(waiver));

        WaiverResponse response = waiverService.findByConfirmationCode("LIW-123ABC");

        assertEquals("LIW-123ABC", response.getConfirmationCode());
        assertEquals("Jared", response.getParentFirstName());
        assertEquals("Drake", response.getParentLastName());
        assertEquals(1, response.getParticipants().size());
    }

    @Test
    void findByConfirmationCodeShouldThrowExceptionWhenNotFound() {
        when(waiverRepository.findByConfirmationCode("LIW-NONE12"))
                .thenReturn(Optional.empty());

        assertThrows(
                WaiverNotFoundException.class,
                () -> waiverService.findByConfirmationCode("LIW-NONE12")
        );
    }

    @Test
    void searchByParentLastNameShouldReturnMatchingWaivers() {
        Waiver waiver = createSavedWaiver();

        when(waiverRepository.findByParentLastNameContainingIgnoreCase("Drake"))
                .thenReturn(List.of(waiver));

        List<WaiverResponse> results = waiverService.searchByParentLastName("Drake");

        assertEquals(1, results.size());
        assertEquals("Drake", results.get(0).getParentLastName());
    }

    @Test
    void searchByParticipantLastNameShouldReturnMatchingWaivers() {
        Waiver waiver = createSavedWaiver();

        when(waiverRepository.findDistinctByParticipantsLastNameContainingIgnoreCase("Drake"))
                .thenReturn(List.of(waiver));

        List<WaiverResponse> results = waiverService.searchByParticipantLastName("Drake");

        assertEquals(1, results.size());
        assertEquals("LIW-123ABC", results.get(0).getConfirmationCode());
    }

    private WaiverCreateRequest createValidRequest() {
        ParticipantCreateRequest participant = new ParticipantCreateRequest();
        participant.setFirstName("Test");
        participant.setLastName("Participant");
        participant.setDateOfBirth(LocalDate.of(2015, 1, 1));

        WaiverCreateRequest request = new WaiverCreateRequest();
        request.setParentFirstName("Jared");
        request.setParentLastName("Drake");
        request.setEmail("jared@example.com");
        request.setPhone("555-555-5555");
        request.setAgreedToTerms(true);
        request.setParticipants(List.of(participant));

        return request;
    }

    private Waiver createSavedWaiver() {
        Waiver waiver = new Waiver();
        waiver.setParentFirstName("Jared");
        waiver.setParentLastName("Drake");
        waiver.setEmail("jared@example.com");
        waiver.setPhone("555-555-5555");
        waiver.setAgreedToTerms(true);
        waiver.setSigned(true);
        waiver.setSignedAt(java.time.LocalDateTime.now());
        waiver.setExpiresAt(LocalDate.now().plusYears(1));
        waiver.setActive(true);
        waiver.setConfirmationCode("LIW-123ABC");

        Participant participant = new Participant();
        participant.setFirstName("Test");
        participant.setLastName("Participant");
        participant.setDateOfBirth(LocalDate.of(2015, 1, 1));
        participant.setWaiver(waiver);

        waiver.setParticipants(List.of(participant));

        return waiver;
    }
}