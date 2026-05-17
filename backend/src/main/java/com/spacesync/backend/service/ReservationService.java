package com.spacesync.backend.service;

import com.spacesync.backend.model.Addon;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.repository.ReservationRepository;

import jakarta.annotation.Nullable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
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

    public void priceIncludingAddons(Reservation reservation, Addon addon) {
        BigDecimal currentPrice = reservation.getTotalPrice();
        if(addon.getBillingType().equals("PER_HOUR")) {
            Duration reservationDuration = Duration.between(reservation.getStartTime(), reservation.getEndTime());
            reservation.setTotalPrice(currentPrice.add( BigDecimal.valueOf(reservationDuration.toHours()).multiply(addon.getPrice()) ));
        }
        if(addon.getBillingType().equals("PER_RESERVATION")) {
            reservation.setTotalPrice(currentPrice.add( addon.getPrice() ));
        }
        
        reservationRepository.save(reservation);
    }

    public Reservation createReservation(Reservation reservation, @Nullable Addon addon) {
        if (!isAvailable(reservation.getWorkspace().getId(), reservation.getStartTime(), reservation.getEndTime())) {
            throw new RuntimeException("Workspace is not available for the selected time range.");
        }
        if(addon != null)
            priceIncludingAddons(reservation, addon);
        reservation.setStatus("PENDING");
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }
}
