package com.TaskManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.TaskManagement.DTO.AuthenticationResponseDTO;
import com.TaskManagement.DTO.LoginRequestDTO;
import com.TaskManagement.DTO.RegisterRequestDTO;
import com.TaskManagement.Entity.User;
import com.TaskManagement.Enum.Role;
import com.TaskManagement.Service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/userAuthentication")
@RequiredArgsConstructor
public class UserAuthenticationController {
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<String>register(@RequestBody RegisterRequestDTO dto){
		userService.register(dto);
		return ResponseEntity.ok("Register Successful");
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponseDTO>login(@RequestBody LoginRequestDTO dto ){
		String token = userService.login(dto);
		return ResponseEntity.ok(new AuthenticationResponseDTO(token,"Login successfully"));
	}
	@PutMapping("/updateUser/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestParam Role role) {
		return ResponseEntity.ok(userService.updateRole(id, role));
	}
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<?>deleteUser(@PathVariable Long id, @RequestBody User user){
		userService.deleteUser(id, user);
		return ResponseEntity.ok("User deleted successfully");
	}

	@GetMapping("/welcome")
	public ResponseEntity<String>welcome(){
		return ResponseEntity.ok("Authentication working fine");
		
	}
}
