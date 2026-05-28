package com.spacesync.backend.service;

import com.spacesync.backend.requests.ReservationAddonCreateRequest;
import com.spacesync.backend.requests.ReservationAddonUpdateRequest;
import com.spacesync.backend.responses.ReservationAddonResponse;

import java.util.List;

public interface ReservationAddonService {
    List<ReservationAddonResponse> getAllReservationAddons();
    ReservationAddonResponse getReservationAddon(Long reservationId, Long addonId);
    ReservationAddonResponse createReservationAddon(ReservationAddonCreateRequest request);
    ReservationAddonResponse updateReservationAddon(Long reservationId, Long addonId, ReservationAddonUpdateRequest request);
    void deleteReservationAddon(Long reservationId, Long addonId);
}
