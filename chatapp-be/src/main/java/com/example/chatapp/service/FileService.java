package com.example.chatapp.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileService  {

	String uploadFile(MultipartFile file) throws IOException;
	
	String uploadAvatar(MultipartFile file) throws IOException;
	
	default String upload(MultipartFile file) {
		return "";
	}
	
}