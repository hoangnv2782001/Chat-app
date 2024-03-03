package com.example.chatapp.dto.response;

import java.time.LocalDateTime;

import com.example.chatapp.common.MessageType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessagesConversation {

	private String id;
	
    private String conversation;

    private int sender;

    private int receiver;

    private LocalDateTime time;

    private String content;

    private MessageType type;
}