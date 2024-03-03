package com.example.chatapp.dto.response;

import java.io.Serializable;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse implements Serializable{
	private int id;
	private String name;
	private String img;
	private String email;
	private boolean online;
	private LocalDateTime createAt;

}
