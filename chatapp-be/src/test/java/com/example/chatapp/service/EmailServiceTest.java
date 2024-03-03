package com.example.chatapp.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.ActiveProfiles;

import com.example.chatapp.exception.MailCustomException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Assertions;

/**
 * email service testing
 */

@ExtendWith(MockitoExtension.class)
@ActiveProfiles(profiles = "test")
@SpringBootTest
public class EmailServiceTest {
	
	@Autowired
	private EmailService emailService;
	
	
	
	
	


}
