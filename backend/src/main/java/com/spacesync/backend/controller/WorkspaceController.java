package com.spacesync.backend.controller;

import com.spacesync.backend.requests.WorkspaceCreateRequest;
import com.spacesync.backend.requests.WorkspaceUpdateRequest;
import com.spacesync.backend.responses.WorkspaceResponse;
import com.spacesync.backend.service.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    // READ
    @GetMapping
    public ResponseEntity<List<WorkspaceResponse>> getAllWorkspaces() {
        return ResponseEntity.ok(workspaceService.getAllWorkspaces());
    }

    // CREATE
    @PostMapping
    public ResponseEntity<WorkspaceResponse> createWorkspace(@RequestBody WorkspaceCreateRequest request) {
        return new ResponseEntity<>(workspaceService.createWorkspace(request), HttpStatus.CREATED);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public ResponseEntity<WorkspaceResponse> getWorkspaceById(@PathVariable Long id) {
        return ResponseEntity.ok(workspaceService.getWorkspaceById(id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<WorkspaceResponse> updateWorkspace(@PathVariable Long id, @RequestBody WorkspaceUpdateRequest request) {
        return ResponseEntity.ok(workspaceService.updateWorkspace(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkspace(@PathVariable Long id) {
        workspaceService.deleteWorkspace(id);
        return ResponseEntity.noContent().build();
    }
}