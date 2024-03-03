package com.example.chatapp.service;

import com.example.chatapp.dto.response.Notification;

public interface NotificationService {
	
	void pushNotification(Notification notification);

}
