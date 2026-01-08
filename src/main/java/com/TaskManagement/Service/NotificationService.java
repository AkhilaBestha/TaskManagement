package com.TaskManagement.Service;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.TaskManagement.DTO.EmailLogDTO;
import com.TaskManagement.Repository.EmailLogRepository;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.Transport;
import jakarta.mail.Message;


@Service
public class NotificationService {

    @Autowired
    private EmailLogRepository logRepo;

    
  public void sendEmail(EmailLogDTO dto) {
	  final String fromEmail = "jaichanaditya143@gmail.com";
	  final String password = "";
  
	  Properties props = new Properties();
	  props.put("mail.smtp.host", "smtp.gmail.com");
	  props.put("mail.smtp.port", "587");
	  props.put("mail.smtp.auth", "true");
	  props.put("mail.smtp.starttls.enable", "true");
	  
	  Session session = Session.getInstance(props, new jakarta.mail.Authenticator() {
		  protected PasswordAuthentication getPasswordAuthentication() {
		  return new PasswordAuthentication(fromEmail, password);
		  }
	  });
	  	
	  try {
		  Message msg = new MimeMessage(session);
		  msg.setFrom(new InternetAddress(fromEmail));
		  msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(dto.getRecipientEmail()));
		  msg.setSubject(dto.getSubject());
		  msg.setText(dto.getBody());
		  
		  Transport.send(msg);
		  System.out.println("Email sent successfully");
		  
	  } catch (Exception e) {
		  throw new RuntimeException("Failed to send email", e);
	  }
	  
  }
    
    
}
