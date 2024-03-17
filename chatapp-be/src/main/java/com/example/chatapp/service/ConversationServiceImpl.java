package com.example.chatapp.service;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.ConversationResponse;
import com.example.chatapp.dto.response.MessageResponse;
import com.example.chatapp.dto.response.Notification;
import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.exception.ResourceNotFoundException;
import com.example.chatapp.mapper.MessageFactory;
import com.example.chatapp.mapper.MessageMapper;
import com.example.chatapp.mapper.UserMapper;
import com.example.chatapp.model.Conversation;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.ConversationRepository;
import com.example.chatapp.service.ConversationService;
import com.example.chatapp.websocket.controller.ChatController;

import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConversationServiceImpl implements ConversationService {

	private static final Logger logger = LoggerFactory.getLogger(ConversationServiceImpl.class);
	private final ConversationRepository conversationRepository;
	private final MessageFactory messageFactory;
	private final UserMapper userMapper;
	private final UserService userService;
	private final FriendService friendService;
    private final NotificationService notificationService;
    
	@Override
	public String startConversation(User sender, int receiver) {

		User u = userService.findUser(receiver);

		Optional<Conversation> conOptional = conversationRepository.findConversation(sender.getId(), receiver);

		if (conOptional.isPresent())
			return conOptional.get().getId();

		return null;

	}

	@Override
	public List<ConversationResponse> getConversations(User user) throws Exception {
		List<Conversation> conversations = conversationRepository.findAllConversationById(user.getId());

		List<ConversationResponse> conversationResponses = conversations.stream()
				.map(t -> ConversationResponse.builder().id(t.getId())
						.lastMessage(messageFactory.map(t.getLastMessage()))
						.user(userMapper.map(t.getMember1().getId() == user.getId() ? t.getMember2() : t.getMember1()))
						.build())
				.collect(Collectors.toList());

//		logger.info("date time {}",conversationResponses.get(0).getLastMessage().getTime());
		return conversationResponses;

	}

	@Override
	public String createConversation(User sender, int receiver) {

		User u = userService.findUser(receiver);

		if(friendService.checkFriend(sender.getId(), receiver)) {
			Conversation conversation = Conversation.builder().member1(sender).member2(u).build();
			String id = conversationRepository.save(conversation).getId();
			logger.info("create conversation {}", id);
			return id;
		}
		throw new ResourceNotFoundException("Can not create conversations");
	}

	@Override
	public void deleteConversation(int sender,String id) {
		// TODO Auto-generated method stub
		Conversation conversation = conversationRepository.findById(id).orElseThrow(()->{
			throw new ResourceNotFoundException("Conversation not exits");
		});
		
		int receiver = conversation.getMember1().getId() == sender ? conversation.getMember2().getId() : conversation.getMember1().getId();
		conversationRepository.delete(conversation);
		
		
		notificationService.pushNotification(Notification.builder().data(id).receiver(receiver).build());
	}
	

}
