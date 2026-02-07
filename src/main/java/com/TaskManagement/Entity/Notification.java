package com.TaskManagement.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String userEmail;

    private String message;

    @Column(name = "is_read")
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

    public String getMessage() {
        return this.message;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
}

