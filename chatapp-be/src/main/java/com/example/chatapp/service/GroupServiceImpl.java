
package com.example.chatapp.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.chatapp.common.Action;
import com.example.chatapp.common.MessageType;
import com.example.chatapp.dto.request.GroupDto;
import com.example.chatapp.dto.request.MemberDto;
import com.example.chatapp.dto.request.MessageDto;
import com.example.chatapp.dto.response.GroupResponse;
import com.example.chatapp.dto.response.LastMessageResponse;
import com.example.chatapp.dto.response.MemberResponse;
import com.example.chatapp.dto.response.Notification;
import com.example.chatapp.exception.ResourceNotFoundException;
import com.example.chatapp.mapper.MessageFactory;
import com.example.chatapp.mapper.MessageMapper;
import com.example.chatapp.mapper.UserMapper;
import com.example.chatapp.model.Group;
import com.example.chatapp.model.Member;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.GroupRepository;
import com.example.chatapp.utils.DateUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

	private final GroupRepository groupRepository;

	private final MemberService memberService;

	private final NotificationService notificationService;

	private final ModelMapper modelMapper;

	private final MessageFactory messageFactory;

	private final ChatService chatService;

	private final UserMapper userMapper;
	private static final Logger logger = LoggerFactory.getLogger(GroupServiceImpl.class);

	@Transactional
	@Override
	public String createGroup(GroupDto groupDto) {
		// TODO Auto-generated method stub

		// save new group to db
		Group group = Group.builder().avatar(groupDto.getAvatar()).name(groupDto.getName()).build();

		final Group group2 = groupRepository.save(group);
		String groupId = group2.getId();
		List<Member> members = groupDto.getMembers().stream()
				.map(t -> Member.builder().group(group2).user(User.builder().id(t.getId()).build()).build())
				.collect(Collectors.toList());

		memberService.addMembers(members);

		// create groupresponse to push notification

		MemberResponse memberResponse = modelMapper.map(group2.getAdmin(), MemberResponse.class);

		LastMessageResponse lastMessageResponse = messageFactory.map(group2.getLastMessage());
		GroupResponse groupResponse = GroupResponse.builder().id(group2.getId()).name(group2.getName())
				.avatar(group2.getAvatar()).channel("/topic/" + group2.getId()).build();

		List<MemberResponse> memberResponses = members.stream().map(member -> {
			MemberResponse memberResponse2 = modelMapper.map(member.getUser(), MemberResponse.class);
			memberResponse2.setMemberId(member.getId());
			return memberResponse2;
		}).collect(Collectors.toList());
		groupResponse.setAdmin(memberResponse);
		groupResponse.setMembers(memberResponses);
		groupResponse.setLastMessage(lastMessageResponse);

		// push notification to member groups
		
				String name = group2.getAdmin().getName();
				MessageDto messageDto = MessageDto.builder().content(name +" created the group")
						.conversation(groupId).receiver(groupId).type(MessageType.NOTIFICATION).sender(userMapper.map(group2.getAdmin()))
						.time(DateUtils.convertToUtc(LocalDateTime.now())).build();
				// send message noti
				chatService.sendMessageToGroup(messageDto);
		// push notification
		logger.info("members {}", groupDto);
		for (MemberDto m : groupDto.getMembers()) {
			Notification notification = Notification.builder().receiver(m.getId()).action(Action.ADD_GROUP)
					.data(groupResponse).build();
			notificationService.pushNotification(notification);
		}
		
		
		return groupId;

	}

	@Override
	public void deleteGroup(String id) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<String> addMember(String groupId, List<MemberDto> memberDtos, User admin) {
		// TODO Auto-generated method stub

		List<Member> members = memberDtos.stream().map(t -> Member.builder().group(Group.builder().id(groupId).build())
				.user(User.builder().id(t.getId()).build()).build()).collect(Collectors.toList());

		// push notification to member groups
		MessageDto messageDto = MessageDto.builder().content(memberDtos.size() + " members were added to the group")
				.conversation(groupId).receiver(groupId).type(MessageType.NOTIFICATION).sender(userMapper.map(admin))
				.time(DateUtils.convertToUtc(LocalDateTime.now())).build();
		// send message noti
		chatService.sendMessageToGroup(messageDto);

		// push notification to members are added
		for (MemberDto m : memberDtos) {
			Notification notification = Notification.builder().receiver(m.getId()).action(Action.ADD_GROUP).build();
			notificationService.pushNotification(notification);
		}

		return memberService.addMembers(members);

	}

	@Override
	public void removeMember(String groupId, String id, User admin) {
		// TODO Auto-generated method stub
		Member member = memberService.getMember(id);

		Notification notification = Notification.builder().receiver(member.getUser().getId())
				.action(Action.REMOVE_GROUP).data(id).build();
		notificationService.pushNotification(notification);

		User user = member.getUser();
		MessageDto messageDto = MessageDto.builder().content(user.getName() + " was removed from the group")
				.conversation(groupId).receiver(groupId).type(MessageType.NOTIFICATION).sender(userMapper.map(admin))
				.time(DateUtils.convertToUtc(LocalDateTime.now())).build();
		// send message noti
		chatService.sendMessageToGroup(messageDto);

		memberService.removeMember(member);
	}

	@Override
	public void leaveGroup(String id, String groupid) {
		// TODO Auto-generated method stub
		Member member = memberService.getMember(id);

		User user = member.getUser();
		MessageDto messageDto = MessageDto.builder().content(user.getName() + " left the group").conversation(groupid)
				.receiver(groupid).type(MessageType.NOTIFICATION).sender(userMapper.map(user))
				.time(DateUtils.convertToUtc(LocalDateTime.now())).build();
		// send message noti
		chatService.sendMessageToGroup(messageDto);

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

	@Override
	public GroupResponse getGroup(String id) {
		// TODO Auto-generated method stub

		Group group = groupRepository.findById(id).orElseThrow(() -> {
			throw new ResourceNotFoundException("Group not found");
		});

		// group response

		MemberResponse memberResponse = modelMapper.map(group.getAdmin(), MemberResponse.class);

		LastMessageResponse lastMessageResponse = messageFactory.map(group.getLastMessage());
		GroupResponse groupResponse = GroupResponse.builder().id(group.getId()).name(group.getName())
				.avatar(group.getAvatar()).channel("/topic/" + group.getId()).build();

		List<MemberResponse> memberResponses = group.getMembers().stream().map(member -> {
			MemberResponse memberResponse2 = modelMapper.map(member.getUser(), MemberResponse.class);
			memberResponse2.setMemberId(member.getId());
			return memberResponse2;
		}).collect(Collectors.toList());
		groupResponse.setAdmin(memberResponse);
		groupResponse.setMembers(memberResponses);
		groupResponse.setLastMessage(lastMessageResponse);
		return groupResponse;
	}

}
