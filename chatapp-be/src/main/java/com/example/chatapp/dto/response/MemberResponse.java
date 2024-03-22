package com.example.chatapp.dto.response;

import java.time.LocalDateTime;

import com.example.chatapp.common.MessageType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponse {

	private int id;
	private String memberId;
	private String name;
	private String avatar;
}
