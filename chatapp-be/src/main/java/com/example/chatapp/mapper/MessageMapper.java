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
import com.example.chatapp.model.Group;
import com.example.chatapp.model.GroupMessage;
import com.example.chatapp.model.LastMessage;
import com.example.chatapp.model.LastMessageGroup;
import com.example.chatapp.model.Message;
import com.example.chatapp.model.PrivateMessage;
import com.example.chatapp.model.User;
import com.example.chatapp.service.ConversationServiceImpl;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class MessageMapper implements MessageFactory {

	private static final Logger logger = LoggerFactory.getLogger(MessageMapper.class);
	private final UserMapper userMapper;

	@Override
	public MessageResponse map(Message message, String type) {

		logger.info("log sender{}", message.getSender());
		if (type.equals("Private")) {
			PrivateMessage privateMessage = (PrivateMessage) message;
			return MessageResponse.builder().id(privateMessage.getId())
					.conversation(privateMessage.getConversation().getId())
					.sender(userMapper.map(privateMessage.getSender())).time(privateMessage.getCreateAt())
					.type(privateMessage.getType()).content(privateMessage.getContent()).build();

		}

		GroupMessage groupMessage = (GroupMessage) message;
		return MessageResponse.builder().id(groupMessage.getId()).conversation(groupMessage.getGroup().getId())
				.sender(userMapper.map(groupMessage.getSender())).time(groupMessage.getCreateAt())
				.type(groupMessage.getType()).content(groupMessage.getContent()).build();

	}

	@Override
	public MessagesConversation mapToMessagesConversation(Message message) {
		logger.info("log sender{}", message.getSender());

		return MessagesConversation.builder().id(message.getId()).sender(message.getSender().getId())
				.time(message.getCreateAt()).type(message.getType()).content(message.getContent()).build();

	}

	@Override
	public LastMessageResponse map(LastMessage message) {
		logger.info("last message group {}");
		return LastMessageResponse.builder().content(message.getMessage().getContent()).seen(message.isSeen())
				.type(message.getMessage().getType()).sender(message.getMessage().getSender().getId())
				.time(message.getMessage().getCreateAt()).build();
	}

	@Override
	public LastMessageResponse map(LastMessageGroup lasMessageGroup) {
			
//		
	try {
		return LastMessageResponse.builder().content(lasMessageGroup.getMessage().getContent()).seen(lasMessageGroup.isSeen())
				.type(lasMessageGroup.getMessage().getType()).sender(lasMessageGroup.getMessage().getSender().getId())
				.time(lasMessageGroup.getMessage().getCreateAt()).build();
	}catch (Exception e) {
		// TODO: handle exception
		logger.error("last message null");
		return null;
	}
		
	}

	@Override
	public Message mapToMessage(MessageDto messageDto, String type) {
		// TODO Auto-generated method stub

		if (type.equals("Private"))
			return PrivateMessage.builder()
					.conversation(Conversation.builder().id(messageDto.getConversation()).build())
					.sender(User.builder().id(messageDto.getSender().getId()).build())
					.receiver(User.builder().id((int) messageDto.getReceiver()).build()).createAt(messageDto.getTime())
					.type(messageDto.getType()).content(messageDto.getContent()).build();
		return GroupMessage.builder().group(Group.builder().id(messageDto.getConversation()).build())
				.sender(User.builder().id(messageDto.getSender().getId()).build()).createAt(messageDto.getTime())
				.type(messageDto.getType()).content(messageDto.getContent()).build();
	}

}
