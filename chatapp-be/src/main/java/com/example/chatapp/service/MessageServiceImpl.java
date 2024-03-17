package com.example.chatapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.chatapp.config.security.JwtAuthenticationFilter;
import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.MessagesConversation;
import com.example.chatapp.mapper.MessageFactory;
import com.example.chatapp.mapper.MessageMapper;
import com.example.chatapp.model.GroupMessage;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.PrivateMessage;
import com.example.chatapp.repository.GroupMessageRepository;
import com.example.chatapp.repository.MessageRepository;
import com.example.chatapp.repository.PrivateMessagerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
	private final PrivateMessagerRepository privateMessagerRepository;

	private final GroupMessageRepository groupMessageRepository;
	private final MessageFactory messageFactory;
	private final ConversationService conversationService;
	private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);

	@Override
	public Message savePrivateMessage(MessageDto messageDto) {
		// TODO Auto-generated method stub

		logger.info("save message {}", messageDto.getType());

		Message message = messageFactory.mapToMessage(messageDto, "Private");
		message = privateMessagerRepository.save((PrivateMessage) message);

		return message;
	}

	@Override
	public List<MessagesConversation> getMessagesConversation(String id) {
		// TODO Auto-generated method stub

		List<Message> messages = privateMessagerRepository.findByConversationId(id, Sort.by("createAt").ascending());

		List<MessagesConversation> messagesConversation = messages.stream()
				.map(t -> messageFactory.mapToMessagesConversation(t)).collect(Collectors.toList());
		return messagesConversation;
	}

	@Override
	public Message saveGroupMessage(MessageDto messageDto) {
		// TODO Auto-generated method stub
		logger.info("save message {}", messageDto.getType());

		Message message = messageFactory.mapToMessage(messageDto, "Group");
		message = groupMessageRepository.save((GroupMessage) message);

		return message;

	}

	@Override
	public List<MessagesConversation> getMessagesGroup(String id) {
		// TODO Auto-generated method stub
		List<Message> messages = groupMessageRepository.findByGroupId(id, Sort.by("createAt").ascending());

		List<MessagesConversation> messagesConversation = messages.stream()
				.map(t -> messageFactory.mapToMessagesConversation(t)).collect(Collectors.toList());
		return messagesConversation;

	}

}
