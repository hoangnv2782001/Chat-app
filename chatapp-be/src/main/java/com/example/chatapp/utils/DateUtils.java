package com.example.chatapp.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

public class DateUtils {

	private DateUtils() {

	}

	public static LocalDateTime convertToUtc(LocalDateTime date) {

		ZonedDateTime localZonedDateTime = date.atZone(ZoneId.systemDefault());

		ZonedDateTime utcZonedDateTime = localZonedDateTime.withZoneSameInstant(ZoneOffset.UTC);

		return utcZonedDateTime.toLocalDateTime();
	}

}
