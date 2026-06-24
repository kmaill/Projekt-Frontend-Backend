package com.spacesync.backend.service;

import com.spacesync.backend.repository.WorkspaceRepository;
import com.spacesync.backend.requests.WorkspaceCreateRequest;
import com.spacesync.backend.requests.WorkspaceUpdateRequest;
import com.spacesync.backend.responses.WorkspaceResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class WorkspaceServiceTests {

    @Autowired
    private WorkspaceService workspaceService;

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @BeforeEach
    void setup() {
        workspaceRepository.deleteAll();
    }

    @Test
    void testCreateWorkspace() {
        WorkspaceCreateRequest request = new WorkspaceCreateRequest();
        request.setName("Test Workspace");
        request.setType("DESK");
        request.setPricePerHour(new BigDecimal("15.50"));
        request.setCapacity(1);
        request.setIsActive(true);

        WorkspaceResponse response = workspaceService.createWorkspace(request);

        assertNotNull(response.getId());
        assertEquals("Test Workspace", response.getName());
        assertEquals("DESK", response.getType());
        assertEquals(new BigDecimal("15.50"), response.getPricePerHour());
    }

    @Test
    void testGetAllWorkspaces() {
        WorkspaceCreateRequest req1 = new WorkspaceCreateRequest();
        req1.setName("Desk 1");
        req1.setType("DESK");
        req1.setPricePerHour(new BigDecimal("10"));
        req1.setCapacity(1);
        req1.setIsActive(true);
        workspaceService.createWorkspace(req1);

        WorkspaceCreateRequest req2 = new WorkspaceCreateRequest();
        req2.setName("Desk 2");
        req2.setType("DESK");
        req2.setPricePerHour(new BigDecimal("12"));
        req2.setCapacity(2);
        req2.setIsActive(true);
        workspaceService.createWorkspace(req2);

        List<WorkspaceResponse> workspaces = workspaceService.getAllWorkspaces();
        assertEquals(2, workspaces.size());
    }

    @Test
    void testUpdateWorkspace() {
        WorkspaceCreateRequest req = new WorkspaceCreateRequest();
        req.setName("Old Name");
        req.setType("DESK");
        req.setPricePerHour(new BigDecimal("20"));
        WorkspaceResponse created = workspaceService.createWorkspace(req);

        WorkspaceUpdateRequest updateReq = new WorkspaceUpdateRequest();
        updateReq.setName("New Name");
        updateReq.setPricePerHour(new BigDecimal("25.00"));

        WorkspaceResponse updated = workspaceService.updateWorkspace(created.getId(), updateReq);

        assertEquals("New Name", updated.getName());
        assertEquals(new BigDecimal("25.00"), updated.getPricePerHour());
    }

    @Test
    void testDeleteWorkspace() {
        WorkspaceCreateRequest req = new WorkspaceCreateRequest();
        req.setName("To Delete");
        req.setType("DESK");
        req.setPricePerHour(new BigDecimal("5"));
        WorkspaceResponse created = workspaceService.createWorkspace(req);

        assertEquals(1, workspaceRepository.count());

        workspaceService.deleteWorkspace(created.getId());

        assertEquals(0, workspaceRepository.count());
    }
}
