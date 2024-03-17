package com.example.chatapp.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "group_chat")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@CreatedDate
	@Column(name = "create_at")
	private LocalDateTime createAt;

	private String avatar;

	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@CreatedBy
	private User admin;
	
	@OneToMany(mappedBy = "group",fetch = FetchType.LAZY)
	private List<Member> members;

	@OneToOne(mappedBy = "group",fetch = FetchType.EAGER)
    private LastMessageGroup lastMessage;
}
