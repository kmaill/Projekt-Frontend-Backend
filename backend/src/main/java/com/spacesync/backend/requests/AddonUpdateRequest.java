package com.spacesync.backend.requests;

import java.math.BigDecimal;

public class AddonUpdateRequest {
    private String name;
    private BigDecimal price;
    private String billingType;

    public AddonUpdateRequest() {}
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getBillingType() { return billingType; }
    public void setBillingType(String billingType) { this.billingType = billingType; }
}
