package com.lavaisland.waiver.security;

import com.lavaisland.waiver.model.StaffUser;
import com.lavaisland.waiver.repository.StaffUserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffUserDetailsService implements UserDetailsService {

    private final StaffUserRepository staffUserRepository;

    public StaffUserDetailsService(StaffUserRepository staffUserRepository) {
        this.staffUserRepository = staffUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        StaffUser staffUser = staffUserRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new UsernameNotFoundException("Staff user not found"));

        return User.builder()
                .username(staffUser.getEmail())
                .password(staffUser.getPasswordHash())
                .authorities(List.of(
                        new SimpleGrantedAuthority("ROLE_" + staffUser.getRole().name())
                ))
                .disabled(!staffUser.isEnabled())
                .build();
    }
}