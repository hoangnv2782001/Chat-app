package com.example.chatapp.config.security;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtTokenProvider {

	@Value("${jwt.secret_key}")
	private String secret;

	@Value("${jwt.expiration}")
	private int expiration;
	
	private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

	/**
	 * get username
	 * 
	 * @param token
	 * @return
	 */

	public String getUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	/**
	 * 
	 * @param <T>
	 * @param token
	 * @param resolver
	 * @return
	 */

	public <T> T extractClaim(String token, Function<Claims, T> resolver) throws JwtException {
		final Claims claims = extractAllClaims(token);
		return resolver.apply(claims);

	}

	/**
	 * Extract all claims
	 * 
	 * @param token
	 * @return Claims
	 */

	private Claims extractAllClaims(String token) throws JwtException{
			return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();

	}

	/**
	 * genarate token withs no claims
	 * 
	 * @param userDetails
	 * @return token
	 */
	public String genarateToken(UserDetails userDetails) {
		return genarateToken(new HashMap<>(), userDetails);
	}

	/**
	 * Genrate token
	 * 
	 * @param extractClaims
	 * @param userDetails
	 * @return token
	 */

	public String genarateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
		return Jwts.builder().setClaims(extractClaims).setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000L * expiration))
				.signWith(getSignInKey(), SignatureAlgorithm.HS256).compact();

	}

	/**
	 * Check token valid
	 * 
	 * @param token
	 * @param userDetails
	 * @return
	 */

	public boolean isTokenValid(String token, UserDetails userDetails) {
		try{
			final String username = getUsername(token);
			logger.info("inf : {} {}", userDetails.getUsername().equals(username), isTokenExpired(token));
			return userDetails.getUsername().equals(username) && isTokenExpired(token);
		}catch  (Exception e){
			return false;
		}
	}

	/**
	 * check token expired
	 * 
	 * @param token
	 * @return
	 */
	private boolean isTokenExpired(String token) throws JwtException{
		logger.info("experid date : {} , now : {}",extractExpiration(token),new Date());
		return extractExpiration(token).after(new Date());
	}

	/**
	 * Extract expiration
	 * 
	 * @param token
	 * @return
	 */
	private Date extractExpiration(String token) throws JwtException {
		return extractClaim(token, Claims::getExpiration);
	}

	/**
	 * Use BASE64 and hmacShaKeyFor to encrypt secret key
	 * 
	 * @return Key
	 */
	private Key getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);

		return Keys.hmacShaKeyFor(keyBytes);
	}
}
