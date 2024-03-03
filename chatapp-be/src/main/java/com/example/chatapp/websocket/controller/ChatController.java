package com.example.chatapp.websocket.controller;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.service.ChatService;
import com.example.chatapp.service.ConversationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
	private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
//    private final SimpMessageSendingOperations messagingTemplate;

	private final ChatService chatService;

	@MessageMapping("/message")
	public void handleMessage(@Payload MessageDto messageDto) {
		logger.info("message receiver {}",messageDto);

		logger.info("chat sender {}", messageDto.getTime());

		chatService.sendMessage(messageDto, "queue/message");

	}

	@MessageExceptionHandler
	public void handleException(Exception exception) {
		// ...
		logger.error("exception : {}",exception.getMessage());

	}
}
