package com.example.chatapp.model;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class UserTest {
	
	@Test
	public void test1() {
		User u = new User();
		System.out.println(u.getCreateAt());
		assertThat(u.getCreateAt()).isNull();
		
	}

}
