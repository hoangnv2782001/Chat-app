package com.example.chatapp.service;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.chatapp.common.Constants;
import com.example.chatapp.dto.response.FriendResponse;
import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.event.WebSocketEventListener;
import com.example.chatapp.mapper.UserMapper;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PresentServiceImpl implements PresentService {
	private final UserRepository userRepository;
	private final FriendService friendService;
	private final SimpMessageSendingOperations messagingTemplate;
	private final UserMapper userMapper;
	private static final Logger logger = LoggerFactory.getLogger(PresentService.class);
	private final RedisTemplate<Object, Object> redisTemplate;

	@Override
	public void updateStatus(int id, boolean status) {
		// TODO Auto-generated method stub
		User u = updateStatusToDb(id, status);
		redisTemplate.opsForValue().set(u.getId(), userMapper.map(u),Constants.HEARTBEAT + 10000,TimeUnit.MILLISECONDS);
		

	}

	@Override
	public boolean checkOnline(int id) {
		try {
			
			return redisTemplate.hasKey(id);
		} catch (Exception e) {
			logger.error("check redis error", e);
		}
		return false;
	}

	@Override
	public User updateStatusToDb(int id, boolean status) {
		// TODO Auto-generated method stub
		User u = userRepository.findById(id).orElseThrow(() -> {
			throw new UsernameNotFoundException("User not found");
		});
		u.setOnline(status);
		return userRepository.save(u);
		
	}

}
