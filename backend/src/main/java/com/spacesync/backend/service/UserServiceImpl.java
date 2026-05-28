package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.requests.UserCreateRequest;
import com.spacesync.backend.requests.UserUpdateRequest;
import com.spacesync.backend.responses.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No user of id: " + id));
        return mapToResponse(user);
    }

    @Override
    public UserResponse createUser(UserCreateRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        // potem sie zrobi hashowanie
        user.setPasswordHash(request.getPassword()); 
        user.setAuthProvider(request.getAuthProvider());
        user.setAuthProviderId(request.getAuthProviderId());
        
        User savedUser = userRepository.save(user);
        return mapToResponse(savedUser);
    }

    @Override
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No user of id: " + id));

        if (request.getName() != null) user.setName(request.getName());
        if (request.getEmail() != null) user.setEmail(request.getEmail());
        if (request.getPassword() != null) user.setPasswordHash(request.getPassword());
        if (request.getAuthProvider() != null) user.setAuthProvider(request.getAuthProvider());
        if (request.getAuthProviderId() != null) user.setAuthProviderId(request.getAuthProviderId());
        if (request.getRole() != null) user.setRole(request.getRole());

        User updatedUser = userRepository.save(user);
        return mapToResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No user of id: " + id));
        userRepository.delete(user);
    }

    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setAuthProvider(user.getAuthProvider());
        response.setAuthProviderId(user.getAuthProviderId());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}
