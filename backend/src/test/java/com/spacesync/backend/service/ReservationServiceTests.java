package com.spacesync.backend.service;

import com.spacesync.backend.model.Addon;
import com.spacesync.backend.model.Reservation;
import com.spacesync.backend.model.User;
import com.spacesync.backend.model.Workspace;
import com.spacesync.backend.repository.AddonRepository;
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
    private AddonRepository addonRepository;

    @Autowired
    private UserRepository userRepository;

    private Workspace workspace;
    private User user;
    private Addon addon1, addon2;

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

        addon1 = new Addon();
        addon1.setName("WhiteBoard");
        addon1.setPrice(BigDecimal.valueOf(20));
        addon1.setBillingType("PER_RESERVATION");

        addon2 = new Addon();
        addon2.setName("Projector");
        addon2.setPrice(BigDecimal.valueOf(100));
        addon2.setBillingType("PER_HOUR");

        addon1 = addonRepository.save(addon1);
        addon2 = addonRepository.save(addon2);
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
        reservationService.createReservation(r1, null);

        Reservation r2 = new Reservation();
        r2.setWorkspace(workspace);
        r2.setUser(user);
        r2.setStartTime(start.plusHours(1));
        r2.setEndTime(end.plusHours(1));
        r2.setTotalPrice(new BigDecimal("200.00"));

        assertThrows(RuntimeException.class, () -> reservationService.createReservation(r2, null));
    }

    @Test
    void testCreateReservation_WithAddon() {
        LocalDateTime start = LocalDateTime.of(2026, 5, 1, 10, 0);
        LocalDateTime end = LocalDateTime.of(2026, 5, 1, 12, 0);
        Reservation r1 = new Reservation();

        r1.setWorkspace(workspace);
        r1.setUser(user);
        r1.setStartTime(start);
        r1.setEndTime(end);
        r1.setTotalPrice(new BigDecimal("200.00"));

        reservationService.createReservation(r1, addon1);

        //System.out.println(r1.getTotalPrice());
        assertTrue( r1.getTotalPrice().compareTo(new BigDecimal(220.00)) == 0 );

        LocalDateTime start1 = LocalDateTime.of(2027, 5, 1, 10, 0);
        LocalDateTime end1 = LocalDateTime.of(2027, 5, 1, 12, 0);
        Reservation r2 = new Reservation();

        r2.setWorkspace(workspace);
        r2.setUser(user);
        r2.setStartTime(start1);
        r2.setEndTime(end1);
        r2.setTotalPrice(new BigDecimal("200.00"));

        reservationService.createReservation(r2, addon2);

        assertTrue( r2.getTotalPrice().compareTo(new BigDecimal("400.00")) == 0);
    }
}
