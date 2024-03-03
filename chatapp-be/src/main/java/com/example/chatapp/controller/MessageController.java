package com.example.chatapp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.service.ConversationService;
import com.example.chatapp.service.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/messages")
public class MessageController {
	
	private final MessageService messageService;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getMessagesConversation(@PathVariable("id") String id){
		
		return ResponseEntity.ok(messageService.getMessagesConversation(id));
		
	}

}
