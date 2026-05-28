package com.spacesync.backend.requests;

public class ReservationAddonCreateRequest {
    private Long reservationId;
    private Long addonId;
    private Integer quantity;

    public ReservationAddonCreateRequest() {}

    public Long getReservationId() { return reservationId; }
    public void setReservationId(Long reservationId) { this.reservationId = reservationId; }
    public Long getAddonId() { return addonId; }
    public void setAddonId(Long addonId) { this.addonId = addonId; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
