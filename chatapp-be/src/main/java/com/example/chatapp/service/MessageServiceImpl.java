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
import com.example.chatapp.mapper.MessageMapper;
import com.example.chatapp.model.Message;
import com.example.chatapp.repository.MessageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {
	private final MessageRepository messageRepository;
	private final MessageMapper messageMapper;
	private final ConversationService conversationService;
	private static final Logger logger = LoggerFactory.getLogger(MessageServiceImpl.class);

	@Override
	public Message saveMessage(MessageDto messageDto) {
		// TODO Auto-generated method stub
		
		logger.info("save message {}",messageDto.getType());

		Message message = messageMapper.map(messageDto);
		message = messageRepository.save(message);
		
		return message;
	}

	@Override
	public List<MessagesConversation> getMessagesConversation(String id) {
		// TODO Auto-generated method stub
		
//		Pageable page = PageRequest.
		
		List<Message> messages = messageRepository.findByConversationId(id,Sort.by("createAt").ascending());
		
		List<MessagesConversation> messagesConversation = messages.stream().
				map(t -> messageMapper.mapToMessagesConversation(t))
				.collect(Collectors.toList());
		return messagesConversation;
	}

}
