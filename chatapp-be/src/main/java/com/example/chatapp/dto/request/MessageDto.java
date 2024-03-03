package com.example.chatapp.dto.request;

import com.example.chatapp.common.MessageType;
import com.example.chatapp.dto.response.UserResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDto {

    private String conversation;

    private UserResponse sender;

    private int receiver;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime time;

    private String content;

    private MessageType type;
}
