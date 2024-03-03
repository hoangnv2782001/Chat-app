package com.example.chatapp.utils;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


public class PasswordEncodeTest {

	
	@Test
	public void test1() {
		// Create an encoder with strength 16
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String result = encoder.encode("myPassword");
		Assertions.assertEquals(encoder.encode("myPassword") ,result);
		 
	}

}
