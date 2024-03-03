package com.example.chatapp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import com.example.chatapp.dto.response.UserResponse;

@SpringBootTest
public class RedisTest {
	
	@Autowired
	private RedisTemplate redisTemplate;
//	
//	@Test
//	public void insert() {
//		redisTemplate.opsForValue().set("mesage", "hoang");
//		
//		String res = redisTemplate.opsForValue().get("mesage").toString();
//		
//		System.out.println("rsute  "+res);
//		
//		assertEquals(res, "hoang");
//		
//	}
////	
//	@Test
//	public void insertObject() {
//		
//		UserResponse u = UserResponse.builder().id(1).email("fghjk").img("hjk").name("fghjk").online(false).build();
//		redisTemplate.opsForValue().set(u.getId(), u);
//		
//		UserResponse res = (UserResponse)redisTemplate.opsForValue().get(u.getId());
//		
//		System.out.println("rsute  "+res);
//		
//		assertEquals(u.toString(), res.toString());
//		
//	}
	


}
