package com.example.chatapp.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import com.example.chatapp.model.User;



@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class UserRepoTest {
	
	@Autowired
	private UserRepository userRepository;
	
	@Test
	public void test1() {
		//give
		User u = new User();
		
		//when
		 u = userRepository.save(u);
		
		
		assertThat(u).isNotNull();
		assertThat(u.getCreateAt()).isNotNull();
	}
	

}
