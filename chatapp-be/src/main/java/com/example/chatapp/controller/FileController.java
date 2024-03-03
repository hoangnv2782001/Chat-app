package com.example.chatapp.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.chatapp.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/files")
public class FileController {
	private final FileService fileService;
	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@PostMapping
	public ResponseEntity<?> upload(@RequestParam MultipartFile file) throws IOException {
		logger.info("request upload file");
		
		return new ResponseEntity(fileService.uploadFile(file), HttpStatus.OK);
	}
	
	@PostMapping("/avatar")
	public ResponseEntity<?> uploadAvatar(@RequestParam MultipartFile file) throws IOException {
		
		logger.info("avatar upload");
		return new ResponseEntity(fileService.uploadAvatar(file), HttpStatus.OK);
	}
}
