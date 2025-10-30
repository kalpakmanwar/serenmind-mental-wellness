# SerenMind 🌟

**A modern mental wellness application for journaling, mood tracking, AI-powered insights, and mindfulness.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-17+-orange.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)

---

## 👨‍💻 **DEVELOPER**

<div align="center">
  
### **Kalpak Shrikrushna Manwar**

**Full-Stack Developer**

📧 **Email:** kalpakm11@gmail.com  
📱 **Phone:** +91-8767309198  
💼 **Role:** Complete project design, development, and implementation  
📅 **Development Period:** October 2025  

</div>

> **Project Authenticity Statement:**  
> This entire project was independently designed and developed by **Kalpak Manwar**.  
> Every line of code, feature, and design decision was made personally.  
> I can explain and defend any technical choice in this codebase.

**Skills Demonstrated:**
- ✅ Full-stack web development (React + Spring Boot)
- ✅ REST API design and implementation
- ✅ Database design and optimization (MySQL)
- ✅ Authentication & authorization (JWT, Spring Security)
- ✅ AI integration (OpenAI GPT API)
- ✅ Modern UI/UX design (Tailwind, Framer Motion)
- ✅ State management and routing
- ✅ PDF generation and data visualization
- ✅ Push notifications and service workers
- ✅ Production deployment practices

---

## 🎨 Design Philosophy

SerenMind features a **Canva-inspired UI** with:
- **Soft cream background** (#F8EFE4)
- **Peach & sage accents** (#F6D7C3, #CFEFE6)
- **Rounded cards** with subtle shadows
- **Playfair Display** headings + **Poppins** body text
- **Smooth animations** via Framer Motion

---

## 🚀 Tech Stack

### Backend
- **Java 17+** with **Spring Boot 3.x**
- **Maven** for dependency management
- **MySQL 8.0** with **JPA/Hibernate**
- **Flyway** for database migrations
- **JWT** authentication (access + refresh tokens)
- **OpenAI API** integration (proxied, never exposed to frontend)
- **Spring Security** for auth & authorization
- **JUnit 5** + **Spring Boot Test** for testing

### Frontend
- **React 18** with **Vite**
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Chart.js** (react-chartjs-2) for mood analytics
- **jsPDF** for PDF export
- **Axios** for HTTP requests
- **React Router** for navigation
- **Jest** + **React Testing Library** for testing

### DevOps
- **Docker** + **Docker Compose** for local development
- **GitHub Actions** for CI/CD
- **Flyway** for database versioning
- Deployment guides for **Render**, **Vercel**, **Heroku**, **AWS**

---

## 📁 Project Structure

```
serenmind-root/
├── backend/              # Spring Boot application
├── frontend/             # React + Vite application
├── .env.example          # Environment variables template
├── docker-compose.yml    # Multi-container orchestration
├── README.md             # This file
└── .github/
    └── workflows/
        └── ci.yml        # GitHub Actions CI/CD
```

---

## 🛠️ Quick Start

### Prerequisites
- **Java 17+** ([Download](https://adoptium.net/))
- **Node.js 18+** and **npm** ([Download](https://nodejs.org/))
- **Maven 3.8+** ([Download](https://maven.apache.org/))
- **Docker** and **Docker Compose** ([Download](https://www.docker.com/))
- **MySQL 8.0** (or use Docker)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/serenmind.git
cd serenmind
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your actual values (DB credentials, JWT secret, OpenAI key)
```

### 3. Run with Docker Compose (Recommended)
```bash
# Build and start all services (backend, frontend, MySQL)
docker-compose up --build

# Access the application:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8080/api
# API Docs: http://localhost:8080/swagger-ui.html
```

### 4. Run Locally (Without Docker)

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
mvn verify
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

---

## 🌐 Deployment

Detailed deployment guides for multiple platforms:
- [Render Deployment](./docs/deploy-render.md)
- [Vercel + Render](./docs/deploy-vercel.md)
- [Heroku](./docs/deploy-heroku.md)
- [AWS ECS/Fargate](./docs/deploy-aws.md)

---

## 🔐 Security & Privacy

- **JWT tokens** with secure refresh mechanism
- **Passwords hashed** with BCrypt
- **OpenAI API keys** never exposed to frontend
- **GDPR compliance notes**: User data (journals, moods) stored with consent
- **Cookie consent modal** implemented in frontend

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 👨‍💻 Author & Developer

**Kalpak Manwar**
- **Email**: kalpakm11@gmail.com
- **Phone**: +91-8767309198
- **Project**: Developed as part of a mental wellness initiative

Kalpak Manwar is a full-stack developer passionate about using technology to create meaningful solutions for mental health and wellness. SerenMind represents a comprehensive approach to personal mental wellness tracking with modern AI integration.

---

## 📞 Support & Contact

For questions, support, or collaboration inquiries:

- **Developer**: Kalpak Manwar
- **Email**: kalpakm11@gmail.com  
- **Phone**: +91-8767309198
- **GitHub Issues**: [Report a bug](https://github.com/yourusername/serenmind/issues)

---

## 🙏 Credits

**Made with ❤️ by Kalpak Manwar**

Special thanks to the open-source community and everyone who believes in making mental wellness accessible to all.

