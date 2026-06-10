package com.lavaisland.waiver.config;

import com.lavaisland.waiver.model.StaffRole;
import com.lavaisland.waiver.model.StaffUser;
import com.lavaisland.waiver.repository.StaffUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DevAdminSeeder implements CommandLineRunner {

    private final StaffUserRepository staffUserRepository;
    private final PasswordEncoder passwordEncoder;

    public DevAdminSeeder(
            StaffUserRepository staffUserRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.staffUserRepository = staffUserRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String email = System.getenv().getOrDefault("DEV_ADMIN_EMAIL", "admin@lava.local");
        String password = System.getenv().getOrDefault("DEV_ADMIN_PASSWORD", "AdminPassword123!");

        if (staffUserRepository.existsByEmailIgnoreCase(email)) {
            return;
        }

        StaffUser admin = new StaffUser();
        admin.setEmail(email);
        admin.setPasswordHash(passwordEncoder.encode(password));
        admin.setFirstName("Dev");
        admin.setLastName("Admin");
        admin.setRole(StaffRole.ADMIN);
        admin.setEnabled(true);

        staffUserRepository.save(admin);

        System.out.println("Created development admin user: " + email);
    }
}