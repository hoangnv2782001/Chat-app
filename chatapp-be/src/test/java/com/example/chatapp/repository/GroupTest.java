package com.example.chatapp.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.chatapp.model.Group;

@SpringBootTest
public class GroupTest {

	@Autowired
	private GroupRepository groupRepository;
	@Test
	public void testGroup() {
		List<Group> g = groupRepository.getGroupsByMember(1);
		
	
		assertThat(g.get(0).getLastMessage()).isNull();
		
	}
}
