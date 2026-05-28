package com.spacesync.backend.requests;

public class CompanyProfileUpdateRequest {
    private String companyName;
    private String nip;
    private String address;
    private String contactEmail;

    public CompanyProfileUpdateRequest() {}

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }
    public String getNip() { return nip; }
    public void setNip(String nip) { this.nip = nip; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }
}
