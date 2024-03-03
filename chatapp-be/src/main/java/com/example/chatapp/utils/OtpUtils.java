package com.example.chatapp.utils;

import java.util.Random;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.example.chatapp.common.Constants;

public class OtpUtils {

	public static String genarateOtp() {
		Random random = new Random();

		int otpLength = (int) Math.pow(10, Constants.OTP_LENGTH-1);

		int otpValue = otpLength + random.nextInt(9 * otpLength);
		return String.valueOf(otpValue);
	}
	


}
