package com.example.chatapp.dto.request;

import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GroupDto {
  
	private String name;
	private String avatar;
	
	Set<MemberDto> members;
}
