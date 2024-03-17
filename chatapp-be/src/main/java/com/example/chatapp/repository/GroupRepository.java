package com.example.chatapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.chatapp.model.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, String>{
	
	@Query("SELECT c FROM Group c JOIN c.members m  WHERE m.user.id = :id")
	List<Group> getGroupsByMember(int id);

}
