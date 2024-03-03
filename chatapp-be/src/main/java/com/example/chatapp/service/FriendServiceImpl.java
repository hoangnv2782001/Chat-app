package com.example.chatapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.chatapp.common.FriendStatus;
import com.example.chatapp.controller.FriendController;
import com.example.chatapp.dto.response.FriendResponse;
import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.exception.ResourceNotFoundException;
import com.example.chatapp.mapper.UserMapper;
import com.example.chatapp.model.Friend;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.FriendRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

	private final FriendRepository friendRepository;

	private final UserService userService;

	private final UserMapper userMapper;
	private static final Logger logger = LoggerFactory.getLogger(FriendServiceImpl.class);

	@Override
	public int sendRequest(User sender, int receiver) {
		// TODO Auto-generated method stub

		User u = userService.findUser(receiver);

		Friend friend = Friend.builder().sender(sender).receiver(u).status(FriendStatus.PENDING).build();

		return friendRepository.save(friend).getId();

	}

	@Override
	public void acceptRequest(int id) {
		// TODO Auto-generated method stub
		friendRepository.findById(id).ifPresentOrElse(friend -> {
			friend.setStatus(FriendStatus.ACCEPTED);

			friendRepository.save(friend);
		}, () -> {
			throw new ResourceNotFoundException("Friend request not found!");
		});

	}

	@Override
	public void rejectRequest(int id) {
		// TODO Auto-generated method stub

		friendRepository.findById(id).ifPresentOrElse(friend -> {

			friendRepository.delete(friend);
		}, () -> {
			throw new ResourceNotFoundException("Friend request not found!");
		});

	}

	@Override
	public List<UserResponse> getFriends(int id) {
		// TODO Auto-generated method stub

		List<Friend> friends = friendRepository.findFriendsById(id);

		List<UserResponse> userResponses = friends.stream()
				.map(t -> userMapper.map(t.getSender().getId() == id ? t.getReceiver() : t.getSender()))
				.collect(Collectors.toList());
		return userResponses;
	}

	@Override
	public boolean checkFriend(int sender, int receiver) {
		// TODO Auto-generated method stub

		Optional<Friend> friend = friendRepository.findFriend(sender, receiver);

		if (friend.isPresent())
			return true;
		return false;
	}

	@Override
	public List<FriendResponse> getFriendsRequest(int id) {
		List<Friend> friends = friendRepository.findFriendsRequest(id);

		logger.info("friend request {} {}",friends,id);
		List<FriendResponse> friendResponses = friends.stream()
				.map(t -> FriendResponse.builder().id(t.getId()).img(t.getSender().getAvatar())
						.name(t.getSender().getName()).build())
				.collect(Collectors.toList());
		return friendResponses;
	}

}
