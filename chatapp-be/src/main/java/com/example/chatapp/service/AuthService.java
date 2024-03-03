package com.example.chatapp.service;

import com.example.chatapp.dto.request.LoginDto;
import com.example.chatapp.dto.request.PasswordDto;
import com.example.chatapp.dto.request.RegisterDto;
import com.example.chatapp.dto.request.VerificationInfo;
import com.example.chatapp.dto.response.AuthResponse;
import com.example.chatapp.dto.response.ObjectResponse;
import com.example.chatapp.exception.UserAlreadyExistException;

/**
 * Định nghĩa các method handle authentication
 */
public interface AuthService {
	/**
	 * Xử lí bussiness register một accout mới
	 * @param registerDto
	 * @return AuthResponse
	 */
	ObjectResponse register(RegisterDto registerDto) ;
	
	/**
	 * Xử lí login vào hệ thống
	 * @param loginDto
	 * @return AuthResponse
	 */
	AuthResponse authenticate(LoginDto loginDto);
	
	/**
	 * Xac thuc otp
	 * @param veInfo
	 * @return message
	 */
	AuthResponse verifyOTP(VerificationInfo veInfo);
	
	/**
	 * xu lí forgot password
	 * @param email
	 * @return
	 */
	ObjectResponse forgotPassword(String email);
	
	/**
	 * reset password
	 * @param email
	 * @return
	 */
	AuthResponse resetPassword(PasswordDto passwordDto);

}
