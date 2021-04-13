package com.bsthun.w.chxpos.apidemo.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.security.Key;
import java.util.Date;
import java.util.Map;

public class JwtUtil  {
	private static final long VALIDITY = 3 * 24 * 60 * 60 * 1000; // 3 days
	private static final Key KEY = Keys.hmacShaKeyFor(Secret.JWT_KEY.getBytes());
	
	// While creating the token -
	// 1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
	// 2. Sign the JWT using the HS512 algorithm and secret key.
	// 3. According to JWS Compact Serialization (https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
	//    compaction of the JWT to a URL-safe string
	public static String generateToken(String subject, Map<String, Object> claims) {
		return Jwts
				.builder()
				.setClaims(claims)
				.setSubject(subject)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + VALIDITY))
				.signWith(KEY)
				.compact();
	}
	
	public static Claims parseToken(String jws) throws JwtException {
		return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(jws).getBody();
	}
	
}