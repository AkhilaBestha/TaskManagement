package com.TaskManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagement.DTO.EmailLogDTO;
import com.TaskManagement.Service.NotificationService;

import lombok.*;

@RestController
@RequestMapping("/api/notify")
@RequiredArgsConstructor
public class NotificationController {

	@Autowired
	private NotificationService notification;
	
	@PostMapping("/send")
	public ResponseEntity<String> sendEmail(@RequestBody EmailLogDTO dto) {
		notification.sendEmail(dto);
		return ResponseEntity.ok("Email sent successfully");
	}
}
