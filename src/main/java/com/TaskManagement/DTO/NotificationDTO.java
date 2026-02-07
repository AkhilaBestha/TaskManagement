package com.TaskManagement.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    private Long id;
    private String message;
    private boolean read;
    private LocalDateTime createdAt;

    // Explicit getter for boolean 'read' field to ensure isRead() is available
    public boolean isRead() {
        return this.read;
    }

    // Explicit setter for boolean 'read' field
    public void setRead(boolean read) {
        this.read = read;
    }

    // Explicit getters to ensure they are available
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
