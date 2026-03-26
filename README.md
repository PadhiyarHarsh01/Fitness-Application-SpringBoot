# 🏋️ FitTrack — Fitness Tracking Application

A full-stack fitness tracking web application built with **Spring Boot**, **React (Vite)**, **MySQL**, and **Docker**. FitTrack helps users log workouts, monitor water intake, track progress, and receive AI-powered health reports via the Google Gemini API.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Run with Docker (Recommended)](#run-with-docker-recommended)
  - [Run Locally (Without Docker)](#run-locally-without-docker)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Roles & Access](#-roles--access)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)

---

## ✨ Features

### User Features
- 🔐 JWT-based Authentication (Register / Login)
- 📊 Personal Dashboard with summary cards and goal progress
- 🏃 Activity Logging (running, cycling, gym, etc.)
- 💧 Water Intake Tracker
- 📈 Progress Charts (powered by Recharts)
- 🤖 AI-Generated Health Reports (Google Gemini API)
- 💬 Feedback Submission
- 👤 Profile Management (update info, change password)
- 📄 PDF Report Export (via jsPDF)

### Admin Features
- 👥 User Management (view, manage all users)
- 📬 Feedback Review Panel
- 🤖 AI Insights Dashboard

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, React Router v7 |
| **Backend** | Spring Boot 3, Spring Security, Spring Data JPA |
| **Database** | MySQL 8 |
| **Auth** | JWT (jjwt library) |
| **AI Integration** | Google Gemini API (via OkHttp) |
| **Containerization** | Docker, Docker Compose |
| **Web Server** | Nginx (serves React build in production) |
| **Charts** | Recharts |
| **PDF** | jsPDF |

---

## 📁 Project Structure

```
Fitness-Application-SpringBoot-main/
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/java/com/fittrack/backend/
│       ├── controller/        # REST controllers
│       │   ├── AuthController.java
│       │   ├── ActivityController.java
│       │   ├── WaterController.java
│       │   ├── ProgressController.java
│       │   ├── DashboardController.java
│       │   ├── AIReportController.java
│       │   ├── FeedbackController.java
│       │   ├── UserController.java
│       │   └── AdminController.java
│       ├── service/           # Business logic
│       ├── entity/            # JPA entities (User, Activity, WaterIntake, Feedback)
│       ├── repository/        # Spring Data repositories
│       ├── dto/               # Request/response DTOs
│       ├── security/          # JWT filter & utility
│       └── config/            # CORS, Security, Password configs
└── client/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    └── src/
        ├── api/               # Axios API calls per domain
        ├── pages/             # Route-level page components
        ├── components/        # Reusable UI components
        ├── layouts/           # AppLayout, AdminLayout
        ├── routes/            # PrivateRoute, PublicRoute, RoleRoute
        ├── hooks/             # useAuthCheck
        └── utils/             # JWT decode, auth helpers
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose installed, **OR**
- Java 17+, Maven 3.9+, Node.js 20+, MySQL 8

---

### Run with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/PadhiyarHarsh01/Fitness-Application-SpringBoot.git
   cd fitness-app-springboot
   ```

2. **Create a `.env` file** in the project root:
   ```env
   DB_USERNAME=root
   DB_PASSWORD=root
   JWT_SECRET=your_super_secret_jwt_key_min_32_chars
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

3. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the app**
   - Frontend: [http://localhost](http://localhost)
   - Backend API: [http://localhost:8080](http://localhost:8080)
   - MySQL: `localhost:3307`

> The backend will automatically create the database schema on first run (`ddl-auto: update`).

---

### Run Locally (Without Docker)

#### Backend

1. Make sure MySQL is running and create the database:
   ```sql
   CREATE DATABASE fittrack;
   ```

2. Copy the example config and fill in your values:
   ```bash
   cp backend/src/main/resources/application-example.yml backend/src/main/resources/application.yml
   ```

3. Edit `application.yml`:
   ```yaml
   server:
    port: 8080

    spring:
        datasource:
            url: jdbc:mysql://localhost:3306/fittrack?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
            username:
            password:
            driver-class-name: com.mysql.cj.jdbc.Driver

    jpa:
        hibernate:
        ddl-auto: update   # use create-drop only for testing
        show-sql: true
        properties:
            hibernate:
                dialect: org.hibernate.dialect.MySQLDialect
                format_sql: true

    logging:
        level:
            org.hibernate.SQL: DEBUG
            org.hibernate.type.descriptor.sql.BasicBinder: TRACE

    gemini:
        api:
            key: 

    jwt:
        secret:
            expiration: 43200000   # 12 hr in ms
   ```

4. Run the backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

#### Frontend

1. Install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Access the app at [http://localhost:5173](http://localhost:5173)

---

## 🔑 Environment Variables

| Variable | Description | Example |
|---|---|---|
| `DB_USERNAME` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `root` |
| `JWT_SECRET` | Secret key for signing JWTs (min 32 chars) | `my_super_secret_key_1234567890ab` |
| `GEMINI_API_KEY` | Google Gemini API key for AI reports | `AIzaSy...` |

> **Note:** Never commit your `.env` file or `application.yml` with real credentials to version control. Both are already listed in `.gitignore`.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Activities
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/activities` | Get all activities for logged-in user |
| `POST` | `/api/activities` | Log a new activity |
| `DELETE` | `/api/activities/{id}` | Delete an activity |

### Water Intake
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/water` | Get today's water intake |
| `POST` | `/api/water` | Add water intake entry |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/summary` | Get summary stats |
| `GET` | `/api/dashboard/goals` | Get goals progress |

### Progress
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/progress` | Get progress chart data |

### AI Reports
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/report` | Generate AI health report via Gemini |

### User / Profile
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/user/profile` | Get current user profile |
| `PUT` | `/api/user/profile` | Update profile info |
| `PUT` | `/api/user/change-password` | Change password |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/users` | List all users |
| `GET` | `/api/admin/feedback` | View all feedback |

> All protected endpoints require the `Authorization: Bearer <token>` header.

---

## 👥 Roles & Access

| Role | Access |
|---|---|
| `USER` | Dashboard, Activities, Progress, Reports, Profile, Feedback |
| `ADMIN` | All user routes + Admin Dashboard, User Management, Feedback Panel, AI Insights |
| `SUPER_ADMIN` | All ADMIN capabilities |

Role-based routing is enforced both on the frontend (`RoleRoute`) and backend (`Spring Security`).

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).