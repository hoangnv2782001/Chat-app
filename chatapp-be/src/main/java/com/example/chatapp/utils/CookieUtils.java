package com.example.chatapp.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

public class CookieUtils {

	public static HttpHeaders buildCookie(int id) {
		ResponseCookie cookie = ResponseCookie
				.from("user_id", "" + id)
				.httpOnly(true)
				.maxAge(365*24*60*60).path("/").build();

		// Đặt cookie vào HttpHeaders
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
		return headers;
	}

}
