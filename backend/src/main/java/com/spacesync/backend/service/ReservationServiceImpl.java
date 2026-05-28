package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.Addon;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.model.User;
import com.spacesync.backend.model.Workspace;
import com.spacesync.backend.repository.ReservationRepository;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.repository.WorkspaceRepository;
import com.spacesync.backend.requests.ReservationCreateRequest;
import com.spacesync.backend.requests.ReservationStatusUpdateRequest;
import com.spacesync.backend.responses.ReservationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Override
    public boolean isAvailable(Long workspaceId, LocalDateTime start, LocalDateTime end) {
        if (start.isAfter(end) || start.isEqual(end)) {
            return false;
        }

        List<Reservation> reservations = reservationRepository.findByWorkspaceId(workspaceId);

        return reservations.stream()
                .filter(r -> !r.getStatus().equals("CANCELLED"))
                .noneMatch(r -> start.isBefore(r.getEndTime()) && end.isAfter(r.getStartTime()));
    }

    public void priceIncludingAddons(Reservation reservation, Addon addon, Integer quantity) {
        BigDecimal currentPrice = reservation.getTotalPrice();
        if(currentPrice == null) currentPrice = BigDecimal.ZERO;
        
        int quantityTemp = (quantity != null && quantity > 0) ? quantity : 1;
        BigDecimal multiplier = BigDecimal.valueOf(quantityTemp);
        
        if("PER_HOUR".equals(addon.getBillingType())) {
            Duration reservationDuration = Duration.between(reservation.getStartTime(), reservation.getEndTime());
            reservation.setTotalPrice(currentPrice.add( BigDecimal.valueOf(reservationDuration.toHours()).multiply(addon.getPrice()).multiply(multiplier) ));
        }
        if("PER_RESERVATION".equals(addon.getBillingType())) {
            reservation.setTotalPrice(currentPrice.add( addon.getPrice().multiply(multiplier) ));
        }
        
        reservationRepository.save(reservation);
    }

    @Override
    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ReservationResponse getReservationById(Long id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No reservation of id: " + id));
        return mapToResponse(reservation);
    }

    @Override
    public ReservationResponse createReservation(ReservationCreateRequest request) {
        if (!isAvailable(request.getWorkspaceId(), request.getStartTime(), request.getEndTime())) {
            throw new RuntimeException("Workspace is not available for the selected time range.");
        }

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new ResourceNotFoundException("No user of id: " + request.getUserId()));

        Workspace workspace = workspaceRepository.findById(request.getWorkspaceId()).orElseThrow(() -> new ResourceNotFoundException("No workspace of id: " + request.getWorkspaceId()));

        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setWorkspace(workspace);
        reservation.setStartTime(request.getStartTime());
        reservation.setEndTime(request.getEndTime());
        reservation.setTotalPrice(request.getTotalPrice() != null ? request.getTotalPrice() : BigDecimal.ZERO);
        reservation.setStatus("PENDING");

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToResponse(savedReservation);
    }

    @Override
    public ReservationResponse updateReservationStatus(Long id, ReservationStatusUpdateRequest request) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No reservation of id: " + id));

        if (request.getStatus() != null) {
            reservation.setStatus(request.getStatus());
        }

        Reservation updatedReservation = reservationRepository.save(reservation);
        return mapToResponse(updatedReservation);
    }

    @Override
    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No reservation of id: " + id));
        reservationRepository.delete(reservation);
    }

    private ReservationResponse mapToResponse(Reservation reservation) {
        ReservationResponse response = new ReservationResponse();
        response.setId(reservation.getId());
        if (reservation.getUser() != null) response.setUserId(reservation.getUser().getId());
        if (reservation.getWorkspace() != null) response.setWorkspaceId(reservation.getWorkspace().getId());
        response.setStartTime(reservation.getStartTime());
        response.setEndTime(reservation.getEndTime());
        response.setTotalPrice(reservation.getTotalPrice());
        response.setStatus(reservation.getStatus());
        response.setCreatedAt(reservation.getCreatedAt());
        return response;
    }
}
