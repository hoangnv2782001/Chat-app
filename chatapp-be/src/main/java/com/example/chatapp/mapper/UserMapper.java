package com.example.chatapp.mapper;

import org.springframework.stereotype.Component;

import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.model.User;

@Component
public class UserMapper {

	public UserResponse map(User t) {
		
		
		return UserResponse.builder().email(t.getEmail()).id(t.getId())
				.img(t.getAvatar())
				.name(t.getName())
				.createAt(t.getCreateAt())
				.online(t.isOnline()).build();
	}

}
