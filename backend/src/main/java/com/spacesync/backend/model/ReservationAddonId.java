package com.spacesync.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ReservationAddonId implements Serializable {
    @Column(name = "reservation_id")
    private Long reservationId;

    @Column(name = "addon_id")
    private Long addonId;

    public ReservationAddonId() {}

    public ReservationAddonId(Long reservationId, Long addonId) {
        this.reservationId = reservationId;
        this.addonId = addonId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReservationAddonId that = (ReservationAddonId) o;
        return Objects.equals(reservationId, that.reservationId) && Objects.equals(addonId, that.addonId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reservationId, addonId);
    }
}
