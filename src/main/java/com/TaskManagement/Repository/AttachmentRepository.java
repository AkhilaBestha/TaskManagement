package com.TaskManagement.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.TaskManagement.Entity.Attachment;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment,Long> {

}
