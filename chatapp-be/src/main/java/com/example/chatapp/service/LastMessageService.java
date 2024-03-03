package com.example.chatapp.service;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.model.Message;

public interface LastMessageService {
	
	void updateLastMessage(Message message);

}
