package com.example.chatapp.repository;

import com.example.chatapp.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {
	List<Conversation> findByMember1Id(int member1);

	@Query("SELECT c FROM Conversation c WHERE (c.member1.id = :member1 AND c.member2.id = :member2) OR (c.member1.id = :member2 AND c.member2.id = :member1)")
	Optional<Conversation> findConversation(int member1, int member2);

	@Query("SELECT c FROM Conversation c WHERE (c.member1.id = :id OR  c.member2.id = :id) ORDER BY c.lastMessage.message.createAt DESC")
	List<Conversation> findAllConversationById(int id);

}
