---
description: how to run the Panafrican Digital Student Card project
---

To run the project, you need to start both the backend and the frontend. Follow these steps:

### 1. Run the Backend (Spring Boot)
Open a new terminal and run:
```bash
cd backend/student-card-backend
chmod +x mvnw
./mvnw spring-boot:run
```
The backend will be available at [http://localhost:8080](http://localhost:8080).

### 2. Run the Frontend (React + Vite)
Open another terminal and run:
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at [http://localhost:5173](http://localhost:5173).

### 3. Accessing the App
- **Student Dashboard**: [http://localhost:5173/login](http://localhost:5173/login)
- **University Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)

> [!NOTE]
> The backend uses an in-memory H2 database for the demo. Data will be reset when the server restarts unless you configure PostgreSQL in `application.properties`.
