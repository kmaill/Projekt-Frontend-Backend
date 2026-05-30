package com.spacesync.backend.service;

import com.spacesync.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {
    @Value("${jwt.token.key}")
    private String key;

    public String generateToken(User user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .claim("id", user.getId())
                .claim("role", user.getRole())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ 28800000))
                .signWith(Keys.hmacShaKeyFor(key.getBytes()))
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Claims claim = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return !(claim.getExpiration().compareTo(new Date(System.currentTimeMillis())) < 0.f);
        }
        catch (Exception e) {
            return false;
        }

    }

    public Long getId(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(key.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("id", Long.class);
    }
}
