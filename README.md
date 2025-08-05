
# ShareScribe 📝

**Version:** 1.0.0  
**Status:** Production Ready  
**License:** MIT

ShareScribe is a full-stack, production-ready blogging platform. It enables users to register, authenticate via JWT, create posts, and view a global feed. Built with a React frontend and a Spring Boot (Java 21) backend, ShareScribe is optimized for performance, security, and scalability.

---

## 📦 Features

### 👥 User Management
- ✅ Register with username, email, and password
- ✅ Secure login with JWT-based authentication
- ✅ Auto-refresh tokens from backend responses
- ✅ Logout functionality with localStorage cleanup

### ✍️ Blogging
- ✅ Create new posts with title and content
- ✅ View a global feed of posts from all users
- ✅ Delete your own posts
- ✅ Authenticated routes with access control

### 🔒 Security
- ✅ JWT validation via `/api/check-token`
- ✅ Protected frontend routes using `ProtectedRoute`
- ✅ Token auto-attachment to requests using Axios interceptors

### 🛠️ Dev & Deployment Utilities
- ✅ Backend health check via `/api/ping`
- ✅ Auto redirect on failed token validation
- ✅ Responsive and accessible UI with TailwindCSS

---

## 📁 Tech Stack

### Backend
- **Spring Boot** (Java 21)
- RESTful API architecture
- JWT Authentication
- Google Cloud Run deployment
- CORS-enabled for frontend access

### Frontend
- **React**
- React Router for client-side routing
- Axios for API communication
- TailwindCSS for responsive styling
- LocalStorage for token/user management

---

## 🔗 API Endpoints

### Auth
- `POST /api/register` – Register new users
- `POST /api/login` – Authenticate users
- `POST /api/check-token` – Validate current JWT

### Posts
- `GET /api/posts` – Fetch all posts
- `POST /api/posts` – Create a new post
- `DELETE /api/posts/{id}` – Delete a post (author only)

### Utility
- `GET /api/ping` – Backend health check

---

## 🖥️ Setup Guide

### 📌 Prerequisites
- Java 21+
- Node.js 18+
- npm or yarn

### 🔧 Backend Setup
```bash
# Navigate to the Spring Boot backend directory
./mvnw spring-boot:run
# Server runs at: http://localhost:8080/api
```

### 💻 Frontend Setup
```bash
npm install
npm start
# React app runs at: http://localhost:3000
```

> Ensure backend is running before accessing the frontend

---

## 🌐 Deployment

### Backend
- Deployed to: `https://springboot-service-55670318776.us-central1.run.app/api`

### Frontend
- Configured to communicate with deployed backend via Axios baseURL

---

## 🗂 Folder Structure (Frontend)

```
src/
├── components/
│   ├── Navbar.js
│   └── ProtectedRoute.js
├── pages/
│   ├── LandingPage.js
│   ├── Register.js
│   ├── Login.js
│   ├── PostFeed.js
│   └── CreatePost.js
├── services/
│   └── apiService.js
├── App.js
├── index.js
└── index.css
```

---

## 🧪 Testing

- Frontend test runner: `@testing-library/react`
- Test setup: `App.test.js`
- Command: `npm test`

---

## 🔐 Token & Session Management

- Tokens are stored in `localStorage` as `authToken`
- `userInfo` is stored separately
- Axios automatically attaches tokens to all requests
- Updated tokens from backend are persisted

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🧠 Author

**ShareScribe** – Built with ❤️ using modern Java and JavaScript technologies.
