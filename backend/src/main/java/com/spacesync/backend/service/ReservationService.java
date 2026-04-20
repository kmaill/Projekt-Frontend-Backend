package com.spacesync.backend.service;

import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public boolean isAvailable(Long workspaceId, LocalDateTime start, LocalDateTime end) {
        if (start.isAfter(end) || start.isEqual(end)) {
            return false;
        }

        List<Reservation> reservations = reservationRepository.findByWorkspaceId(workspaceId);

        return reservations.stream()
                .filter(r -> !r.getStatus().equals("CANCELLED"))
                .noneMatch(r -> start.isBefore(r.getEndTime()) && end.isAfter(r.getStartTime()));
    }

    public Reservation createReservation(Reservation reservation) {
        if (!isAvailable(reservation.getWorkspace().getId(), reservation.getStartTime(), reservation.getEndTime())) {
            throw new RuntimeException("Workspace is not available for the selected time range.");
        }
        reservation.setStatus("PENDING");
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
