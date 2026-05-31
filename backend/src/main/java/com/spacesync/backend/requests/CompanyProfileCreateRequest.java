package com.spacesync.backend.requests;

public class CompanyProfileCreateRequest {
    //private Long userId;
    private String companyName;
    private String nip;
    private String address;
    private String contactEmail;

    public CompanyProfileCreateRequest() {}

    //public Long getUserId() { return userId; }
    //public void setUserId(Long userId) { this.userId = userId; }
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getNip() { return nip; }
    public void setNip(String nip) { this.nip = nip; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
}
