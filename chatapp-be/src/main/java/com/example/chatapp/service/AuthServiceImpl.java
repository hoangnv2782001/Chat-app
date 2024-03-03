package com.example.chatapp.service;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.chatapp.common.Constants;
import com.example.chatapp.common.Role;
import com.example.chatapp.config.security.JwtAuthenticationFilter;
import com.example.chatapp.config.security.JwtTokenProvider;
import com.example.chatapp.dto.request.LoginDto;
import com.example.chatapp.dto.request.PasswordDto;
import com.example.chatapp.dto.request.RegisterDto;
import com.example.chatapp.dto.request.VerificationInfo;
import com.example.chatapp.dto.response.AuthResponse;
import com.example.chatapp.dto.response.ObjectResponse;
import com.example.chatapp.exception.OTPException;
import com.example.chatapp.exception.UserAlreadyExistException;
import com.example.chatapp.model.User;
import com.example.chatapp.repository.UserRepository;

import lombok.RequiredArgsConstructor;

/**
 * Xử lí bussiness logic cho authenticatin module, bao gồm : Đăng kí Đăng nhập
 * Reset mật khẩu Quên mật khẩu Xác thực otp
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
	private final UserRepository userRepository;
	private final ModelMapper mapper;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManager authenticationManager;
	private final EmailService emailService;
	private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);
	
	private final RedisTemplate redisTemplate;

	/**
	 * Bussiness bao gồm : check exits email genarator otp gửi email xác thực otp
	 * cập nhật thông tin user mới cvào csdl genarate jwt Excepption throw
	 * UserAlreadyExistException khi email đã được sử dụng
	 * 
	 */
	/**
	 * Bussiness bao gồm : check exits email genarator otp gửi email xác thực otp
	 * cập nhật thông tin user mới cvào csdl genarate jwt Excepption throw
	 * UserAlreadyExistException khi email đã được sử dụng
	 *
	 */
	@Override
	public ObjectResponse register(RegisterDto registerDto) {

		userRepository.findByEmail(registerDto.getEmail()).ifPresent((user) -> {
			throw new UserAlreadyExistException("Email is already exit");
		});

		String otp = emailService.sendEmailOtp(registerDto.getEmail());

		logger.info("otp : {}", otp);

		redisTemplate.opsForValue().set(registerDto.getEmail(), otp,Constants.OTP_DURATION,TimeUnit.MINUTES);

		User user = User.builder().name(registerDto.getName()).email(registerDto.getEmail())
				.password(passwordEncoder.encode(registerDto.getPassword())).enable(false)
				.avatar("http://localhost:8000/images/avatar.jpg").build();
		userRepository.save(user);

		return ObjectResponse.builder().httpStatus("201")
				.message("Account created successfully. Please check your email to verify your account.").build();
	}

	/**
	 * Xử lí login : athenticate thông tin cập nhật user vào securitycontext
	 */

	@Override
	public AuthResponse authenticate(LoginDto loginDto) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		User user = (User) authentication.getPrincipal();
		String token = jwtTokenProvider.genarateToken(user);

		return AuthResponse.builder().token(token).id(user.getId()).build();
	}

	/**
	 * Xác thực otp
	 */

	@Override
	public AuthResponse verifyOTP(VerificationInfo veInfo) {
		logger.info("email and pass verify :{} , {} ", veInfo.getEmail(), passwordEncoder.encode(veInfo.getOtp()));
		User user = userRepository.findByEmail(veInfo.getEmail()).orElseThrow(() -> {
			throw new OTPException("Email is invalid");
		});
		
		String token = "";

		try {
			token = redisTemplate.opsForValue().get(veInfo.getEmail()).toString();
		}catch(Exception e) {
			logger.error("Verify account fail");
			throw new OTPException("OTP was expired");
		}
		if(!token.equals(veInfo.getOtp())) {
			throw new OTPException("OTP is invalid");
		}
		
		user.setEnable(true);

		user = userRepository.save(user);


		String jwtToken = jwtTokenProvider.genarateToken(user);

		return AuthResponse.builder().token(jwtToken).id(user.getId()).build();
	}

	/**
	 * handle forgot password
	 */

	@Override
	public ObjectResponse forgotPassword(String email) {
		User user = userRepository.findByEmail(email).orElseThrow(() -> {
			throw new UsernameNotFoundException("User not found");
		});

		String token = emailService.sendEmailResetPassword(email);
		
		logger.info("token reset {}",token);

//		LocalDateTime dateExpiration = LocalDateTime.now().plusSeconds(Constants.TOKEN_RESET_PASSWORD_DURATION);
        redisTemplate.opsForValue().set(token,user ,Constants.TOKEN_RESET_PASSWORD_DURATION,TimeUnit.SECONDS);
//		user.setResetPasswordToken(token);
//
//		user.setTokenExpiration(dateExpiration);
//
//		userRepository.save(user);

		return ObjectResponse.builder().httpStatus("200").message("Reset password link sent to email").build();
	}

	@Override
	public AuthResponse resetPassword(PasswordDto passwordDto) {
		try {
			User user =(User) redisTemplate.opsForValue().get(passwordDto.getToken());
			logger.info("user reset pass {}",user);
			user.setPassword(passwordEncoder.encode(passwordDto.getPassword()));
            redisTemplate.delete(passwordDto.getToken());
			userRepository.save(user);

			String jwtToken = jwtTokenProvider.genarateToken(user);

			return AuthResponse.builder().token(jwtToken).build();
		}catch(Exception e) {
			throw new UsernameNotFoundException("Token is invalid");
		}
	}

}
