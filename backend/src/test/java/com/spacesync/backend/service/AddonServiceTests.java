package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.Addon;
import com.spacesync.backend.repository.AddonRepository;
import com.spacesync.backend.requests.AddonCreateRequest;
import com.spacesync.backend.requests.AddonUpdateRequest;
import com.spacesync.backend.responses.AddonResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.math.BigDecimal;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AddonServiceTests {

    @Mock
    private AddonRepository addonRepository;

    @InjectMocks
    private AddonServiceImpl addonService;

    @Test
    void testGetAddonById_NotFound() {
        when(addonRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> addonService.getAddonById(99L));
    }

    @Test
    void testUpdateAddon_PartialUpdate() {
        Addon existing = new Addon();
        existing.setId(1L);
        existing.setName("Old");
        when(addonRepository.findById(1L)).thenReturn(Optional.of(existing));
        when(addonRepository.save(any(Addon.class))).thenAnswer(i -> i.getArgument(0));

        AddonUpdateRequest req = new AddonUpdateRequest();
        req.setName("New");
        
        AddonResponse res = addonService.updateAddon(1L, req);
        assertEquals("New", res.getName());
    }
}