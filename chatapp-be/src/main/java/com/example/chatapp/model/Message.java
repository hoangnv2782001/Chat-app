package com.example.chatapp.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.example.chatapp.common.MessageType;

import java.time.LocalDateTime;

//@Entity
//@Table(name = "message")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
//    @CreatedDate
    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createAt;
    
    @Enumerated(EnumType.STRING)
    private MessageType type;
    
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="sender")
    private User sender;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="receiver")
//    private User receiver;

    
}
