package com.example.chatapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationResponse {
	private String id;

	private UserResponse user;

	private LastMessageResponse lastMessage;

}
