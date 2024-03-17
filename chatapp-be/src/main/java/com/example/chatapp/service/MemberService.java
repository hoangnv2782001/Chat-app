package com.example.chatapp.service;

import java.util.List;

import com.example.chatapp.model.Member;

public interface MemberService {
	void addMember(Member member);
	
	void addMembers(List<Member> members);
	
	void removeMember(Member member);
	
	List<Member> getMembers(String id);

}
