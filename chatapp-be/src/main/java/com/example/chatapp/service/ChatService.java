package com.example.chatapp.service;

import com.example.chatapp.dto.request.MessageDto;

public interface ChatService {

    void sendMessage(MessageDto messageDto, String destination);
    
    void sendMessageToGroup(MessageDto messageDto);

}
