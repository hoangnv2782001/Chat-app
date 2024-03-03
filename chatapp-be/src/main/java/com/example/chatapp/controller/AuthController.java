package com.example.chatapp.controller;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.config.security.JwtAuthenticationFilter;
import com.example.chatapp.config.security.JwtTokenProvider;
import com.example.chatapp.dto.request.LoginDto;
import com.example.chatapp.dto.request.PasswordDto;
import com.example.chatapp.dto.request.RegisterDto;
import com.example.chatapp.dto.request.VerificationInfo;
import com.example.chatapp.dto.response.AuthResponse;
import com.example.chatapp.dto.response.ObjectResponse;
import com.example.chatapp.model.User;
import com.example.chatapp.service.AuthService;
import com.example.chatapp.utils.CookieUtils;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/auth")

public class AuthController {

	private final AuthService authService;

	private static final Logger logger = LoggerFactory.getLogger(FriendController.class);

	/**
	 * Controller receive request login and response token jwt
	 * 
	 * @param loginDto user login info
	 * @return authResponse
	 */
	@PostMapping(value = "/login")
	public ResponseEntity<?> login(@RequestBody @Valid LoginDto loginDto) {

		logger.info("user login :{}", loginDto.getEmail());

		AuthResponse authResponse = authService.authenticate(loginDto);
		HttpHeaders headers = CookieUtils.buildCookie(authResponse.getId());

//
		return ResponseEntity.ok().headers(headers).body(authResponse);
	}

	/**
	 * controller verify accout
	 * 
	 * @param registerDto
	 * @return
	 */
	@PostMapping(value = "/register")
	public ResponseEntity<?> register(@RequestBody @Valid RegisterDto registerDto) {

		logger.info("Email register : {} ", registerDto.getEmail());

		ObjectResponse message = authService.register(registerDto);

		return new ResponseEntity<>(message, HttpStatus.CREATED);
	}

	/**
	 * controller verify accout
	 * 
	 * @param registerDto
	 * @return
	 */
	@PostMapping(value = "/register/verification")
	public ResponseEntity<?> verifyAccout(@RequestBody @Valid VerificationInfo veInfo) {

		logger.info("Email verify : {} ", veInfo.getEmail());

		AuthResponse authResponse = authService.verifyOTP(veInfo);

		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

	/**
	 * controller handle forgot pass
	 * 
	 * @param registerDto
	 * @return
	 */
	@PostMapping(value = "/password/forgot")
	public ResponseEntity<?> forgotPassword(
			@RequestParam("email") @NotBlank(message = "Email is required") @Email(message = "Email is invalid") String email) {

		logger.info("forgot password : {} ", email);
		ObjectResponse message = authService.forgotPassword(email);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	/**
	 * controller handle reset pass
	 * 
	 * @param registerDto
	 * @return
	 */

	@PostMapping(value = "/password/reset")
	public ResponseEntity<?> resetPassword(@RequestBody @Valid PasswordDto passwordDto) {

		AuthResponse authResponse = authService.resetPassword(passwordDto);
		return new ResponseEntity<>(authResponse, HttpStatus.OK);
	}

}
