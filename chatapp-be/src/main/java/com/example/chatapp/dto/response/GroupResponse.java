package com.example.chatapp.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupResponse {
	private String id;
	private String name;
	private String avatar;
	private MemberResponse admin;
	private String channel;
	private List<MemberResponse> members;

	private LastMessageResponse lastMessage;
}
