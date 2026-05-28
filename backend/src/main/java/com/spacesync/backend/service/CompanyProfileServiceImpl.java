package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.CompanyProfile;
import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.CompanyProfileRepository;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.requests.CompanyProfileCreateRequest;
import com.spacesync.backend.requests.CompanyProfileUpdateRequest;
import com.spacesync.backend.responses.CompanyProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyProfileServiceImpl implements CompanyProfileService {

    @Autowired
    private CompanyProfileRepository companyProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CompanyProfileResponse> getAllCompanyProfiles() {
        return companyProfileRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyProfileResponse getCompanyProfileById(Long id) {
        CompanyProfile profile = companyProfileRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No company profile of id: " + id));
        return mapToResponse(profile);
    }

    @Override
    public CompanyProfileResponse createCompanyProfile(CompanyProfileCreateRequest request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new ResourceNotFoundException("No user of id: " + request.getUserId()));

        CompanyProfile profile = new CompanyProfile();
        profile.setUser(user);
        profile.setCompanyName(request.getCompanyName());
        profile.setNip(request.getNip());
        profile.setAddress(request.getAddress());
        profile.setContactEmail(request.getContactEmail());

        CompanyProfile savedProfile = companyProfileRepository.save(profile);
        return mapToResponse(savedProfile);
    }

    @Override
    public CompanyProfileResponse updateCompanyProfile(Long id, CompanyProfileUpdateRequest request) {
        CompanyProfile profile = companyProfileRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No company profile of id: " + id));

        if (request.getCompanyName() != null) profile.setCompanyName(request.getCompanyName());
        if (request.getNip() != null) profile.setNip(request.getNip());
        if (request.getAddress() != null) profile.setAddress(request.getAddress());
        if (request.getContactEmail() != null) profile.setContactEmail(request.getContactEmail());

        CompanyProfile updatedProfile = companyProfileRepository.save(profile);
        return mapToResponse(updatedProfile);
    }

    @Override
    public void deleteCompanyProfile(Long id) {
        CompanyProfile profile = companyProfileRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No company profile of id: " + id));
        companyProfileRepository.delete(profile);
    }

    private CompanyProfileResponse mapToResponse(CompanyProfile profile) {
        CompanyProfileResponse response = new CompanyProfileResponse();
        response.setId(profile.getId());
        if (profile.getUser() != null) {
            response.setUserId(profile.getUser().getId());
        }
        response.setCompanyName(profile.getCompanyName());
        response.setNip(profile.getNip());
        response.setAddress(profile.getAddress());
        response.setContactEmail(profile.getContactEmail());
        return response;
    }
}
