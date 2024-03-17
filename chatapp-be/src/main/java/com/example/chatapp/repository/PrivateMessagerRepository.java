package com.example.chatapp.repository;

import java.util.List;

import org.springframework.data.domain.Sort;

import com.example.chatapp.model.Message;
import com.example.chatapp.model.PrivateMessage;

public interface PrivateMessagerRepository extends MessageBaseRepository<PrivateMessage>{

	List<Message> findByConversationId(String id,Sort sort);
}
