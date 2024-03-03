package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.model.User;

public interface UserService {

	void updateUser(User user);
	
	UserResponse getUser(User u);
	
	User findUser(int id);
	
	List<UserResponse> getAllUsers(User user);


}
