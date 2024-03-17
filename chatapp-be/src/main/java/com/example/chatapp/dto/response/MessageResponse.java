package com.example.chatapp.dto.response;

import java.time.LocalDateTime;

import com.example.chatapp.common.MessageType;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageResponse {

	private String id;
	
    private String conversation;

    private UserResponse sender;
    
    private LocalDateTime time;

    private String content;

    private MessageType type;
}
