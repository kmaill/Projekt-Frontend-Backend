package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.Payment;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.model.User;
import com.spacesync.backend.repository.PaymentRepository;
import com.spacesync.backend.repository.ReservationRepository;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.requests.PaymentCreateRequest;
import com.spacesync.backend.requests.PaymentStatusUpdateRequest;
import com.spacesync.backend.responses.PaymentResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceTests {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    private Payment mockPayment;
    private Reservation mockReservation;

    @BeforeEach
    void setup() {
        mockReservation = new Reservation();
        mockReservation.setId(1L);

        mockPayment = new Payment();
        mockPayment.setId(1L);
        mockPayment.setReservation(mockReservation);
        mockPayment.setAmount(new BigDecimal("100.00"));
    }

    @Test
    void testGetAllPayments() {
        when(paymentRepository.findAll()).thenReturn(List.of(mockPayment));
        List<PaymentResponse> responses = paymentService.getAllPayments();
        assertEquals(1, responses.size());
    }

    @Test
    void testGetPaymentById_Success() {
        when(paymentRepository.findById(1L)).thenReturn(Optional.of(mockPayment));
        PaymentResponse response = paymentService.getPaymentById(1L);
        assertNotNull(response);
        assertEquals(1L, response.getId());
    }

    @Test
    void testGetPaymentById_NotFound() {
        when(paymentRepository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> paymentService.getPaymentById(99L));
    }

    @Test
    void testCreatePayment_Success() {
        PaymentCreateRequest request = new PaymentCreateRequest();
        request.setReservationId(1L);
        request.setAmount(new BigDecimal("100.00"));

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(mockReservation));
        when(paymentRepository.save(any(Payment.class))).thenAnswer(i -> i.getArgument(0));

        PaymentResponse response = paymentService.createPayment(request);
        assertNotNull(response);
        assertEquals(1L, response.getReservationId());
    }

    @Test
    void testUpdatePaymentStatus_CompletedTriggersReservationUpdate() {
        PaymentStatusUpdateRequest request = new PaymentStatusUpdateRequest();
        request.setStatus("COMPLETED");

        when(paymentRepository.findById(1L)).thenReturn(Optional.of(mockPayment));
        when(paymentRepository.save(any(Payment.class))).thenAnswer(i -> i.getArgument(0));
        when(reservationRepository.save(any(Reservation.class))).thenAnswer(i -> i.getArgument(0));

        paymentService.updatePaymentStatus(1L, request);

        assertEquals("CONFIRMED", mockReservation.getStatus());
        verify(reservationRepository, times(1)).save(mockReservation);
    }

    @Test
    void testDeletePayment_Success() {
        when(paymentRepository.findById(1L)).thenReturn(Optional.of(mockPayment));
        doNothing().when(paymentRepository).delete(mockPayment);

        assertDoesNotThrow(() -> paymentService.deletePayment(1L));
        verify(paymentRepository, times(1)).delete(mockPayment);
    }
}