package com.example.chatapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.chatapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByEmail(String email);
		
	
	@Query("SELECT u FROM User u " +
		       "WHERE u.id NOT IN (" +
		       "    SELECT f.sender.id FROM Friend f WHERE f.receiver.id = :id " +
		       "    UNION " +
		       "    SELECT f.receiver.id FROM Friend f WHERE f.sender.id = :id" +
		       ")"
		       + " AND u.id != :id AND u.enable = true")
	List<User> findByIdNotAndEnableTrue(@Param("id") int id);

}
