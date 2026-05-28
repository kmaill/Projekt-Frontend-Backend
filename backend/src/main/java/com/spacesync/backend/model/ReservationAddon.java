package com.spacesync.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reservation_addons")
public class ReservationAddon {

    @EmbeddedId
    private ReservationAddonId id;

    @ManyToOne
    @MapsId("reservationId")
    @JoinColumn(name = "reservation_id")
    private Reservation reservation;

    @ManyToOne
    @MapsId("addonId")
    @JoinColumn(name = "addon_id")
    private Addon addon;

    private Integer quantity = 1;

    public ReservationAddon() {}

    public ReservationAddonId getId() { return id; }
    public void setId(ReservationAddonId id) { this.id = id; }
    public Reservation getReservation() { return reservation; }
    public void setReservation(Reservation reservation) { this.reservation = reservation; }
    public Addon getAddon() { return addon; }
    public void setAddon(Addon addon) { this.addon = addon; }
    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
