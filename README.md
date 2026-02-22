# EduChain 🎓⛓️

**Pan-African Academic Digital Identity Infrastructure**

EduChain is a strategic digital infrastructure designed to transform African education through standardization, trust, and inclusivity. It provides a robust framework for academic digital identities, secure credential issuance, and global diploma verification.

---

## 🚀 Vision & Strategy

- **Pan-African Academic Identity**: Creating a unified digital identity for students across the continent.
- **Absolute Digital Trust**: Ensuring the authenticity of academic records through cryptographic security.
- **Real-World Performance**: Optimized for low-bandwidth and diverse African contexts.
- **Student Financial Inclusion**: Enabling students to leverage their academic credentials for financial opportunities.
- **AI for Trust**: Utilizing AI to enhance security and detect fraudulent activities.

## ✨ Key Features

- **Digital Identity**: Secure profiles for Students, Institutions, and Administrators.
- **Credential Issuance**: Institutions can issue digital diplomas and certificates.
- **QR Code Verification**: Instant verification of credentials via mobile-friendly QR codes.
- **Smart Dashboards**: Tailored experiences for:
    - **Students**: View credentials, track progress, and share identities.
    - **Institutions**: Manage students, issue credentials, and track analytics.
    - **Admins**: Platform oversight, security logs, and institution management.
- **Secure Authentication**: Robust JWT-based security with role-based access control.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (via [Vite](https://vitejs.dev/))
- **Styling**: Vanilla CSS with a custom-built Premium Design System (Glassmorphism, Dark Mode).
- **Icons**: Lucide React.
- **API Client**: Axios.
- **Utilities**: `qrcode.react` for credential generation.

### Backend
- **Core**: [Spring Boot 3](https://spring.io/projects/spring-boot) (Java 21).
- **Security**: Spring Security + JSON Web Token (JWT).
- **Data**: Spring Data JPA + Hibernate.
- **Database**: PostgreSQL (Production) / H2 (Development & Demo).
- **Migration**: Flyway.
- **Documentation**: Swagger/OpenAPI.

---

## 🛠️ Getting Started

### Prerequisites
- **Java 21** or higher.
- **Node.js 18** or higher.
- **Maven 3.8+**.
- **PostgreSQL** (optional, defaults to H2).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the application (using H2 by default):
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend will be available at `http://localhost:8080`.*

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:5173`.*

---

## 📁 Project Structure

```bash
educhain/
├── backend/            # Spring Boot application
│   ├── src/main/java   # Java source code
│   └── src/main/resources/db/migration # Flyway migrations
├── frontend/           # Vite + React application
│   ├── src/components  # Reusable UI components
│   ├── src/pages       # Dashboard and landing pages
│   └── src/context     # Auth and State management
└── README.md           # Project documentation
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues to improve the EduChain ecosystem.

## 📄 License

This project is licensed under the MIT License.
