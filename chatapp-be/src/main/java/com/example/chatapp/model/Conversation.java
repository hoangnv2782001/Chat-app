package com.example.chatapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;

@Entity
@Table(name = "conversation")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class  Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @JoinColumn(name = "member1")
    @ManyToOne
    private User member1;


    @JoinColumn(name = "member2")
    @ManyToOne
    private User member2;
    
    @OneToOne(mappedBy = "conversation")
    private LastMessage lastMessage;


}
