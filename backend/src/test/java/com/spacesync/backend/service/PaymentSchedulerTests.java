package com.spacesync.backend.service;

import com.spacesync.backend.model.Payment;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.repository.PaymentRepository;
import com.spacesync.backend.repository.ReservationRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.LocalDateTime;
import java.util.List;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PaymentSchedulerTests {

    @Mock private PaymentRepository paymentRepository;
    @Mock private ReservationRepository reservationRepository;
    @InjectMocks private PaymentScheduler scheduler;

    @Test
    void testCancelExpiredOnlinePayments() {
        Payment p = new Payment();
        p.setReservation(new Reservation());
        
        when(paymentRepository.findExpiredPendingOnlinePayments(any(LocalDateTime.class)))
            .thenReturn(List.of(p));

        scheduler.cancelExpiredOnlinePayments();

        verify(paymentRepository, times(1)).save(p);
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }
}