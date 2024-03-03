package com.example.chatapp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.chatapp.dto.response.UserResponse;
import com.example.chatapp.mapper.UserMapper;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserSeiviceImpl implements UserService {
	

	
	private final UserRepository userRepository;
	private final UserMapper userMapper;
	private static final Logger logger = LoggerFactory.getLogger(UserSeiviceImpl.class);




	@Override
	public UserResponse getUser(User u) {
		logger.info("get user profile not cache {}",u);
		return userMapper.map(u);
	}

	@Override
	public List<UserResponse> getAllUsers(User user) {
		// TODO Auto-generated method stub
		List<User> users = userRepository.findByIdNotAndEnableTrue(user.getId());
		
		List<UserResponse> userResponses = users.stream().map(u -> UserResponse.builder().img(u.getAvatar()).id(u.getId()).email(u.getEmail()).online(u.isOnline()).name(u.getName()).build()).collect(Collectors.toList());
		return userResponses;
	}

	@Override
	public User findUser(int id) {
		// TODO Auto-generated method stub
		User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
		

		
		return user;
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		userRepository.save(user);
	}

}
