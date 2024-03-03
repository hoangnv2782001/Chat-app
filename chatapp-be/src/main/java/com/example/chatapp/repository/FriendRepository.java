package com.example.chatapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.chatapp.model.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

	@Query("SELECT c FROM Friend c WHERE (c.sender.id = :id OR  c.receiver.id = :id) AND c.status = 'ACCEPTED'")
	List<Friend> findFriendsById(int id);
	

	@Query("SELECT c FROM Friend c WHERE c.receiver.id = :id AND c.status = 'PENDING'")
	List<Friend> findFriendsRequest(int id);

	@Query("SELECT c FROM Friend c WHERE ((c.sender.id = :sender AND c.receiver.id = :receiver) OR (c.sender.id = :receiver AND c.receiver.id = :sender)) AND c.status = 'ACCEPTED'")
	Optional<Friend> findFriend(int sender, int receiver);

}
