package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.ConversationResponse;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.User;

public interface ConversationService {

	String startConversation(User sender, int receiver);

	String createConversation(User sender, int receiver);
	
	void deleteConversation(int sender,String id);

	List<ConversationResponse> getConversations(User user) throws Exception;

}
