package com.example.chatapp.config.websocket;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.example.chatapp.common.Constants;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

/**
 * Config stomp websocket 1. /portfolio is the HTTP URL for the endpoint to
 * which a WebSocket (or SockJS) client needs to connect for the WebSocket
 * handshake.
 * 
 * 2. STOMP messages whose destination header begins with /app are routed
 * to @MessageMapping methods in @Controller classes.
 * 
 * 3. Use the built-in message broker for subscriptions and broadcasting and
 * route messages whose destination header begins with /topic or /queue to the
 * broker.
 * 
 */
@Configuration
@EnableWebSocketMessageBroker

public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	private final DefaultHandshakeHandler handshakeHandler;

	private final ChannelInterceptor channelInterceptor;

	public WebSocketConfig(@Qualifier("httpHandshakeHandle") DefaultHandshakeHandler handshakeHandler,
			ChannelInterceptor channelInterceptor) {
		this.handshakeHandler = handshakeHandler;
		this.channelInterceptor = channelInterceptor;
	}

	private TaskScheduler messageBrokerTaskScheduler;

	@Autowired
	public void setMessageBrokerTaskScheduler(@Lazy TaskScheduler taskScheduler) {
		this.messageBrokerTaskScheduler = taskScheduler;
	}

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws").setAllowedOrigins("http://localhost:3000")

				.setHandshakeHandler(handshakeHandler)

		;
		registry.setPreserveReceiveOrder(true);
//				.withSockJS().setHeartbeatTime(Constants.HEARTBEAT);
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.setApplicationDestinationPrefixes("/app");
		config.enableSimpleBroker("/topic", "/queue").setHeartbeatValue(new long[] { Constants.HEARTBEAT, Constants.HEARTBEAT })
				.setTaskScheduler(messageBrokerTaskScheduler);

		config.setUserDestinationPrefix("/user");
	}
	
	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(channelInterceptor);
	}
}