package com.spacesync.backend.service;

import com.spacesync.backend.exceptions.ResourceNotFoundException;
import com.spacesync.backend.model.Workspace;
import com.spacesync.backend.repository.WorkspaceRepository;
import com.spacesync.backend.requests.WorkspaceCreateRequest;
import com.spacesync.backend.requests.WorkspaceUpdateRequest;
import com.spacesync.backend.responses.WorkspaceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WorkspaceServiceImpl implements WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Override
    public List<WorkspaceResponse> getAllWorkspaces() {
        return workspaceRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public WorkspaceResponse getWorkspaceById(Long id) {
        Workspace workspace = workspaceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No workspace of id: " + id));
        return mapToResponse(workspace);
    }

    @Override
    public WorkspaceResponse createWorkspace(WorkspaceCreateRequest request) {
        Workspace workspace = new Workspace();
        workspace.setName(request.getName());
        workspace.setType(request.getType());
        workspace.setCapacity(request.getCapacity() != null ? request.getCapacity() : 1);
        workspace.setPricePerHour(request.getPricePerHour());
        workspace.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);

        Workspace savedWorkspace = workspaceRepository.save(workspace);
        return mapToResponse(savedWorkspace);
    }

    @Override
    public WorkspaceResponse updateWorkspace(Long id, WorkspaceUpdateRequest request) {
        Workspace workspace = workspaceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No workspace of id: " + id));

        if (request.getName() != null) workspace.setName(request.getName());
        if (request.getType() != null) workspace.setType(request.getType());
        if (request.getCapacity() != null) workspace.setCapacity(request.getCapacity());
        if (request.getPricePerHour() != null) workspace.setPricePerHour(request.getPricePerHour());
        if (request.getIsActive() != null) workspace.setIsActive(request.getIsActive());

        Workspace updatedWorkspace = workspaceRepository.save(workspace);
        return mapToResponse(updatedWorkspace);
    }

    @Override
    public void deleteWorkspace(Long id) {
        Workspace workspace = workspaceRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No workspace of id: " + id));
        workspaceRepository.delete(workspace);
    }

    private WorkspaceResponse mapToResponse(Workspace workspace) {
        WorkspaceResponse response = new WorkspaceResponse();
        response.setId(workspace.getId());
        response.setName(workspace.getName());
        response.setType(workspace.getType());
        response.setCapacity(workspace.getCapacity());
        response.setPricePerHour(workspace.getPricePerHour());
        response.setIsActive(workspace.getIsActive());
        return response;
    }
}
