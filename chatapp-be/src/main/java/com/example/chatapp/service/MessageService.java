package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.MessagesConversation;
import com.example.chatapp.model.Message;

public interface MessageService {
	
	Message saveMessage(MessageDto messageDto);
	
	List<MessagesConversation>  getMessagesConversation(String id);

}
