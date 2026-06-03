package com.lavaisland.waiver.repository;

import com.lavaisland.waiver.model.Waiver;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;

public interface WaiverRepository extends JpaRepository<Waiver, Long> {

    List<Waiver> findByParentLastNameContainingIgnoreCase(String parentLastName);

    List<Waiver> findByParticipantLastNameContainingIgnoreCase(String participantLastName);

    List<Waiver> findDistinctByParticipantsLastNameContainingIgnoreCase(String lastName);

    Optional<Waiver> findByConfirmationCode(String confirmationCode);
}