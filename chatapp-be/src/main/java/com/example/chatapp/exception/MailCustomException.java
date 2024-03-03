package com.example.chatapp.exception;

import org.springframework.mail.MailException;

public class MailCustomException extends MailException {

	public MailCustomException(String msg) {
		super(msg);
		// TODO Auto-generated constructor stub
	}

	
}
