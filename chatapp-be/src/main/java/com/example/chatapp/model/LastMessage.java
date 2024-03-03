package com.example.chatapp.model;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.example.chatapp.common.MessageType;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "last_message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LastMessage {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@OneToOne
	@JoinColumn(name = "conversation_id")
	private Conversation conversation;
	
	@OneToOne
	@JoinColumn(name="message_id")
	private Message message;
	
	private boolean seen;

}
