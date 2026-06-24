package com.spacesync.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.spacesync.backend.model.Payment;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.repository.PaymentRepository;
import com.spacesync.backend.repository.ReservationRepository;

@Component
public class PaymentScheduler {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void cancelExpiredOnlinePayments() {
        LocalDateTime cutoffTime = LocalDateTime.now().minusMinutes(15);
        List<Payment> expiredPayments = paymentRepository.findExpiredPendingOnlinePayments(cutoffTime);

        for (Payment payment : expiredPayments) {
            payment.setStatus("DENIED");
            paymentRepository.save(payment);

            Reservation reservation = payment.getReservation();
            if (reservation != null) {
                reservation.setStatus("CANCELLED");
                reservationRepository.save(reservation);
            }
        }
    }
}