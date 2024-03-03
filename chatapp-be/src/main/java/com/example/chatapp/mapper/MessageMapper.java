package com.example.chatapp.mapper;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.example.chatapp.common.MessageType;
import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.LastMessageResponse;
import com.example.chatapp.dto.response.MessageResponse;
import com.example.chatapp.dto.response.MessagesConversation;
import com.example.chatapp.model.Conversation;
import com.example.chatapp.model.LastMessage;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.User;
import com.example.chatapp.service.ConversationServiceImpl;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MessageMapper {

	private static final Logger logger = LoggerFactory.getLogger(MessageMapper.class);
	private final UserMapper userMapper;

	public Message map(MessageDto messageDto) {

		return Message.builder().conversation(Conversation.builder().id(messageDto.getConversation()).build())
				.sender(User.builder().id(messageDto.getSender().getId()).build())
				.receiver(User.builder().id(messageDto.getReceiver()).build()).createAt(messageDto.getTime())
				.type(messageDto.getType()).content(messageDto.getContent()).build();

	}

	public MessageResponse map(Message message) {

		logger.info("log sender{}", message.getSender());

		return MessageResponse.builder().id(message.getId()).conversation(message.getConversation().getId())
				.sender(userMapper.map(message.getSender())).receiver(message.getReceiver().getId())
				.time(message.getCreateAt())

				.type(message.getType()).content(message.getContent()).build();

	}

	public MessagesConversation mapToMessagesConversation(Message message) {
		logger.info("log sender{}", message.getSender());

		return MessagesConversation.builder().id(message.getId()).conversation(message.getConversation().getId())
				.sender(message.getSender().getId()).time(message.getCreateAt())
				.receiver(message.getReceiver().getId())
				.type(message.getType()).content(message.getContent()).build();

	}

	public LastMessageResponse map(LastMessage message) {

		return LastMessageResponse.builder().content(message.getMessage().getContent()).seen(message.isSeen())
				.type(message.getMessage().getType()).sender(message.getMessage().getSender().getId())
				.receiver(message.getMessage().getReceiver().getId()).time(message.getMessage().getCreateAt()).build();
	}

}
