package com.example.chatapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.MessageResponse;
import com.example.chatapp.mapper.MessageMapper;
import com.example.chatapp.model.Message;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {
	private final SimpMessageSendingOperations messagingTemplate;

	private final ConversationService conversationService;

	private final MessageService messageService;
	private final MessageMapper messageMapper;

	private final LastMessageService lastMessageService;

	private final PresentService presentService;
	private static final Logger logger = LoggerFactory.getLogger(ChatServiceImpl.class); 

	@Override
	public void sendMessage(MessageDto messageDto, String destination) {
		// TODO Auto-generated method stub

		Message message = messageService.saveMessage(messageDto);

		MessageResponse messageResponse = messageMapper.map(message);

		messageResponse.setSender(messageDto.getSender());
		lastMessageService.updateLastMessage(message);

		if (presentService.checkOnline(messageDto.getReceiver()))
		{
			logger.info("send message is success");
			messagingTemplate.convertAndSendToUser(String.valueOf(messageDto.getReceiver()), destination,
					messageResponse);

		}
	}

}
