package com.lavaisland.waiver.repository;

import com.lavaisland.waiver.model.StaffUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StaffUserRepository extends JpaRepository<StaffUser, Long> {

    Optional<StaffUser> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);
}