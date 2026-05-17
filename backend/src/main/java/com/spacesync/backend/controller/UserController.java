package com.spacesync.backend.controller;

import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // READ
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // CREATE
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("No user of id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("No user of id: " + id));
        
        existingUser.setName(userDetails.getName());
        existingUser.setEmail(userDetails.getEmail());
        existingUser.setPasswordHash(userDetails.getPasswordHash());
        existingUser.setAuthProvider(userDetails.getAuthProvider());
        existingUser.setAuthProviderId(userDetails.getAuthProviderId());
        existingUser.setRole(userDetails.getRole());
        existingUser.setCreatedAt(userDetails.getCreatedAt());
        
        return userRepository.save(existingUser);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        User existingUser = userRepository.findById(id).orElseThrow(() -> new RuntimeException("No user of id: " + id));
        
        userRepository.delete(existingUser);
    }
}