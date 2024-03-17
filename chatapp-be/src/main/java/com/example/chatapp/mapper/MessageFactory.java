package com.example.chatapp.mapper;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.LastMessageResponse;
import com.example.chatapp.dto.response.MessageResponse;
import com.example.chatapp.dto.response.MessagesConversation;
import com.example.chatapp.model.LastMessage;
import com.example.chatapp.model.LastMessageGroup;
import com.example.chatapp.model.Message;

public interface MessageFactory {

	Message mapToMessage(MessageDto messageDto, String type);

	MessagesConversation mapToMessagesConversation(Message message);

	MessageResponse map(Message message,String type);

	LastMessageResponse map(LastMessage message);
	
	LastMessageResponse map(LastMessageGroup message);
}
