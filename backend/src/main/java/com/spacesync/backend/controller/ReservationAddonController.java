package com.spacesync.backend.controller;

import com.spacesync.backend.requests.ReservationAddonCreateRequest;
import com.spacesync.backend.requests.ReservationAddonUpdateRequest;
import com.spacesync.backend.responses.ReservationAddonResponse;
import com.spacesync.backend.service.ReservationAddonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation_addons")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationAddonController {

    @Autowired
    private ReservationAddonService reservationAddonService;

    // READ
    @GetMapping
    public ResponseEntity<List<ReservationAddonResponse>> getAllReservationAddons() {
        return ResponseEntity.ok(reservationAddonService.getAllReservationAddons());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<ReservationAddonResponse> createReservationAddon(@RequestBody ReservationAddonCreateRequest request) {
        return new ResponseEntity<>(reservationAddonService.createReservationAddon(request), HttpStatus.CREATED);
    }
    
    // READ (po id)
    @GetMapping("/{reservationId}/{addonId}")
    public ResponseEntity<ReservationAddonResponse> getReservationAddon(@PathVariable Long reservationId, @PathVariable Long addonId) {
        return ResponseEntity.ok(reservationAddonService.getReservationAddon(reservationId, addonId));
    }

    // UPDATE
    @PutMapping("/{reservationId}/{addonId}")
    public ResponseEntity<ReservationAddonResponse> updateReservationAddon(
            @PathVariable Long reservationId, 
            @PathVariable Long addonId, 
            @RequestBody ReservationAddonUpdateRequest request) {
        return ResponseEntity.ok(reservationAddonService.updateReservationAddon(reservationId, addonId, request));
    }

    // DELETE
    @DeleteMapping("/{reservationId}/{addonId}")
    public ResponseEntity<Void> deleteReservationAddon(@PathVariable Long reservationId, @PathVariable Long addonId) {
        reservationAddonService.deleteReservationAddon(reservationId, addonId);
        return ResponseEntity.noContent().build();
    }
}