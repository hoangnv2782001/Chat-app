
package com.example.chatapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.chatapp.dto.request.GroupDto;
import com.example.chatapp.dto.request.MemberDto;
import com.example.chatapp.dto.response.GroupResponse;
import com.example.chatapp.dto.response.LastMessageResponse;
import com.example.chatapp.dto.response.MemberResponse;
import com.example.chatapp.mapper.MessageFactory;
import com.example.chatapp.mapper.MessageMapper;
import com.example.chatapp.model.Group;
import com.example.chatapp.model.Member;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.GroupRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

	private final GroupRepository groupRepository;

	private final MemberService memberService;

	private final UserService userService;

	private final ModelMapper modelMapper;

	private final MessageFactory messageFactory;

	private static final Logger logger = LoggerFactory.getLogger(GroupServiceImpl.class);

	@Transactional
	@Override
	public String createGroup(GroupDto groupDto) {
		// TODO Auto-generated method stub

		Group group = Group.builder().avatar(groupDto.getAvatar()).name(groupDto.getName()).build();

		final Group group2 = groupRepository.save(group);
		List<Member> members = groupDto.getMembers().stream()
				.map(t -> Member.builder().group(group2).user(User.builder().id(t.getId()).build()).build())
				.collect(Collectors.toList());

		memberService.addMembers(members);
		return group2.getId();

	}

	@Override
	public void deleteGroup(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addMember(String groupId, List<MemberDto> memberDtos) {
		// TODO Auto-generated method stub

		List<Member> members = memberDtos.stream().map(t -> Member.builder().group(Group.builder().id(groupId).build())
				.user(User.builder().id(t.getId()).build()).build()).collect(Collectors.toList());
		memberService.addMembers(members);

	}

	@Override
	public void removeMember(String id) {
		// TODO Auto-generated method stub
		Member member = Member.builder().id(id).build();

		memberService.removeMember(member);
	}

	@Override
	public List<GroupResponse> getGroups(int id) {
		// TODO Auto-generated method stub

		List<Group> groups = groupRepository.getGroupsByMember(id);

		List<GroupResponse> groupResponses = groups.stream().map(t -> {
			MemberResponse memberResponse = modelMapper.map(t.getAdmin(), MemberResponse.class);

			LastMessageResponse lastMessageResponse = messageFactory.map(t.getLastMessage());
			GroupResponse groupResponse = GroupResponse.builder().id(t.getId()).name(t.getName()).avatar(t.getAvatar())
					.channel("/topic/" + t.getId()).build();

			List<Member> members = t.getMembers();

			List<MemberResponse> memberResponses = members.stream().map(member -> {
				MemberResponse memberResponse2 = modelMapper.map(member.getUser(), MemberResponse.class);
				memberResponse2.setMemberId(member.getId());
				return memberResponse2;
			}).collect(Collectors.toList());
			groupResponse.setAdmin(memberResponse);
			groupResponse.setMembers(memberResponses);

			groupResponse.setLastMessage(lastMessageResponse);
			return groupResponse;
		}).collect(Collectors.toList());

		return groupResponses;
	}

}
