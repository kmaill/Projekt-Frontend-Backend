package com.spacesync.backend.controller;

import com.spacesync.backend.requests.PaymentCreateRequest;
import com.spacesync.backend.requests.PaymentStatusUpdateRequest;
import com.spacesync.backend.responses.PaymentResponse;
import com.spacesync.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // READ
    @GetMapping
    public ResponseEntity<List<PaymentResponse>> getAllPayments() {
        return ResponseEntity.ok(paymentService.getAllPayments());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentCreateRequest request) {
        return new ResponseEntity<>(paymentService.createPayment(request), HttpStatus.CREATED);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPaymentById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<PaymentResponse> updatePayment(@PathVariable Long id, @RequestBody PaymentStatusUpdateRequest request) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}