package com.example.chatapp.config.security;

import java.io.IOException;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;
import org.springframework.web.servlet.HandlerExceptionResolver;

/**
 * 
 * OncePerRequestFilter: FilterChain
 */

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
	private final JwtTokenProvider jwtTokenProvider;

	private final UserDetailsService userDetailsService;

	@Autowired
	@Qualifier("handlerExceptionResolver")
	private HandlerExceptionResolver resolver;
 
	@Override
	/**
	 * 
	 */
	protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
			@NonNull FilterChain filterChain) throws ServletException, IOException {
		
		
		
	
		final String authHeader = request.getHeader("Authorization");
		final String jwt;
		final String username;
		
		
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			
			logger.info("no auth jwt {} , authheader :",request.getRequestURL(),authHeader);
//			logger.info("pricipal {}",SecurityContextHolder.getContext().getAuthentication().getPrincipal());
			filterChain.doFilter(request, response);
			return;
		}
		

		jwt = authHeader.substring(7);

		username = jwtTokenProvider.getUsername(jwt);
		
	
		
		logger.info("username : {} ", username);

		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			
		    try {

				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				
				logger.info("userdetail : {}",userDetails.getUsername());

					if (jwtTokenProvider.isTokenValid(jwt, userDetails)) {

						logger.info("token is valid");

						UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,
								null, userDetails.getAuthorities());

						authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
						SecurityContextHolder.getContext().setAuthentication(authToken);

					}
		    }catch(Exception e) {
		    	logger.info("exception  {}",e.getMessage());
		    }

		}

		filterChain.doFilter(request, response);
	}

}
