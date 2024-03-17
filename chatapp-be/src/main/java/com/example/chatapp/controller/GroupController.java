package com.example.chatapp.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.chatapp.dto.request.GroupDto;
import com.example.chatapp.model.User;
import com.example.chatapp.service.FriendService;
import com.example.chatapp.service.GroupService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/group")
public class GroupController {

	private final GroupService groupService;
	private static final Logger logger = LoggerFactory.getLogger(GroupController.class);

	@PostMapping
	public ResponseEntity<?> creatGroup(@RequestBody GroupDto groupDto) {

		logger.info("create group {}",groupDto);
		return ResponseEntity.ok(groupService.createGroup(groupDto));
	}
	
	@GetMapping
	public ResponseEntity<?> getGroups(@AuthenticationPrincipal User  user) {

		logger.info("get groups {}",user.getName());
		return ResponseEntity.ok(groupService.getGroups(user.getId()));
	}

}
