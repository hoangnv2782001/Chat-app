package com.example.chatapp.model;

import java.time.LocalDateTime;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.example.chatapp.common.MessageType;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "message")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper=true)
@EntityListeners(AuditingEntityListener.class)
public class PrivateMessage extends Message {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "receiver")
	private User receiver;
	
    @JoinColumn(name = "conversation_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Conversation conversation;

}
