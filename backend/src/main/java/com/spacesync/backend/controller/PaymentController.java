package com.spacesync.backend.controller;

import com.spacesync.backend.model.Payment;
import com.spacesync.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    // READ
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // CREATE
    @PostMapping
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("No payment of id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Payment updatePayment(@PathVariable Long id, @RequestBody Payment paymentDetails) {
        Payment existingPayment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("No payment of id: " + id));
        
        existingPayment.setReservation(paymentDetails.getReservation());
        existingPayment.setAmount(paymentDetails.getAmount());
        existingPayment.setPaymentMethod(paymentDetails.getPaymentMethod());
        existingPayment.setStatus(paymentDetails.getStatus());
        existingPayment.setTransactionId(paymentDetails.getTransactionId());
        existingPayment.setApprovedBy(paymentDetails.getApprovedBy());
        existingPayment.setCreatedAt(paymentDetails.getCreatedAt());
        
        return paymentRepository.save(existingPayment);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deletePayment(@PathVariable Long id) {
        Payment existingPayment = paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("No payment of id: " + id));
        
        paymentRepository.delete(existingPayment);
    }
}