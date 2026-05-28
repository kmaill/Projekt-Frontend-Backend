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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse getPaymentById(Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No payment of id: " + id));
        return mapToResponse(payment);
    }

    @Override
    public PaymentResponse createPayment(PaymentCreateRequest request) {
        Reservation reservation = reservationRepository.findById(request.getReservationId()).orElseThrow(() -> new ResourceNotFoundException("No reservation of id: " + request.getReservationId()));

        Payment payment = new Payment();
        payment.setReservation(reservation);
        payment.setAmount(request.getAmount());
        payment.setPaymentMethod(request.getPaymentMethod());

        Payment savedPayment = paymentRepository.save(payment);
        return mapToResponse(savedPayment);
    }

    @Override
    public PaymentResponse updatePaymentStatus(Long id, PaymentStatusUpdateRequest request) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No payment of id: " + id));

        if (request.getStatus() != null) payment.setStatus(request.getStatus());
        if (request.getTransactionId() != null) payment.setTransactionId(request.getTransactionId());
        
        if (request.getApprovedBy() != null) {
            User admin = userRepository.findById(request.getApprovedBy()).orElseThrow(() -> new ResourceNotFoundException("No admin of id: " + request.getApprovedBy()));
            payment.setApprovedBy(admin);
        }

        Payment updatedPayment = paymentRepository.save(payment);
        return mapToResponse(updatedPayment);
    }

    @Override
    public void deletePayment(Long id) {
        Payment payment = paymentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No payment of id: " + id));
        paymentRepository.delete(payment);
    }

    private PaymentResponse mapToResponse(Payment payment) {
        PaymentResponse response = new PaymentResponse();
        response.setId(payment.getId());
        if (payment.getReservation() != null) response.setReservationId(payment.getReservation().getId());
        response.setAmount(payment.getAmount());
        response.setPaymentMethod(payment.getPaymentMethod());
        response.setStatus(payment.getStatus());
        response.setTransactionId(payment.getTransactionId());
        if (payment.getApprovedBy() != null) response.setApprovedBy(payment.getApprovedBy().getId());
        response.setCreatedAt(payment.getCreatedAt());
        return response;
    }
}
