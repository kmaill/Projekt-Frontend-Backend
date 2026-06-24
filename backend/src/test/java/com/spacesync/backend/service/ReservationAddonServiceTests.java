package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.Addon;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.model.ReservationAddon;
import com.spacesync.backend.model.ReservationAddonId;
import com.spacesync.backend.repository.AddonRepository;
import com.spacesync.backend.repository.ReservationAddonRepository;
import com.spacesync.backend.repository.ReservationRepository;
import com.spacesync.backend.requests.ReservationAddonCreateRequest;
import com.spacesync.backend.responses.ReservationAddonResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReservationAddonServiceTests {

    @Mock
    private ReservationAddonRepository reservationAddonRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private AddonRepository addonRepository;

    @Mock
    private ReservationService reservationService;

    @InjectMocks
    private ReservationAddonServiceImpl reservationAddonService;

    private ReservationAddon mockReservationAddon;
    private ReservationAddonId mockId;

    @BeforeEach
    void setup() {
        mockId = new ReservationAddonId(1L, 1L);
        mockReservationAddon = new ReservationAddon();
        mockReservationAddon.setId(mockId);
        mockReservationAddon.setReservation(new Reservation());
        mockReservationAddon.setAddon(new Addon());
        mockReservationAddon.setQuantity(1);
    }

    @Test
    void testGetAllReservationAddons() {
        when(reservationAddonRepository.findAll()).thenReturn(List.of(mockReservationAddon));
        List<ReservationAddonResponse> response = reservationAddonService.getAllReservationAddons();
        assertEquals(1, response.size());
    }

    @Test
    void testGetReservationAddon_Success() {
        when(reservationAddonRepository.findById(any(ReservationAddonId.class))).thenReturn(Optional.of(mockReservationAddon));
        ReservationAddonResponse response = reservationAddonService.getReservationAddon(1L, 1L);
        assertNotNull(response);
    }

    @Test
    void testCreateReservationAddon_Success() {
        ReservationAddonCreateRequest request = new ReservationAddonCreateRequest();
        request.setReservationId(1L);
        request.setAddonId(1L);
        request.setQuantity(2);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(new Reservation()));
        when(addonRepository.findById(1L)).thenReturn(Optional.of(new Addon()));
        when(reservationAddonRepository.save(any(ReservationAddon.class))).thenAnswer(i -> i.getArgument(0));

        ReservationAddonResponse response = reservationAddonService.createReservationAddon(request);
        
        assertNotNull(response);
        verify(reservationService, times(1)).priceIncludingAddons(any(), any(), anyInt());
    }

    @Test
    void testDeleteReservationAddon_NotFound() {
        when(reservationAddonRepository.findById(any(ReservationAddonId.class))).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> reservationAddonService.deleteReservationAddon(1L, 1L));
    }
}