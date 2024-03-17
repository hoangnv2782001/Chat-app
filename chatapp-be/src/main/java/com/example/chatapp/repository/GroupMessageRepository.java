package com.example.chatapp.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import com.example.chatapp.model.GroupMessage;
import com.example.chatapp.model.Message;

@Repository
public interface GroupMessageRepository extends MessageBaseRepository<GroupMessage> {
	List<Message> findByGroupId(String id,Sort sort);

}
