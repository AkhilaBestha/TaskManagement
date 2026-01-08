package com.TaskManagement.Service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskManagement.DTO.AuthenticationResponseDTO;
import com.TaskManagement.DTO.LoginRequestDTO;
import com.TaskManagement.DTO.RegisterRequestDTO;
import com.TaskManagement.Entity.User;
import com.TaskManagement.Enum.Permission;
import com.TaskManagement.Repository.UserRepository;
import com.TaskManagement.Security.JWTUtil;
import com.TaskManagement.Security.PermissionConfig;
import com.TaskManagement.Enum.Role;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private JWTUtil jwtUtil;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public AuthenticationResponseDTO register(RegisterRequestDTO request) {
		
		Optional<User>existing = userRepo.findByUserEmail(request.getUserEmail());
		if(existing.isPresent()) {
			throw new RuntimeException("User already exist");
		}
		User user = new User();
		user.setUserName(request.getUserName());
		user.setUserEmail(request.getUserEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setRole(request.getRole());
		
		userRepo.save(user);
		String token = jwtUtil.generateToken(user);
		return new AuthenticationResponseDTO(token,"User register succesfully");
	}
	
	public String login(LoginRequestDTO dto) {
		
		User user = userRepo.findByUserEmail(dto.getUserEmail()).orElseThrow(()-> new RuntimeException("User not found"));
		
		if(!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
			throw new RuntimeException("Invalid credentials");
		}
		return jwtUtil.generateToken(user);
	}
	
	public User updateRole(Long id, Role role) {
		User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		user.setRole(role);
		return userRepo.save(user);
	}
	
	public void deleteUser(Long id, User user) {
		Set<Permission> perm = PermissionConfig.getPermissions(user.getRole());
		if(!perm.contains(Permission.USER_MANAGE)) {
			throw new RuntimeException("Access denied");
		}
		userRepo.delete(user);
	}
}

