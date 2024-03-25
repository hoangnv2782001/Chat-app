package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.dto.request.MemberDto;
import com.example.chatapp.model.Member;

public interface MemberService {
	
	List<String> addMembers(List<Member> members);
	
	void removeMember(Member member);
	
	List<Member> getMembers(String id);
	
	Member getMember(String id);

}
