package com.example.chatapp.controller;

import com.example.chatapp.config.security.JwtAuthenticationFilter;
import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.model.User;
import com.example.chatapp.service.ConversationService;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/conversations")
public class ConversationController {

	private final ConversationService conversationService;
	private static final Logger logger = LoggerFactory.getLogger(ConversationController.class);

	@GetMapping
	public ResponseEntity<?> getConversations(@AuthenticationPrincipal User user) throws Exception {
		logger.info("request get conversations");

		return ResponseEntity.ok(conversationService.getConversations(user));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> startConversations(@AuthenticationPrincipal User user, @PathVariable("id") int id) {

		logger.info("request start conversation");
		String conversationId = conversationService.startConversation(user, id);
		if (conversationId != null)
			return ResponseEntity.ok(conversationId);
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/{id}")
	public ResponseEntity<?> createConversations(@AuthenticationPrincipal User user, @PathVariable("id") int id) {

		logger.info("request create conversation");
		String conversationId = conversationService.createConversation(user, id);

		return ResponseEntity.ok(conversationId);

	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteConversations(@AuthenticationPrincipal User user,@PathVariable("id") String id) {

		logger.info("request delete conversation");
	    conversationService.deleteConversation(user.getId(), id);

		return ResponseEntity.ok().build();

	}
}
