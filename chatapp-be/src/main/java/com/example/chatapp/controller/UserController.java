package com.example.chatapp.controller;

import com.example.chatapp.exception.advice.ApiHandleException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.request.LoginDto;
import com.example.chatapp.dto.request.RegisterDto;

import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.model.User;
import com.example.chatapp.service.UserService;
import com.example.chatapp.utils.CookieUtils;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/v1/users")
@RequiredArgsConstructor
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private final UserService userService;

	@GetMapping
	public ResponseEntity<?> getAllUsers(@AuthenticationPrincipal User user) {

		
		return new ResponseEntity<>(userService.getAllUsers(user), HttpStatus.OK);
	}
	
	@PutMapping("/avatar")
	public ResponseEntity<?> updateUserAvatar(@AuthenticationPrincipal User user,@RequestParam("avatar") String avatar) {

		user.setAvatar(avatar);
		userService.updateUser(user);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/name")
	public ResponseEntity<?> updateUserName(@AuthenticationPrincipal User user,@RequestParam("name") String name) {

		user.setName(name);
		userService.updateUser(user);
		return ResponseEntity.ok().build();
	}

    

	@GetMapping("/")
	public ResponseEntity<?> getUserProfile(@AuthenticationPrincipal User user) {

		user.setOnline(true);
		UserResponse userResponse = userService.getUser(user);

//		HttpHeaders headers = CookieUtils.buildCookie(user.getId());

		return  ResponseEntity.ok().body(userResponse);
	}



}
