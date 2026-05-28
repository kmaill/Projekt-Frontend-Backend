package com.spacesync.backend.requests;

public class ReservationStatusUpdateRequest {
    private String status;

    public ReservationStatusUpdateRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
