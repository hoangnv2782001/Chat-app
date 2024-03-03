package com.example.chatapp.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class VerificationInfo {
	@NotBlank(message = "All fields are required")
	@Email(message="Email is invalid")
	private String email;
	
	@NotBlank(message = "All fields are required")
	@Size(min=6,max=6,message="OTP is invalid")
	private String otp;
}
