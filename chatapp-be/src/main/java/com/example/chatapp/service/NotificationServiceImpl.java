package com.example.chatapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import com.example.chatapp.controller.GroupController;
import com.example.chatapp.dto.response.Notification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService{
	private final PresentService presentService;
	private final SimpMessageSendingOperations messagingTemplate;
	private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);
	@Override
	public void pushNotification(Notification notification) {
		// TODO Auto-generated method stub
		logger.info("push notification");
		if(presentService.checkOnline(notification.getReceiver())) {
			messagingTemplate.convertAndSendToUser(String.valueOf(notification.getReceiver()), "queue/notification", notification);
		}
		
	}

}
