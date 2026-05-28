package com.spacesync.backend.controller;

import com.spacesync.backend.requests.ReservationCreateRequest;
import com.spacesync.backend.requests.ReservationStatusUpdateRequest;
import com.spacesync.backend.responses.ReservationResponse;
import com.spacesync.backend.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // READ
    @GetMapping
    public ResponseEntity<List<ReservationResponse>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody ReservationCreateRequest request) {
        try {
            return new ResponseEntity<>(reservationService.createReservation(request), HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // READ (po id)
    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponse> getReservationById(@PathVariable Long id) {
        return ResponseEntity.ok(reservationService.getReservationById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<ReservationResponse> updateReservation(@PathVariable Long id, @RequestBody ReservationStatusUpdateRequest request) {
        return ResponseEntity.ok(reservationService.updateReservationStatus(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/check-availability")
    public ResponseEntity<Boolean> checkAvailability(@RequestParam Long workspaceId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(reservationService.isAvailable(workspaceId, start, end));
    }
}
