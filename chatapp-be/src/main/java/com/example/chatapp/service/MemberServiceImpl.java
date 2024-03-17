package com.example.chatapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.chatapp.model.Member;
import com.example.chatapp.repository.LastMessageRepository;
import com.example.chatapp.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
	private final MemberRepository memberRepository;
	@Override
	public void addMember(Member member) {
		// TODO Auto-generated method stub
		
		memberRepository.save(member);
		
	}

	@Override
	public void addMembers(List<Member> members) {
		// TODO Auto-generated method stub
		memberRepository.saveAll(members);
		
	}

	@Override
	public void removeMember(Member member) {
		// TODO Auto-generated method stub
		
		memberRepository.delete(member);
		
	}

	@Override
	public List<Member> getMembers(String id) {
		// TODO Auto-generated method stub
		
		
		return memberRepository.findMemberByGroupId(id);
	}

}
