package com.spacesync.backend.service;

import com.spacesync.backend.model.Addon;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.requests.ReservationCreateRequest;
import com.spacesync.backend.requests.ReservationStatusUpdateRequest;
import com.spacesync.backend.responses.ReservationResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationService {
    List<ReservationResponse> getAllReservations();
    ReservationResponse getReservationById(Long id);
    ReservationResponse createReservation(ReservationCreateRequest request);
    ReservationResponse updateReservationStatus(Long id, ReservationStatusUpdateRequest request);
    void deleteReservation(Long id);
    boolean isAvailable(Long workspaceId, LocalDateTime start, LocalDateTime end);
    void priceIncludingAddons(Reservation reservation, Addon addon, Integer quantity);
    void confirmReservation(Long id);
}
