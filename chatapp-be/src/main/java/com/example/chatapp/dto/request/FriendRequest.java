package com.example.chatapp.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FriendRequest {
	@NotBlank(message = "All fields are required")
	private int senderId;
	
	@NotBlank(message = "All fields are required")
	private int receiverId;

}
