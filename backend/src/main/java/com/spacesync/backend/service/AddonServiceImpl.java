package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.Addon;
import com.spacesync.backend.repository.AddonRepository;
import com.spacesync.backend.requests.AddonCreateRequest;
import com.spacesync.backend.requests.AddonUpdateRequest;
import com.spacesync.backend.responses.AddonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AddonServiceImpl implements AddonService {

    @Autowired
    private AddonRepository addonRepository;

    @Override
    public List<AddonResponse> getAllAddons() {
        return addonRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public AddonResponse getAddonById(Long id) {
        Addon addon = addonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No addon of id: " + id));
        return mapToResponse(addon);
    }

    @Override
    public AddonResponse createAddon(AddonCreateRequest request) {
        Addon addon = new Addon();
        addon.setName(request.getName());
        addon.setPrice(request.getPrice());
        addon.setBillingType(request.getBillingType());

        Addon savedAddon = addonRepository.save(addon);
        return mapToResponse(savedAddon);
    }

    @Override
    public AddonResponse updateAddon(Long id, AddonUpdateRequest request) {
        Addon addon = addonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No addon of id: " + id));

        if (request.getName() != null) addon.setName(request.getName());
        if (request.getPrice() != null) addon.setPrice(request.getPrice());
        if (request.getBillingType() != null) addon.setBillingType(request.getBillingType());

        Addon updatedAddon = addonRepository.save(addon);
        return mapToResponse(updatedAddon);
    }

    @Override
    public void deleteAddon(Long id) {
        Addon addon = addonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No addon of id: " + id));
        addonRepository.delete(addon);
    }

    private AddonResponse mapToResponse(Addon addon) {
        AddonResponse response = new AddonResponse();
        response.setId(addon.getId());
        response.setName(addon.getName());
        response.setPrice(addon.getPrice());
        response.setBillingType(addon.getBillingType());
        return response;
    }
}
