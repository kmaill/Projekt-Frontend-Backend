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
import com.spacesync.backend.requests.ReservationAddonUpdateRequest;
import com.spacesync.backend.responses.ReservationAddonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationAddonServiceImpl implements ReservationAddonService {

    @Autowired
    private ReservationAddonRepository reservationAddonRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private AddonRepository addonRepository;

    @Autowired
    private ReservationService reservationService;

    @Override
    public List<ReservationAddonResponse> getAllReservationAddons() {
        return reservationAddonRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationAddonResponse getReservationAddon(Long reservationId, Long addonId) {
        ReservationAddonId id = new ReservationAddonId(reservationId, addonId);
        ReservationAddon addon = reservationAddonRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No reservation addon found"));
        return mapToResponse(addon);
    }

    @Override
    public ReservationAddonResponse createReservationAddon(ReservationAddonCreateRequest request) {
        Reservation reservation = reservationRepository.findById(request.getReservationId()).orElseThrow(() -> new ResourceNotFoundException("No reservation of id: " + request.getReservationId()));
        
        Addon addon = addonRepository.findById(request.getAddonId()).orElseThrow(() -> new ResourceNotFoundException("No addon of id: " + request.getAddonId()));

        ReservationAddonId id = new ReservationAddonId(request.getReservationId(), request.getAddonId());
        
        Integer quantity = request.getQuantity() != null ? request.getQuantity() : 1;

        ReservationAddon reservationAddon = new ReservationAddon();
        reservationAddon.setId(id);
        reservationAddon.setReservation(reservation);
        reservationAddon.setAddon(addon);
        reservationAddon.setQuantity(quantity);

        ReservationAddon saved = reservationAddonRepository.save(reservationAddon);
        
        reservationService.priceIncludingAddons(reservation, addon, quantity);
        
        return mapToResponse(saved);
    }

    @Override
    public ReservationAddonResponse updateReservationAddon(Long reservationId, Long addonId, ReservationAddonUpdateRequest request) {
        ReservationAddonId id = new ReservationAddonId(reservationId, addonId);
        ReservationAddon reservationAddon = reservationAddonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No reservation addon found"));

        if (request.getQuantity() != null) {
            reservationAddon.setQuantity(request.getQuantity());
        }

        ReservationAddon updated = reservationAddonRepository.save(reservationAddon);
        return mapToResponse(updated);
    }

    @Override
    public void deleteReservationAddon(Long reservationId, Long addonId) {
        ReservationAddonId id = new ReservationAddonId(reservationId, addonId);
        ReservationAddon reservationAddon = reservationAddonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No reservation addon found"));
        reservationAddonRepository.delete(reservationAddon);
    }

    private ReservationAddonResponse mapToResponse(ReservationAddon reservationAddon) {
        ReservationAddonResponse response = new ReservationAddonResponse();
        if (reservationAddon.getId() != null) {
            response.setReservationId(reservationAddon.getReservation().getId());
            response.setAddonId(reservationAddon.getAddon().getId());
        }
        response.setQuantity(reservationAddon.getQuantity());
        return response;
    }
}
