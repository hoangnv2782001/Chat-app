package com.example.chatapp.service;

import java.io.IOException;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.chatapp.controller.FriendController;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {

	private final Cloudinary cloudinary;
	private static final Logger logger = LoggerFactory.getLogger(FileServiceImpl.class);
	

	@Override
	public String uploadFile(MultipartFile multipartFile) throws IOException {
		
		logger.info("file name upload {}",multipartFile.getOriginalFilename());
		String fullName = multipartFile.getOriginalFilename();
		String fileName = FilenameUtils.removeExtension(fullName);
		Map params = ObjectUtils.asMap(
			    "public_id", fileName, 
			    "resource_type", "auto"         
			);
		String url = cloudinary.uploader().upload(multipartFile.getBytes(),params).get("url")
				.toString();
		
		return url + " "+ fullName;
	}


	@Override
	public String uploadAvatar(MultipartFile file) throws IOException {

		logger.info("upload avatar");
		String fullName = file.getOriginalFilename();
		String fileName = FilenameUtils.removeExtension(fullName);
		Map params = ObjectUtils.asMap(
			    "public_id", fileName, 
			    "resource_type", "auto"         
			);
		String url = cloudinary.uploader().upload(file.getBytes(),params).get("url")
				.toString();
		
		return url;
		
	}

}
