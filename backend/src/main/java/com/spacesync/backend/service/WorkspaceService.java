package com.spacesync.backend.service;

import com.spacesync.backend.requests.WorkspaceCreateRequest;
import com.spacesync.backend.requests.WorkspaceUpdateRequest;
import com.spacesync.backend.responses.WorkspaceResponse;

import java.util.List;

public interface WorkspaceService {
    List<WorkspaceResponse> getAllWorkspaces();
    WorkspaceResponse getWorkspaceById(Long id);
    WorkspaceResponse createWorkspace(WorkspaceCreateRequest request);
    WorkspaceResponse updateWorkspace(Long id, WorkspaceUpdateRequest request);
    void deleteWorkspace(Long id);
}
