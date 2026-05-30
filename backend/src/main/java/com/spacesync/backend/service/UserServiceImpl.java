package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.requests.UserCreateRequest;
import com.spacesync.backend.requests.UserUpdateRequest;
import com.spacesync.backend.responses.UserResponse;
import com.spacesync.backend.service.util.HashingUtil;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

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
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Wrong credentials"));
        return mapToResponse(user);
    }

    @Override
    public UserResponse validateUser(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Wrong credentials"));
        // Hashowanie hasła
        // Obsługa authProvidera
        //return (Objects.equals(user.getPasswordHash(), password)) ? mapToResponse(user) : null;
        String userHash = userRepository.findByEmail(email).get().getPasswordHash();
        if(!BCrypt.checkpw(password, userHash)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Wrong credentials");
        }

        String token = jwtService.generateToken(user);

        UserResponse response = mapToResponse(user);
        response.setToken(token);
        return response;
    }

    @Override
    public UserResponse validateUser(String token) {
        token = token.replace("Bearer ","");
        if(!jwtService.validateToken(token)) {
            throw new ResponseStatusException(HttpStatus.GONE, "Token invalid");
        }
        User user = userRepository.findById(jwtService.getId(token)).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Wrong credentials"));
        UserResponse response = mapToResponse(user);
        response.setToken(jwtService.generateToken(user));
        return response;
    }

    @Override
    public UserResponse createUser(UserCreateRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Account with Email exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        
        // hashowanie
        String hashedPass = HashingUtil.hashPassword(request.getPassword());

        user.setPasswordHash(hashedPass); 
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
