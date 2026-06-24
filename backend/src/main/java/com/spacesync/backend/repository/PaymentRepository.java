package com.spacesync.backend.repository;

import java.util.List;
import com.spacesync.backend.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query("SELECT p FROM Payment p WHERE p.status = 'PENDING' AND p.paymentMethod = 'ONLINE' AND p.createdAt < :cutoffTime")
    List<Payment> findExpiredPendingOnlinePayments(@Param("cutoffTime") LocalDateTime cutoffTime);
    Optional<Payment> findByReservationId(Long reservationId);
}
