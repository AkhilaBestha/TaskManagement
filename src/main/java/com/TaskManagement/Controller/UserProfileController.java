package com.TaskManagement.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagement.DTO.UserProfileDTO;
import com.TaskManagement.Service.UserProfileService;

import lombok.*;

@RestController
@RequestMapping("/api/userProfile")
@RequiredArgsConstructor

public class UserProfileController {

	@Autowired
	private UserProfileService userProfile;
	
	@PostMapping("/createProfile")
	public ResponseEntity<UserProfileDTO>createProfile(@RequestBody UserProfileDTO dto){
		return ResponseEntity.ok(userProfile.createProfile(dto));
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<UserProfileDTO>>getAllProfile(){
		return ResponseEntity.ok(userProfile.getAllProfile());
	}
	
	@GetMapping("/{email}")
	public ResponseEntity<UserProfileDTO>getProfileByEmail(@PathVariable String userOrganizationEmail){
		return ResponseEntity.ok(userProfile.getProfileByOrganizationEmail(userOrganizationEmail));
	}
	
	@PutMapping("/update/{email}")
	public ResponseEntity<UserProfileDTO>updateProfile(@PathVariable String userOrganizationEmail,@RequestBody UserProfileDTO dto){
		return ResponseEntity.ok(userProfile.updateProfile(userOrganizationEmail, dto));
	}
	
	@GetMapping("/public/test")
	public String publicTest() {
		return "User Profile API is running";
	}
	
	
}
