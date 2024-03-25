package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.request.GroupDto;
import com.example.chatapp.dto.request.MemberDto;
import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.GroupResponse;
import com.example.chatapp.model.User;

public interface GroupService {
	
	String createGroup(GroupDto groupDto);
	
	List<GroupResponse> getGroups(int id);
	
	void deleteGroup(String id);
	
	List<String> addMember(String groupId,List<MemberDto> memberDtos, User admin);
	
	void removeMember(String groupId,String id,User admin);
	
	void leaveGroup(String id,String groupId);
	
	GroupResponse getGroup(String id);

}
