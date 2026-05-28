package com.spacesync.backend.requests;

public class UserCreateRequest {
    private String name;
    private String email;
    private String password;
    private String authProvider;
    private String authProviderId;

    public UserCreateRequest() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getAuthProvider() { return authProvider; }
    public void setAuthProvider(String authProvider) { this.authProvider = authProvider; }
    public String getAuthProviderId() { return authProviderId; }
    public void setAuthProviderId(String authProviderId) { this.authProviderId = authProviderId; }
}
