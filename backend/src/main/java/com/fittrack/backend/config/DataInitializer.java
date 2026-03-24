package com.fittrack.backend.config;

import com.fittrack.backend.entity.Role;
import com.fittrack.backend.entity.User;
import com.fittrack.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService() {
        return username -> null;
    }

    @Bean
    CommandLineRunner initSuperAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {

                User admin = userRepository.findByEmail("admin@fittrack.com").orElse(new User());
                admin.setName("SUPER_ADMIN");
                admin.setEmail("admin@fittrack.com");
                admin.setPassword(passwordEncoder.encode("fittrack_admin"));
                admin.setRole(Role.SUPER_ADMIN);
                admin.setEnabled(true);
                userRepository.save(admin);
        };
    }
}
