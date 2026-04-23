package com.spacesync.backend.controller;

import com.spacesync.backend.model.ReservationAddon;
import com.spacesync.backend.repository.ReservationAddonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservation_addons")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationAddonController {

    @Autowired
    private ReservationAddonRepository reservationAddonRepository;

    // READ
    @GetMapping
    public List<ReservationAddon> getAllReservationAddons() {
        return reservationAddonRepository.findAll();
    }

    // CREATE
    @PostMapping
    public ReservationAddon createReservationAddon(@RequestBody ReservationAddon reservationAddon) {
        return reservationAddonRepository.save(reservationAddon);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public ReservationAddon getReservationAddonById(@PathVariable Long id) {
        return reservationAddonRepository.findById(id).orElseThrow(() -> new RuntimeException("No reservation addon of id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ReservationAddon updateReservationAddon(@PathVariable Long id, @RequestBody ReservationAddon reservationAddonDetails) {
        ReservationAddon existingReservationAddon = reservationAddonRepository.findById(id).orElseThrow(() -> new RuntimeException("No reservation addon of id: " + id));
        
        existingReservationAddon.setReservation(reservationAddonDetails.getReservation());
        existingReservationAddon.setAddon(reservationAddonDetails.getAddon());
        existingReservationAddon.setQuantity(reservationAddonDetails.getQuantity());
        
        return reservationAddonRepository.save(existingReservationAddon);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteReservationAddon(@PathVariable Long id) {
        ReservationAddon existingReservationAddon = reservationAddonRepository.findById(id).orElseThrow(() -> new RuntimeException("No reservation addon of id: " + id));
        
        reservationAddonRepository.delete(existingReservationAddon);
    }
}