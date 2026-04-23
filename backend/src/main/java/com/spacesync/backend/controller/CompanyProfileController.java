package com.spacesync.backend.controller;

import com.spacesync.backend.model.CompanyProfile;
import com.spacesync.backend.repository.CompanyProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company_profiles")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyProfileController {

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    // READ
    @GetMapping
    public List<CompanyProfile> getAllCompanyProfiles() {
        return companyProfileRepository.findAll();
    }

    // CREATE
    @PostMapping
    public CompanyProfile createCompanyProfile(@RequestBody CompanyProfile companyProfile) {
        return companyProfileRepository.save(companyProfile);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public CompanyProfile getCompanyProfileById(@PathVariable Long id) {
        return companyProfileRepository.findById(id).orElseThrow(() -> new RuntimeException("No company profile of id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public CompanyProfile updateCompanyProfile(@PathVariable Long id, @RequestBody CompanyProfile companyProfileDetails) {
        CompanyProfile existingCompanyProfile = companyProfileRepository.findById(id).orElseThrow(() -> new RuntimeException("No company profile of id: " + id));
        
        existingCompanyProfile.setUser(companyProfileDetails.getUser());
        existingCompanyProfile.setCompanyName(companyProfileDetails.getCompanyName());
        existingCompanyProfile.setNip(companyProfileDetails.getNip());
        existingCompanyProfile.setAddress(companyProfileDetails.getAddress());
        existingCompanyProfile.setContactEmail(companyProfileDetails.getContactEmail());
        
        return companyProfileRepository.save(existingCompanyProfile);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteCompanyProfile(@PathVariable Long id) {
        CompanyProfile existingCompanyProfile = companyProfileRepository.findById(id).orElseThrow(() -> new RuntimeException("No company profile of id: " + id));
        
        companyProfileRepository.delete(existingCompanyProfile);
    }
}