package com.spacesync.backend.config;

import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.service.util.HashingUtil;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminSetup {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByEmail("admin@admin.pl").isEmpty()) {
                User admin = new User();
                admin.setName("admin");
                admin.setEmail("admin@admin.pl");
                admin.setPasswordHash(HashingUtil.hashPassword("admin1234"));
                admin.setRole("ADMIN");

                userRepository.save(admin);
                System.out.println("admin gotowy");
            }
        };
    }
}