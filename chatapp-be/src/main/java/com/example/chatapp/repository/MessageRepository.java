package com.example.chatapp.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chatapp.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, String>{
	
	List<Message> findByConversationId(String id,Sort sort);

}
