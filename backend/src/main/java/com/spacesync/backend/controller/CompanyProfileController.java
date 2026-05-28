package com.spacesync.backend.controller;

import com.spacesync.backend.requests.CompanyProfileCreateRequest;
import com.spacesync.backend.requests.CompanyProfileUpdateRequest;
import com.spacesync.backend.responses.CompanyProfileResponse;
import com.spacesync.backend.service.CompanyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company_profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyProfileController {

    @Autowired
    private CompanyProfileService companyProfileService;

    // READ
    @GetMapping
    public ResponseEntity<List<CompanyProfileResponse>> getAllCompanyProfiles() {
        return ResponseEntity.ok(companyProfileService.getAllCompanyProfiles());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<CompanyProfileResponse> createCompanyProfile(@RequestBody CompanyProfileCreateRequest request) {
        return new ResponseEntity<>(companyProfileService.createCompanyProfile(request), HttpStatus.CREATED);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public ResponseEntity<CompanyProfileResponse> getCompanyProfileById(@PathVariable Long id) {
        return ResponseEntity.ok(companyProfileService.getCompanyProfileById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<CompanyProfileResponse> updateCompanyProfile(@PathVariable Long id, @RequestBody CompanyProfileUpdateRequest request) {
        return ResponseEntity.ok(companyProfileService.updateCompanyProfile(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompanyProfile(@PathVariable Long id) {
        companyProfileService.deleteCompanyProfile(id);
        return ResponseEntity.noContent().build();
    }
}