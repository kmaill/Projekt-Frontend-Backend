package com.spacesync.backend.service;

import com.spacesync.backend.requests.CompanyProfileCreateRequest;
import com.spacesync.backend.requests.CompanyProfileUpdateRequest;
import com.spacesync.backend.responses.CompanyProfileResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface CompanyProfileService {
    List<CompanyProfileResponse> getAllCompanyProfiles();
    CompanyProfileResponse getCompanyProfile(Authentication authentication);
    CompanyProfileResponse createCompanyProfile(Authentication authentication, CompanyProfileCreateRequest request);
    CompanyProfileResponse updateCompanyProfile(Long id, CompanyProfileUpdateRequest request);
    void deleteCompanyProfile(Long id);
}
