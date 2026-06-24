package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.requests.UserCreateRequest;
import com.spacesync.backend.responses.UserResponse;
import com.spacesync.backend.service.util.HashingUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private UserServiceImpl userService;

    private User mockUser;

    @BeforeEach
    void setup() {
        mockUser = new User();
        mockUser.setId(1L);
        mockUser.setName("Test User");
        mockUser.setEmail("test@test.com");
        mockUser.setRole("USER");
        mockUser.setPasswordHash(HashingUtil.hashPassword("secret123"));
    }

    @Test
    void testGetUserById_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        UserResponse response = userService.getUserById(1L);

        assertNotNull(response);
        assertEquals("Test User", response.getName());
        assertEquals("test@test.com", response.getEmail());
    }

    @Test
    void testGetUserById_NotFound() {
        when(userRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(99L));
    }

    @Test
    void testCreateUser_Success() {
        UserCreateRequest request = new UserCreateRequest();
        request.setName("New User");
        request.setEmail("new@test.com");
        request.setPassword("password");

        when(userRepository.findByEmail("new@test.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User u = invocation.getArgument(0);
            u.setId(2L);
            return u;
        });

        UserResponse response = userService.createUser(request);

        assertNotNull(response);
        assertEquals(2L, response.getId());
        assertEquals("New User", response.getName());
        assertEquals("new@test.com", response.getEmail());
    }

    @Test
    void testCreateUser_EmailAlreadyExists() {
        UserCreateRequest request = new UserCreateRequest();
        request.setEmail("test@test.com");

        when(userRepository.findByEmail("test@test.com")).thenReturn(Optional.of(mockUser));

        assertThrows(ResponseStatusException.class, () -> userService.createUser(request));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testGetAllUsers() {
        when(userRepository.findAll()).thenReturn(List.of(mockUser));

        List<UserResponse> responses = userService.getAllUsers();

        assertEquals(1, responses.size());
        assertEquals("Test User", responses.get(0).getName());
    }
}
