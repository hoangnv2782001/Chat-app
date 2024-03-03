package com.example.chatapp.service;

import java.util.UUID;

import javax.swing.text.StyleConstants.ColorConstants;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.example.chatapp.common.Constants;
import com.example.chatapp.config.security.JwtAuthenticationFilter;
import com.example.chatapp.exception.MailCustomException;
import com.example.chatapp.utils.OtpUtils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

/**
 * Send otp email
 */
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
	private final JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	private String sender;

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@Override
	public String sendEmailOtp(String to) {
		String otp = OtpUtils.genarateOtp();

		String content = "Hello\r\n" + "\r\n" + "Your code is: " + otp
				+ ". Use it to verify your email for Registration.\r\n" + "\r\n"
				+ "You must confirm your email within 3 days of signing up. If you do not confirm your email in \r\n"
				+ "this timeframe, your account will be deleted and you will need to sign up for App again. \r\n\n"
				+ "The App Team";
		sendEmail(to,"Confirm your email address", content);
		
		return otp;
	}

	@Override
	public String sendEmailResetPassword(String to) {
		// TODO Auto-generated method stub
		
		String resetToken = UUID.randomUUID().toString();
		
		String link= Constants.URL_RESET_PASSWORD+resetToken;
		
		
		String content = "<html><body>" + "<a href=\"http://" + link + "\">" + link + "</a>" +
                "</body></html>";;
		

		MimeMessage message = emailSender.createMimeMessage();

		boolean multipart = true;

		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(message, multipart, "utf-8");

			 helper.setText(content, true);

			helper.setTo(to);

			helper.setSubject("Quên Mật Khẩu");

			this.emailSender.send(message);

		} catch (MessagingException e) {
			throw new MailCustomException("There was an error sending the email, Please try again later");
		}

		
		return resetToken;
	}

	@Override
	public void sendEmail(String to,String subject, String content) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setSubject(subject);
			message.setFrom(sender);
			message.setTo(to);
			message.setText(content);
			emailSender.send(message);
			logger.info("send email to {} ", to);
		
		} catch (Exception exception) {

			throw new MailCustomException("There was an error sending the email, Please try again later");
		}
	}

}
