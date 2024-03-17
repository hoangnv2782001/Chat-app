package com.example.chatapp.service;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.model.GroupMessage;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.PrivateMessage;

public interface LastMessageService {
	
	void updateLastMessage(PrivateMessage message);
	
	void updateLastMessageGroup(GroupMessage message);

}
