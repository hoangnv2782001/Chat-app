package com.example.chatapp.service;

import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.example.chatapp.dto.response.Notification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	private final PresentService presentService;
	private final SimpMessageSendingOperations messagingTemplate;

	@Override
	public void pushNotification(Notification notification) {
		// TODO Auto-generated method stub
		
		if(presentService.checkOnline(notification.getReceiver())) {
			messagingTemplate.convertAndSendToUser(String.valueOf(notification.getReceiver()), "queue/conversation/delete", notification);
		}
		
	}

}
