package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.MessagesConversation;
import com.example.chatapp.model.Message;

public interface MessageService {
	
	Message savePrivateMessage(MessageDto messageDto);
	
	Message saveGroupMessage(MessageDto messageDto);
	
	List<MessagesConversation>  getMessagesConversation(String id);
	
	List<MessagesConversation>  getMessagesGroup(String id);

}
