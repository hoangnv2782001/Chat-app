package com.example.chatapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "last_message_group")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LastMessageGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@OneToOne
	@JoinColumn(name = "group_id")
	private Group group;
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="message_id")
	private GroupMessage message;
	
	private boolean seen;
}
