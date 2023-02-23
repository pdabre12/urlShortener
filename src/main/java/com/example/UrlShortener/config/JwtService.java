package com.example.UrlShortener.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public static final String SECRET_KEY="urlshortener";

    public String extractUsername(String token) {
        return null;
    }

    public Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJwt(token)
                .getBody();
    }
}
