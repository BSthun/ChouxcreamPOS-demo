package com.bsthun.w.chxpos.apidemo.utils

import io.jsonwebtoken.Claims
import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.security.Keys
import java.security.Key
import java.util.*

object JwtUtil {
	private const val VALIDITY = 3 * 24 * 60 * 60 * 1000 // 3 days
	private val KEY: Key = Keys.hmacShaKeyFor(SecretProperties.JWT_KEY.toByteArray())
	
	// While creating the token -
	// 1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
	// 2. Sign the JWT using the HS512 algorithm and secret key.
	// 3. According to JWS Compact Serialization (https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
	//    compaction of the JWT to a URL-safe string
	fun generateToken(subject: String, claims: Map<String, Any>): String {
		return Jwts
			.builder()
			.setClaims(claims)
			.setSubject(subject)
			.setIssuedAt(Date(System.currentTimeMillis()))
			.setExpiration(Date(System.currentTimeMillis() + VALIDITY))
			.signWith(KEY)
			.compact()
	}
	
	@Throws(JwtException::class)
	fun parseToken(jws: String): Claims {
		val claims = Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(jws).body
		if (claims.expiration.before(Date())) throw JwtException(jws)
		return Jwts.parserBuilder().setSigningKey(KEY).build().parseClaimsJws(jws).body
	}
}