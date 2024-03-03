package com.example.chatapp.model;

import com.example.chatapp.common.FriendStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "friend")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friend {
	
	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	
    @ManyToOne
    @JoinColumn(name="sender")
    private User sender;

    @ManyToOne
    @JoinColumn(name="receiver")
    private User receiver;
    
    @Enumerated(EnumType.STRING)
    private FriendStatus status;

}
