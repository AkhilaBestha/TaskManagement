package com.TaskManagement.Controller;

import com.TaskManagement.DTO.NotificationDTO;
import com.TaskManagement.Service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private static final Logger logger = LoggerFactory.getLogger(NotificationController.class);
    private final NotificationService notificationService;

    @Autowired
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getNotifications(
            @RequestParam String userEmail,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        logger.info("Fetching notifications for user: {}, unreadOnly: {}", userEmail, unreadOnly);
        return ResponseEntity.ok(notificationService.getNotifications(userEmail, unreadOnly));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        logger.info("Marking notification as read: {}", id);
        notificationService.markAsRead(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/markAllRead")
    public ResponseEntity<Void> markAllAsRead(@RequestParam String userEmail) {
        logger.info("Marking all notifications as read for user: {}", userEmail);
        notificationService.markAllAsRead(userEmail);
        return ResponseEntity.ok().build();
    }
}
