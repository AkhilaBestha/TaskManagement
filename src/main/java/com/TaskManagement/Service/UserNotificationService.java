package com.TaskManagement.Service;

import com.TaskManagement.DTO.NotificationDTO;
import com.TaskManagement.Entity.Notification;
import com.TaskManagement.Repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserNotificationService implements NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(UserNotificationService.class);
    private final NotificationRepository notificationRepository;

    public UserNotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public List<NotificationDTO> getNotifications(String userEmail, boolean unreadOnly) {
        logger.info("Fetching notifications for user '{}', unreadOnly: {}", userEmail, unreadOnly);
        List<Notification> notifications;
        if (unreadOnly) {
            notifications = notificationRepository.findByUserEmailAndReadFalseOrderByCreatedAtDesc(userEmail);
        } else {
            notifications = notificationRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
        }
        logger.info("Found {} notifications for user '{}'", notifications.size(), userEmail);
        return notifications.stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Long id) {
        logger.info("Marking notification with id '{}' as read", id);
        notificationRepository.findById(id).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
            logger.info("Notification with id '{}' marked as read", id);
        });
    }

    @Override
    public void markAllAsRead(String userEmail) {
        logger.info("Marking all notifications for user '{}' as read", userEmail);
        List<Notification> notifications = notificationRepository.findByUserEmailAndReadFalseOrderByCreatedAtDesc(userEmail);
        notifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(notifications);
        logger.info("Marked {} notifications as read for user '{}'", notifications.size(), userEmail);
    }

    private NotificationDTO toDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setMessage(notification.getMessage());
        dto.setRead(notification.isRead());
        dto.setCreatedAt(notification.getCreatedAt());
        return dto;
    }
}
