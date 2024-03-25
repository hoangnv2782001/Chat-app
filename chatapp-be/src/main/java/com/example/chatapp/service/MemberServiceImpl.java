package com.example.chatapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.chatapp.exception.ResourceNotFoundException;
import com.example.chatapp.model.Member;

import com.example.chatapp.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;

	@Override
	public List<String> addMembers(List<Member> members) {
		// TODO Auto-generated method stub
		List<Member> memberList = memberRepository.saveAll(members);
		return memberList.stream().map(t -> t.getId()).collect(Collectors.toList());
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

	@Override
	public Member getMember(String id) {
		// TODO Auto-generated method stub
		return memberRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Member not found");
		});
	}

}
