package com.spacesync.backend.responses;

import java.math.BigDecimal;

public class AddonResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private String billingType;

    public AddonResponse() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public String getBillingType() { return billingType; }
    public void setBillingType(String billingType) { this.billingType = billingType; }
}
