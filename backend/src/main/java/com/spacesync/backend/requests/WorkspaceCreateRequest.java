package com.spacesync.backend.requests;

import java.math.BigDecimal;

public class WorkspaceCreateRequest {
    private String name;
    private String type;
    private Integer capacity;
    private BigDecimal pricePerHour;
    private Boolean isActive;

    public WorkspaceCreateRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }
    public BigDecimal getPricePerHour() { return pricePerHour; }
    public void setPricePerHour(BigDecimal pricePerHour) { this.pricePerHour = pricePerHour; }
    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
