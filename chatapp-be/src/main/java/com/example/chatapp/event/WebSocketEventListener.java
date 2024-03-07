package com.example.chatapp.event;

import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.model.User;
import com.example.chatapp.service.PresentService;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

	private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);
	private final PresentService presentService;
	

//    private static int  a = 1;

	private final SimpMessageSendingOperations messagingTemplate;

	/**
	 * handle event connect to broker
	 * 
	 * @param event
	 */
	@EventListener
	public void handleWebSocketConnectListener(SessionConnectedEvent event) {

		logger.info("Received a new web socket connection {} ", event.getUser());

		try {
			int id = Integer.parseInt(event.getUser().getName());
			presentService.updateStatus(id, true);
			

		} catch (Exception ex) {
			logger.error("handle connect socket erorr {}", ex.getMessage());
		}

	}
	

	@EventListener
	public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
		logger.info("Received a  web socket disconnection {} ", event.getUser());
		
		

		try {
			int id = Integer.parseInt(event.getUser().getName());
			presentService.updateStatus(id, false);
			

		} catch (Exception ex) {
			logger.error("handle disconnectconnect socket erorr {}", ex.getMessage());
		}

	}
}