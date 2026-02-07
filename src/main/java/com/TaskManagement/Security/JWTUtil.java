package com.TaskManagement.Security;

import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.TaskManagement.Entity.User;
import com.TaskManagement.Enum.Permission;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtil {
	
	private final Key key;
	private final long expirationTokenMS;

	public JWTUtil(@Value("${jwt.secret:}") String secret,
				   @Value("${jwt.expiration:86400000}") long expiration) {
		if(secret == null || secret.isEmpty()) {
			// Fallback key must be at least 32 characters (256 bits) for HS256
			secret= "DefaultSecretKeyMustBeAtLeast32Characters!";
		}
		key=Keys.hmacShaKeyFor(secret.getBytes());
		this.expirationTokenMS = expiration;
	}
	
	public String generateToken(User user) {
		Set<Permission> permissions = PermissionConfig.getPermissions(user.getRole());
		Date now = new Date();
		Date expiry = new Date(now.getTime()+expirationTokenMS);
		
		return Jwts.builder()
				.setSubject(user.getUserEmail())
				.claim("userName", user.getUserName())
				.claim("role",user.getRole().name())
				.claim("permission", permissions.stream().map(Enum::name).collect(Collectors.toList()))
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(key,SignatureAlgorithm.HS256)
				.compact();
	}
	
	public boolean validateToken(String token) {
		
		try {
			
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (JwtException e) {
			return false;
			
		}
	}
	
	public String getSubject(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}
	public Claims getClaim(String token) {
		return Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
	}

}
