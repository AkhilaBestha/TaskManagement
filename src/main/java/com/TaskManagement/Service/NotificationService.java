package com.TaskManagement.Service;

import com.TaskManagement.DTO.NotificationDTO;

import java.util.List;

public interface NotificationService {
    List<NotificationDTO> getNotifications(String userEmail, boolean unreadOnly);
    void markAsRead(Long id);
    void markAllAsRead(String userEmail);
}

