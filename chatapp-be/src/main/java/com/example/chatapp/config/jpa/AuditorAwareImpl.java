package com.example.chatapp.config.jpa;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.example.chatapp.model.User;
import com.example.chatapp.service.AuthServiceImpl;

public class AuditorAwareImpl implements AuditorAware<User> {
	private static final Logger logger = LoggerFactory.getLogger(AuditorAwareImpl.class);

	/**
	 * 
	 */
	public Optional<User> getCurrentAuditor() {

		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			if (authentication == null || !authentication.isAuthenticated()) {
				return null;
			}
			logger.info("auddit {}", authentication.getPrincipal().toString());
			return Optional.of((User) authentication.getPrincipal());
		} catch (Exception ex) {
			return null;
		}
	}
}
