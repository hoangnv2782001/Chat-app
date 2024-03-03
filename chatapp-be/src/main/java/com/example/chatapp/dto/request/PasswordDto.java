package com.example.chatapp.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordDto {

	@NotBlank(message = "Password is required")
	private String password;

	@NotBlank(message = "ConfirmPassword is required")
	private String confirmPassword;
	
	@NotBlank(message = "Token is required")
	private String token;

}
