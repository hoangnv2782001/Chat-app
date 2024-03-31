package com.example.chatapp.service;

import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.model.User;

public interface PresentService {
	
	void updateStatus(int id ,boolean status);
	
	User updateStatusToDb(int id ,boolean status);
	
	boolean checkOnline(int id);

}
