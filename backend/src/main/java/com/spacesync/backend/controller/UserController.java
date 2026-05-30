package com.spacesync.backend.controller;

import com.spacesync.backend.requests.UserCreateRequest;
import com.spacesync.backend.requests.UserLoginRequest;
import com.spacesync.backend.requests.UserUpdateRequest;
import com.spacesync.backend.responses.UserResponse;
import com.spacesync.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // READ
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<UserResponse> createUser(@RequestBody UserCreateRequest request) {
        return new ResponseEntity<>(userService.createUser(request), HttpStatus.CREATED);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // READ (po email'u)
    @GetMapping("/{email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<UserResponse> validateUser(@RequestBody UserLoginRequest request) {
        return new ResponseEntity<>(userService.validateUser(request.getEmail(), request.getPassword()), HttpStatus.OK);
    }

    // LOGIN
    @PostMapping("/login/my")
    public ResponseEntity<UserResponse> validateUser(@RequestHeader("Authorization") String auth) {
        return new ResponseEntity<>(userService.validateUser(auth), HttpStatus.OK);
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}