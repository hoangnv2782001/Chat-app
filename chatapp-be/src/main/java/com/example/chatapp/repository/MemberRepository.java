package com.example.chatapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.chatapp.model.Member;

public interface MemberRepository extends JpaRepository<Member, String> {
	
	List<Member> findMemberByGroupId(String id); 

}
