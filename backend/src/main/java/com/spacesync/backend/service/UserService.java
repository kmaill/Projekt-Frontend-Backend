package com.spacesync.backend.service;

import com.spacesync.backend.requests.UserCreateRequest;
import com.spacesync.backend.requests.UserUpdateRequest;
import com.spacesync.backend.responses.UserResponse;

import java.util.List;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse getUserByEmail(String email);
    UserResponse validateUser(String email, String password);
    UserResponse createUser(UserCreateRequest request);
    UserResponse updateUser(Long id, UserUpdateRequest request);
    void deleteUser(Long id);
}
