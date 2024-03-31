package com.example.chatapp.config.websocket;

import java.security.Principal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.example.chatapp.event.UserReconnectEvent;
import com.example.chatapp.service.AuthServiceImpl;

import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class CustomChannelInterceptor  implements ChannelInterceptor {
	
	 private final ApplicationEventPublisher publisher;
	private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

	@Override
	public Message<?> preSend(Message<?> message, MessageChannel channel) {
		StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
		Principal principal = (Principal) accessor.getHeader("simpUser");
		String type = accessor.getHeader("simpMessageType").toString();
		
	    
		logger.info("message {} {}",type,principal.getName());
		
		if(type.equals("HEARTBEAT")) {
			publisher.publishEvent(new UserReconnectEvent(Integer.parseInt(principal.getName())));
		}
		// ...
		return message;
	}
}