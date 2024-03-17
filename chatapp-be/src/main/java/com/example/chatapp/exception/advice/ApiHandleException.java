package com.example.chatapp.exception.advice;

import java.util.List;

import com.example.chatapp.exception.UserAlreadyExistException;
import io.jsonwebtoken.JwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.chatapp.dto.response.ObjectResponse;
import com.example.chatapp.exception.MailCustomException;
import com.example.chatapp.exception.OTPException;
import com.example.chatapp.exception.ResourceNotFoundException;

@RestControllerAdvice
public class ApiHandleException {
	private static final Logger logger = LoggerFactory.getLogger(ApiHandleException.class);

	@ExceptionHandler({ AuthenticationException.class, OTPException.class,UsernameNotFoundException.class })
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public ObjectResponse handleLoginException(RuntimeException ex) {
		logger.error("MessageResponse : {}", ex.getMessage());

		return ObjectResponse.builder().httpStatus("401").message(ex.getMessage()).build();
	}

	@ExceptionHandler(BindException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ObjectResponse handleValidationExceptions(BindException ex) {

		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();

		for (FieldError e : fieldErrors) {
			logger.error("message : {} {}", e.getField(), e.getDefaultMessage());
		}
//		return new ObjectResponse("400",);
		return ObjectResponse.builder().httpStatus("400").message(fieldErrors.get(0).getDefaultMessage()).build();
	}

	@ExceptionHandler({UserAlreadyExistException.class,ResourceNotFoundException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ObjectResponse handleUserAlreadyException(Exception ex) {

		logger.error(ex.getMessage());

		return ObjectResponse.builder().httpStatus("400").message(ex.getMessage()).build();
	}

	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ExceptionHandler({MailCustomException.class,Exception.class})
	public ResponseEntity<?> handleMailException(Exception ex) {
		logger.error("internal error : {}", ex.getMessage());
		logger.trace("error", ex);
		return ResponseEntity.badRequest().body(
				ObjectResponse.builder()
				.httpStatus("500")
				.message(ex.getMessage())
				.build());
	}

}
