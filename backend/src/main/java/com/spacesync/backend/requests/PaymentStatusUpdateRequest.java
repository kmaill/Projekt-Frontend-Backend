package com.spacesync.backend.requests;

public class PaymentStatusUpdateRequest {
    private String status;
    private String transactionId;
    private Long approvedBy;

    public PaymentStatusUpdateRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public Long getApprovedBy() { return approvedBy; }
    public void setApprovedBy(Long approvedBy) { this.approvedBy = approvedBy; }
}
