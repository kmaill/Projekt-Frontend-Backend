package com.spacesync.backend.repository;

import com.spacesync.backend.model.ReservationAddon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationAddonRepository extends JpaRepository<ReservationAddon, Long> {
    List<ReservationAddon> findByReservationId(Long reservationId);
}
