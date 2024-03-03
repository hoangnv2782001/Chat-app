package com.example.chatapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.config.security.JwtAuthenticationFilter;
import com.example.chatapp.model.User;
import com.example.chatapp.service.ConversationService;
import com.example.chatapp.service.FriendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/friends")
public class FriendController {
	private final FriendService friendService;
	private static final Logger logger = LoggerFactory.getLogger(FriendController.class);
	
	@PostMapping("/{id}")
	public ResponseEntity<?> sendRequest(@AuthenticationPrincipal User user,@PathVariable("id") int id){
		logger.info("send request add friend");
		
		return ResponseEntity.ok(friendService.sendRequest(user, id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> rejectRequest(@PathVariable("id") int id){
		friendService.rejectRequest(id);
		return ResponseEntity.ok().build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> acceptRequest(@PathVariable("id") int id){
		friendService.acceptRequest(id);
		return ResponseEntity.ok().build();
	}
	
	@GetMapping
	public ResponseEntity<?> getFriends(@AuthenticationPrincipal User user){
		
		return ResponseEntity.ok(friendService.getFriends(user.getId()));
	} 
	
	
	@GetMapping("/request")
	public ResponseEntity<?> getFriendsRequest(@AuthenticationPrincipal User user){
		logger.info("get request friend");
		return ResponseEntity.ok(friendService.getFriendsRequest(user.getId()));
	} 
	

}
