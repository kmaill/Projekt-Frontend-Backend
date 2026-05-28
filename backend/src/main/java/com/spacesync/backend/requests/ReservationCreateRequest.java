package com.spacesync.backend.requests;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class ReservationCreateRequest {
    private Long userId;
    private Long workspaceId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private BigDecimal totalPrice;

    public ReservationCreateRequest() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public Long getWorkspaceId() { return workspaceId; }
    public void setWorkspaceId(Long workspaceId) { this.workspaceId = workspaceId; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public BigDecimal getTotalPrice() { return totalPrice; }
    public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
}
