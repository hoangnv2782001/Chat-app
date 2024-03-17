package com.example.chatapp.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.model.Conversation;
import com.example.chatapp.model.Group;
import com.example.chatapp.model.GroupMessage;
import com.example.chatapp.model.LastMessage;
import com.example.chatapp.model.LastMessageGroup;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.PrivateMessage;
import com.example.chatapp.repository.LastMessageGroupRepository;
import com.example.chatapp.repository.LastMessageRepository;
import com.example.chatapp.websocket.controller.ChatController;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LastMessageServiceImpl implements LastMessageService {
	private final LastMessageRepository lastMessageRepository;
	private final LastMessageGroupRepository lastMessageGroupRepository;
	private static final Logger logger = LoggerFactory.getLogger(LastMessageServiceImpl.class);

	@Override
	public void updateLastMessage(PrivateMessage message) {
		// TODO Auto-generated method stub
		logger.info("update last message");

		lastMessageRepository.findByConversationId(message.getConversation().getId()).ifPresentOrElse(lastMessage -> {
			lastMessage.setMessage((PrivateMessage)message);
			lastMessageRepository.save(lastMessage);
		}, () -> {
			LastMessage lastMessage = LastMessage.builder()
					.message(PrivateMessage.builder().id(message.getId()).build()).seen(false)
					.conversation(Conversation.builder().id(message.getConversation().getId()).build()).build();

			lastMessageRepository.save(lastMessage);

		});
		;

	}

	@Override
	public void updateLastMessageGroup(GroupMessage message) {
		// TODO Auto-generated method stub
		logger.info("update last message group");

		lastMessageGroupRepository.findByGroupId(message.getGroup().getId()).ifPresentOrElse(lastMessage -> {
			lastMessage.setMessage((GroupMessage)message);
			lastMessageGroupRepository.save(lastMessage);
		}, () -> {
			LastMessageGroup lastMessage = LastMessageGroup.builder()
					.message(GroupMessage.builder().id(message.getId()).build()).seen(false)
					.group(Group.builder().id(message.getGroup().getId()).build()).build();

			lastMessageGroupRepository.save(lastMessage);

		});
		;
		
	}

}
