package com.example.chatapp.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class LoginDto {

	@NotBlank(message = "Both Email and Password are required")
	private String password;

	@NotBlank(message = "Both Email and Password are required")
	@Email(message = "Email is invalid")
	private String email;

}
