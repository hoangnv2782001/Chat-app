package com.example.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import com.example.chatapp.model.Message;

@NoRepositoryBean
public interface MessageBaseRepository<T extends Message> extends JpaRepository<T, String>{

}
