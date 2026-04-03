package com.spacesync.backend.controller;

import com.spacesync.backend.model.Workspace;
import com.spacesync.backend.repository.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workspaces")
@CrossOrigin(origins = "http://localhost:5173")
public class WorkspaceController {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    // READ
    @GetMapping
    public List<Workspace> getAllWorkspaces() {
        return workspaceRepository.findAll();
    }

    // CREATE
    @PostMapping
    public Workspace createWorkspace(@RequestBody Workspace workspace) {
        return workspaceRepository.save(workspace);
    }
    
    // READ (po id)
    @GetMapping("/{id}")
    public Workspace getWorkspaceById(@PathVariable Long id) {
        return workspaceRepository.findById(id).orElseThrow(() -> new RuntimeException("No workspace of id: " + id));
    }

    // UPDATE
    @PutMapping("/{id}")
    public Workspace updateWorkspace(@PathVariable Long id, @RequestBody Workspace workspaceDetails) {
        Workspace existingWorkspace = workspaceRepository.findById(id).orElseThrow(() -> new RuntimeException("No workspace of id: " + id));
        
        existingWorkspace.setName(workspaceDetails.getName());
        existingWorkspace.setType(workspaceDetails.getType());
        existingWorkspace.setPricePerHour(workspaceDetails.getPricePerHour());
        
        return workspaceRepository.save(existingWorkspace);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void deleteWorkspace(@PathVariable Long id) {
        Workspace existingWorkspace = workspaceRepository.findById(id).orElseThrow(() -> new RuntimeException("No workspace of id: " + id));
        
        workspaceRepository.delete(existingWorkspace);
    }
}