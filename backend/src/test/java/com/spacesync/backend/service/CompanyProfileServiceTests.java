package com.spacesync.backend.service;

import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.CompanyProfileRepository;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.requests.CompanyProfileCreateRequest;
import com.spacesync.backend.responses.CompanyProfileResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CompanyProfileServiceTests {

    @Mock private CompanyProfileRepository repo;
    @Mock private UserRepository userRepo;
    @Mock private Authentication auth;
    @InjectMocks private CompanyProfileServiceImpl service;

    @Test
    void testCreateCompanyProfile_WhenProfileExists() {
        User user = new User();
        user.setId(1L);
        when(auth.getName()).thenReturn("test@test.com");
        when(userRepo.findByEmail("test@test.com")).thenReturn(Optional.of(user));
        when(repo.findByUserId(1L)).thenReturn(Optional.of(new com.spacesync.backend.model.CompanyProfile()));
        when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

        assertDoesNotThrow(() -> service.createCompanyProfile(auth, new CompanyProfileCreateRequest()));
    }
}