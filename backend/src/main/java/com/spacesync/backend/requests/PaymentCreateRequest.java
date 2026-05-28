package com.spacesync.backend.requests;

import java.math.BigDecimal;

public class PaymentCreateRequest {
    private Long reservationId;
    private BigDecimal amount;
    private String paymentMethod;

    public PaymentCreateRequest() {}

    public Long getReservationId() { return reservationId; }
    public void setReservationId(Long reservationId) { this.reservationId = reservationId; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
