package com.example.chatapp.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendResponse {
	
	private int id;
	
	private String img;
	
	private String name;

}
