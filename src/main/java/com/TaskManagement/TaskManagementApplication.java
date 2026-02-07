package com.TaskManagement;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class TaskManagementApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(TaskManagementApplication.class);
		app.setBannerMode(Banner.Mode.CONSOLE);
		app.setWebApplicationType(WebApplicationType.SERVLET);
		app.run(args);
	}

}
