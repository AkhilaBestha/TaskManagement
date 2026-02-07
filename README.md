# Task Management Application - Backend

A comprehensive Task Management System built with Spring Boot that provides robust backend services for project management, issue tracking, sprint planning, and team collaboration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Security](#security)
- [Running the Application](#running-the-application)
- [Testing](#testing)

## ✨ Features

- **User Authentication & Authorization** - JWT-based authentication with role-based access control
- **Task Management** - Create, update, track, and assign tasks to team members
- **Issue Tracking** - Complete issue lifecycle management with comments and status tracking
- **Sprint Planning** - Agile sprint management with burndown charts
- **Board Management** - Kanban-style boards with columns and cards for visual project tracking
- **Backlog Management** - Organize and prioritize product backlog items
- **File Attachments** - Upload and manage file attachments using Cloudinary
- **Notifications** - Real-time notification system for task updates
- **Workflow Management** - Customizable workflows and state transitions
- **Issue Linking** - Link related issues together
- **Email Notifications** - Automated email notifications for important events
- **PDF Report Generation** - Generate PDF reports for tasks and sprints
- **External Integrations** - Feign client support for external service integrations

## 🛠 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.1.5 | Application Framework |
| Spring Security | - | Authentication & Authorization |
| Spring Data JPA | - | Database ORM |
| Spring Cloud OpenFeign | 2022.0.4 | HTTP Client for Microservices |
| MySQL | 8.x | Database |
| JWT (jjwt) | 0.11.5 | Token-based Authentication |
| Lombok | - | Boilerplate Code Reduction |
| Cloudinary | 1.29.0 | Cloud-based File Storage |
| iTextPDF | 5.5.13 | PDF Generation |
| Maven | - | Build Tool |

## 📝 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 17** or higher
- **Maven 3.6+**
- **MySQL 8.0+**
- **Git** (for cloning the repository)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/task-management.git
   cd task-management
   ```

2. **Create MySQL Database**
   ```sql
   CREATE DATABASE taskmanagement;
   ```

3. **Configure application properties** (see [Configuration](#configuration))

4. **Build the project**
   ```bash
   ./mvnw clean install
   ```

## ⚙️ Configuration

1. Copy the example configuration file:
   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   ```

2. Update the `application.properties` file with your settings:

   ```properties
   # Application Name
   spring.application.name=Taskmanagement

   # Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_database_username
   spring.datasource.password=your_database_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

   # JPA/Hibernate Settings
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

   # Server Port
   server.port=8080

   # JWT Configuration
   jwt.secret=your_jwt_secret_key_here
   jwt.expiration=86400000
   ```

3. **Additional configurations** (if using these features):
   - **Cloudinary**: Add your Cloudinary credentials for file uploads
   - **Email**: Configure SMTP settings for email notifications

## 📡 API Endpoints

### Authentication (`/api/userAuthentication`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login` | Authenticate user and get JWT token |
| PUT | `/updateUser/{id}` | Update user role |
| DELETE | `/deleteUser/{id}` | Delete a user |
| GET | `/welcome` | Health check endpoint |

### Tasks (`/api/tasks`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/createTask` | Create a new task |
| GET | `/allTask` | Get all tasks |
| GET | `/user/{userEmail}` | Get tasks by assigned user |
| PATCH | `/{id}/status` | Update task status |
| GET | `/public/test` | Test endpoint |

### Issues (`/api/issues`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create a new issue |
| GET | `/{id}` | Get issue by ID |
| GET | `/assign/{assignedEmail}` | Get issues by assignee |
| PATCH | `/{id}/status` | Update issue status |
| POST | `/{id}/comments` | Add comment to issue |

### Boards (`/api/boards`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create_board` | Create a new board |
| GET | `/{id}` | Get board by ID |
| GET | `/{id}/columns` | Get board columns |
| POST | `/{id}/columns` | Add column to board |
| POST | `/{id}/cards` | Add card to board |
| POST | `/{id}/cards/{cardId}/move` | Move card between columns |
| POST | `/{id}/columns/{columnId}/records` | Reorder column cards |

### Sprints (`/api/sprints`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create` | Create a new sprint |
| PUT | `/assign/{sprintId}/{issueId}` | Assign issue to sprint |
| PUT | `/{sprintId}/start` | Start a sprint |
| PUT | `/{sprintId}/close` | Close a sprint |
| GET | `/{sprintId}/burnDown` | Get burndown chart data |

### Additional Endpoints
- **Notifications** (`/api/notifications`) - Manage user notifications
- **Attachments** (`/api/attachments`) - File upload and management
- **Workflows** (`/api/workflows`) - Workflow configuration
- **Issue Links** (`/api/issueLinks`) - Link related issues
- **Backlog** (`/api/backlog`) - Backlog management
- **User Profile** (`/api/userProfile`) - User profile management
- **Integrations** (`/api/integrations`) - External integrations

## 📁 Project Structure

```
src/main/java/com/TaskManagement/
├── TaskManagementApplication.java    # Main application entry point
├── Client/                           # Feign clients for external services
│   ├── IssueClient.java
│   └── UserClient.java
├── Controller/                       # REST API controllers
│   ├── AttachmentController.java
│   ├── BackLogController.java
│   ├── BoardController.java
│   ├── HomeController.java
│   ├── IntegrationController.java
│   ├── IssueController.java
│   ├── IssueLinkController.java
│   ├── NotificationController.java
│   ├── SprintController.java
│   ├── TaskController.java
│   ├── UserAuthenticationController.java
│   ├── UserProfileController.java
│   └── WorkFlowController.java
├── DTO/                              # Data Transfer Objects
│   ├── AuthenticationResponseDTO.java
│   ├── IssueDTO.java
│   ├── LoginRequestDTO.java
│   ├── NotificationDTO.java
│   ├── RegisterRequestDTO.java
│   ├── TaskDTO.java
│   └── ...
├── Entity/                           # JPA Entities
│   ├── Attachment.java
│   ├── Board.java
│   ├── BoardCard.java
│   ├── BoardColumn.java
│   ├── Issue.java
│   ├── IssueComments.java
│   ├── Notification.java
│   ├── Sprint.java
│   ├── Task.java
│   ├── User.java
│   ├── WorkFlow.java
│   └── ...
├── Enum/                             # Enumerations
│   ├── BoardType.java
│   ├── IssuePriority.java
│   ├── IssueStatus.java
│   ├── IssueType.java
│   ├── Permission.java
│   ├── Role.java
│   ├── SprintState.java
│   └── TaskStatus.java
├── ExceptionHandler/                 # Custom exception handling
├── Repository/                       # JPA Repositories
│   ├── BoardRepository.java
│   ├── IssueRepository.java
│   ├── SprintRepository.java
│   ├── TaskRepository.java
│   ├── UserRepository.java
│   └── ...
├── Security/                         # Security configuration
│   ├── CloudinaryConfig.java
│   ├── CustomUserDetailsService.java
│   ├── JWTUtil.java
│   ├── PermissionConfig.java
│   └── SecurityConfiguration.java
└── Service/                          # Business logic services
    ├── AttachmentService.java
    ├── BoardService.java
    ├── CloudinaryStorageService.java
    ├── IssueService.java
    ├── NotificationService.java
    ├── SprintService.java
    ├── TaskService.java
    ├── UserService.java
    └── ...
```

## 🗄 Database Schema

### Core Entities

| Entity | Description |
|--------|-------------|
| **User** | User accounts with authentication details |
| **UserProfile** | Extended user profile information |
| **Task** | Individual task items |
| **Issue** | Issue/ticket items with full lifecycle |
| **IssueComments** | Comments on issues |
| **IssueLink** | Relationships between issues |
| **Sprint** | Sprint containers for agile planning |
| **Board** | Kanban boards |
| **BoardColumn** | Columns within boards |
| **BoardCard** | Cards representing issues on boards |
| **Attachment** | File attachments |
| **Notification** | User notifications |
| **WorkFlow** | Workflow definitions |
| **WorkFlowTransaction** | Workflow state transitions |
| **Label** | Labels for categorization |
| **EmailLog** | Email notification logs |

## 🔐 Security

The application implements comprehensive security measures:

- **JWT Authentication** - Stateless token-based authentication
- **Role-Based Access Control** - Different permissions for different user roles
- **Password Encryption** - Secure password hashing
- **CORS Configuration** - Controlled cross-origin resource sharing
- **API Security** - Protected endpoints with authentication requirements

### User Roles
- `ADMIN` - Full system access
- `USER` - Standard user permissions
- Additional custom roles as defined in `Role.java`

## 🏃 Running the Application

### Using Maven
```bash
# Development mode with hot reload
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

### Using JAR
```bash
# Build the JAR
./mvnw clean package

# Run the JAR
java -jar target/TaskManagement-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8080`

## 🧪 Testing

Run the test suite:
```bash
./mvnw test
```

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and queries, please open an issue in the repository.

