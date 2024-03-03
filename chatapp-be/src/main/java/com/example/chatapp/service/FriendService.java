package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.response.FriendResponse;
import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.model.User;

public interface FriendService {
	
	
	List<UserResponse> getFriends(int id);
	
	List<FriendResponse> getFriendsRequest(int id);
	
	int sendRequest(User sender,int receiver);
	
	boolean checkFriend(int sender ,int receiver);
	
	void acceptRequest(int id);
	
	void rejectRequest(int id);
	
	

}
