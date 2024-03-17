package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.request.GroupDto;
import com.example.chatapp.dto.response.GroupResponse;

public interface GroupService {
	
	String createGroup(GroupDto groupDto);
	
	List<GroupResponse> getGroups(int id);
	
	void deleteGroup(String id);
	
	void addMember(int id);
	
	void removeMember(int id);

}
