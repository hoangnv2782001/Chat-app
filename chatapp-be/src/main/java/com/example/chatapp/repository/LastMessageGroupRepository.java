package com.example.chatapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.chatapp.model.LastMessage;
import com.example.chatapp.model.LastMessageGroup;

@Repository
public interface LastMessageGroupRepository extends JpaRepository<LastMessageGroup, String>{
	Optional<LastMessageGroup> findByGroupId(String id);
}
