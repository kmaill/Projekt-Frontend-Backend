package com.spacesync.backend.controller;

import com.spacesync.backend.requests.AddonCreateRequest;
import com.spacesync.backend.requests.AddonUpdateRequest;
import com.spacesync.backend.responses.AddonResponse;
import com.spacesync.backend.service.AddonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addons")
@CrossOrigin(origins = "http://localhost:5173")
public class AddonController {

    @Autowired
    private AddonService addonService;

    // READ
    @GetMapping
    public ResponseEntity<List<AddonResponse>> getAllAddons() {
        return ResponseEntity.ok(addonService.getAllAddons());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<AddonResponse> createAddon(@RequestBody AddonCreateRequest request) {
        return new ResponseEntity<>(addonService.createAddon(request), HttpStatus.CREATED);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public ResponseEntity<AddonResponse> getAddonById(@PathVariable Long id) {
        return ResponseEntity.ok(addonService.getAddonById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<AddonResponse> updateAddon(@PathVariable Long id, @RequestBody AddonUpdateRequest request) {
        return ResponseEntity.ok(addonService.updateAddon(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddon(@PathVariable Long id) {
        addonService.deleteAddon(id);
        return ResponseEntity.noContent().build();
    }
}