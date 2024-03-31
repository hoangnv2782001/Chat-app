package com.example.chatapp.common;

public class Constants {
	
	public final static int OTP_LENGTH = 6;
	 
	public final static int OTP_DURATION = 60;
	
	
	public final static String URL_RESET_PASSWORD = "localhost:3000/auth/new-password?code=";
	
	public final static int  TOKEN_RESET_PASSWORD_DURATION  = 3*60*60;
	
	public final static String  MAKE_FRIEND_DESTINATION = "/queue/friend";
	
	public final static long HEARTBEAT = 30000;
	

}
