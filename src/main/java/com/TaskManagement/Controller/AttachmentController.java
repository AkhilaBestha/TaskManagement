package com.TaskManagement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.TaskManagement.Entity.Attachment;
import com.TaskManagement.Service.AttachmentService;

@RestController
@RequestMapping("/api/file_upload")
public class AttachmentController {
	
	@Autowired
	private AttachmentService attachmentService;
	
	@PostMapping("/upload")
	public ResponseEntity<Attachment>ulpoad(@RequestParam Long issueId,@RequestParam MultipartFile file,@RequestParam String uploadedBy){
		Attachment saved = attachmentService.upload(issueId, file, uploadedBy);
		return ResponseEntity.ok(saved);
	}
	
	@GetMapping("/{id}/download")
	public ResponseEntity<byte[]>download(@PathVariable Long id){
		
		byte[] data = attachmentService.download(id);
		String fileName= attachmentService.getDownloadFilename(id);
		String contentType = attachmentService.getcontentType(id);
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION,"attachment; fileNmae=\""+ fileName+"\"")
				.contentType(MediaType.parseMediaType(contentType)).body(data);
	}

}
