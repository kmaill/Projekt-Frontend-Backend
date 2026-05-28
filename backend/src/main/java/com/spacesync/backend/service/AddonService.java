package com.spacesync.backend.service;

import com.spacesync.backend.requests.AddonCreateRequest;
import com.spacesync.backend.requests.AddonUpdateRequest;
import com.spacesync.backend.responses.AddonResponse;

import java.util.List;

public interface AddonService {
    List<AddonResponse> getAllAddons();
    AddonResponse getAddonById(Long id);
    AddonResponse createAddon(AddonCreateRequest request);
    AddonResponse updateAddon(Long id, AddonUpdateRequest request);
    void deleteAddon(Long id);
}
