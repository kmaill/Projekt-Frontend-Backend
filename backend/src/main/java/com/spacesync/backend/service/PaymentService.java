package com.spacesync.backend.service;

import com.spacesync.backend.requests.PaymentCreateRequest;
import com.spacesync.backend.requests.PaymentStatusUpdateRequest;
import com.spacesync.backend.responses.PaymentResponse;

import java.util.List;

public interface PaymentService {
    List<PaymentResponse> getAllPayments();
    PaymentResponse getPaymentById(Long id);
    PaymentResponse createPayment(PaymentCreateRequest request);
    PaymentResponse updatePaymentStatus(Long id, PaymentStatusUpdateRequest request);
    void deletePayment(Long id);
}
