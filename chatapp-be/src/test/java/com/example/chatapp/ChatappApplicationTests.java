package com.example.chatapp;



import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;





class ChatappApplicationTests {
	@Test
	public void test() {
		 // Lấy thời gian hiện tại ở múi giờ địa phương
        LocalDateTime localDateTime = LocalDateTime.now();
        
        // Chuyển đổi sang ZonedDateTime ở múi giờ địa phương
        ZonedDateTime localZonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
        
        // Chuyển đổi sang ZonedDateTime ở múi giờ UTC
        ZonedDateTime utcZonedDateTime = localZonedDateTime.withZoneSameInstant(ZoneOffset.UTC);
        
        // In ra thời gian UTC
        System.out.println("Thời gian UTC: " + utcZonedDateTime.toLocalDateTime());
	}


}
