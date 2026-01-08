package com.TaskManagement.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("application", "Task Management API");
        response.put("status", "Running");
        response.put("version", "1.0.0");

        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("Authentication", "/api/userAuthentication");
        endpoints.put("User Profile", "/api/userProfile");
        endpoints.put("Tasks", "/api/tasks");
        endpoints.put("Issues", "/api/issues");
        endpoints.put("Issue Links", "/api/issueLinks");
        endpoints.put("Sprints", "/api/sprints");
        endpoints.put("Boards", "/api/boards");
        endpoints.put("Backlogs", "/api/backLogs");
        endpoints.put("Workflows", "/api/workFlows");
        endpoints.put("Notifications", "/api/notify");
        endpoints.put("Integrations", "/api/integrations");
        endpoints.put("File Upload", "/api/file_upload");

        response.put("availableEndpoints", endpoints);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> health = new LinkedHashMap<>();
        health.put("status", "UP");
        health.put("message", "Task Management Application is running");
        return ResponseEntity.ok(health);
    }
}

