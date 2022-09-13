package com.ssafy.fullcourse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class FullcourseApplication {

	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:properties/application.yml,"
			+ "classpath:properties/application-hide.yml";

//	public static void main(String[] args) {
//		SpringApplication.run(FullcourseApplication.class, args);
//	}

	public static void main(String[] args) {
		new SpringApplicationBuilder(FullcourseApplication.class)
				.properties(APPLICATION_LOCATIONS)
				.run(args);
	}

}
