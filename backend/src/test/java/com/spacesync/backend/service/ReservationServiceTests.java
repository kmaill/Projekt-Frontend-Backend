package com.spacesync.backend.service;

import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.model.User;
import com.spacesync.backend.model.Workspace;
import com.spacesync.backend.repository.ReservationRepository;
import com.spacesync.backend.repository.UserRepository;
import com.spacesync.backend.repository.WorkspaceRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class ReservationServiceTests {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private UserRepository userRepository;

    private Workspace workspace;
    private User user;

    @BeforeEach
    void setup() {
        workspace = new Workspace();
        workspace.setName("Test Room");
        workspace.setType("CONFERENCE_ROOM");
        workspace.setPricePerHour(new BigDecimal("100.00"));
        workspace.setCapacity(5);
        workspace.setIsActive(true);
        workspace = workspaceRepository.save(workspace);

        user = new User();
        user.setName("John Doe");
        user.setEmail("john@example.com");
        user.setRole("USER");
        user = userRepository.save(user);
    }

    @Test
    void testAvailability_NoOverlaps() {
        LocalDateTime start = LocalDateTime.of(2026, 5, 1, 10, 0);
        LocalDateTime end = LocalDateTime.of(2026, 5, 1, 12, 0);

        assertTrue(reservationService.isAvailable(workspace.getId(), start, end));
    }

    @Test
    void testAvailability_WithOverlap() {
        LocalDateTime existingStart = LocalDateTime.of(2026, 5, 1, 10, 0);
        LocalDateTime existingEnd = LocalDateTime.of(2026, 5, 1, 12, 0);

        Reservation existing = new Reservation();
        existing.setWorkspace(workspace);
        existing.setUser(user);
        existing.setStartTime(existingStart);
        existing.setEndTime(existingEnd);
        existing.setTotalPrice(new BigDecimal("200.00"));
        existing.setStatus("CONFIRMED");
        reservationRepository.save(existing);

        // 11:00 - 13:00
        assertFalse(reservationService.isAvailable(workspace.getId(), 
                LocalDateTime.of(2026, 5, 1, 11, 0), 
                LocalDateTime.of(2026, 5, 1, 13, 0)));
        
        // 10:30 - 11:30
        assertFalse(reservationService.isAvailable(workspace.getId(), 
                LocalDateTime.of(2026, 5, 1, 10, 30), 
                LocalDateTime.of(2026, 5, 1, 11, 30)));
        
        // 12:00 - 14:00
        assertTrue(reservationService.isAvailable(workspace.getId(), 
                LocalDateTime.of(2026, 5, 1, 12, 0), 
                LocalDateTime.of(2026, 5, 1, 14, 0)));
    }

    @Test
    void testCreateReservation_ThrowsExceptionOnOverlap() {
        LocalDateTime start = LocalDateTime.of(2026, 5, 1, 10, 0);
        LocalDateTime end = LocalDateTime.of(2026, 5, 1, 12, 0);

        Reservation r1 = new Reservation();
        r1.setWorkspace(workspace);
        r1.setUser(user);
        r1.setStartTime(start);
        r1.setEndTime(end);
        r1.setTotalPrice(new BigDecimal("200.00"));
        reservationService.createReservation(r1);

        Reservation r2 = new Reservation();
        r2.setWorkspace(workspace);
        r2.setUser(user);
        r2.setStartTime(start.plusHours(1));
        r2.setEndTime(end.plusHours(1));
        r2.setTotalPrice(new BigDecimal("200.00"));

        assertThrows(RuntimeException.class, () -> reservationService.createReservation(r2));
    }
}
