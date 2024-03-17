package com.example.chatapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chatapp.model.LastMessage;

@Repository
public interface LastMessageRepository extends JpaRepository<LastMessage, String>{
	
	Optional<LastMessage> findByConversationId(String id);

}
