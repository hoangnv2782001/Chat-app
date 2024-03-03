package com.example.chatapp.service;

import com.example.chatapp.dto.response.UserResponse;

public interface PresentService {
	
	void updateStatus(int id ,boolean status);
	
	boolean checkOnline(int id);

}
