package com.example.chatapp.dto.response;

import com.example.chatapp.common.Action;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Notification {
	private int receiver;
	private Action action;
	private Object data;

}
