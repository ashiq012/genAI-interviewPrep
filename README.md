# 🤖 AI Prep — Smart Interview Preparation Platform

<div align="center">

![AI Prep Banner](https://img.shields.io/badge/AI%20Prep-Interview%20Platform-7F77DD?style=for-the-badge&logo=google&logoColor=white)

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)

**AI-powered interview preparation tool that analyzes your resume and job description to create a personalized interview strategy.**

</div>

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)

---

## 🧠 About the Project

**AI Prep** is a full-stack MERN application powered by **Google Gemini AI** that helps job seekers prepare smarter for interviews. Upload your resume, paste the job description, and let AI generate a complete preparation strategy tailored specifically for you.

No more generic interview prep — every plan is built around **your skills** and the **exact job you're applying for**.

---

## ✨ Features

### 🔐 Authentication
- Secure **Register / Login** system
- Passwords hashed with **bcrypt**
- Session managed via **JWT tokens** stored in HTTP-only cookies
- Protected routes — only logged-in users can access reports

### 📄 AI-Powered Interview Report
- Upload your **Resume (PDF)** or write a **Self Description**
- Paste the **Job Description**
- Gemini AI analyzes all three and generates:
  - ✅ **Match Score** — how well your profile fits the job (0–100%)
  - ✅ **Technical Questions** — 5+ interview questions with intentions and model answers
  - ✅ **Behavioral Questions** — 3+ questions with STAR-method answers
  - ✅ **Skill Gaps** — missing skills with severity (low / medium / high)
  - ✅ **7-Day Preparation Plan** — daily focus areas and specific tasks

### 📝 ATS-Friendly Resume Generator
- AI creates a **custom resume** tailored to the job description
- Download as a **professional PDF** using Puppeteer
- Resume highlights your most relevant skills for the target role

### 📁 Report History
- View all your **past interview reports**
- Click any report to access the full preparation plan again
- Reports sorted by most recent

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Router | Client-side routing |
| Axios | HTTP requests |
| Context API | Global state management |
| SCSS | Styling |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB + Mongoose | Database |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | File upload handling |
| pdf-parse | Extract text from PDF resumes |
| Puppeteer | Generate PDF from HTML |
| Google Gemini AI | AI report generation |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
ai-prep/
├── backend/
│   ├── controller/
│   │   ├── auth.controller.js         # Register, Login, Logout, GetMe
│   │   └── interview.controller.js    # Generate report, Get reports, PDF
│   ├── middleware/
│   │   ├── auth.js                    # JWT verification middleware
│   │   └── file.middleware.js         # Multer file upload config
│   ├── models/
│   │   ├── user.model.js              # User schema
│   │   └── interviewReport.model.js   # Interview report schema
│   ├── routes/
│   │   ├── auth.routes.js             # /api/auth/*
│   │   └── interview.routes.js        # /api/interview/*
│   ├── services/
│   │   └── ai.services.js             # Gemini AI integration
│   ├── .env                           # Environment variables (never commit)
│   └── server.js                      # Entry point
│
└── frontend/
    ├── src/
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── auth.context.jsx   # Auth context provider
    │   │   │   └── auth.api.js        # Auth API calls
    │   │   └── interview/
    │   │       ├── interview.context.jsx
    │   │       ├── hooks/
    │   │       │   └── useInterview.js
    │   │       └── services/
    │   │           └── interview.api.js
    │   ├── pages/
    │   │   ├── Home.jsx               # Report generation form
    │   │   └── Interview.jsx          # Report detail view
    │   └── main.jsx
    └── index.html
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-prep.git
cd ai-prep
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create your `.env` file (see [Environment Variables](#-environment-variables) below).

```bash
npm run dev
# Server runs on http://localhost:3000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/aiprep
JWT_SECRET=your_super_secret_jwt_key_here
Gemini_api_key=your_google_gemini_api_key_here
```

> ⚠️ **Never commit your `.env` file to GitHub.** It is already added to `.gitignore`.

### How to get each key:

| Variable | Where to get it |
|---|---|
| `MONGO_URI` | [MongoDB Atlas](https://cloud.mongodb.com) → Create cluster → Connect |
| `JWT_SECRET` | Any random long string (use a password generator) |
| `Gemini_api_key` | [Google AI Studio](https://aistudio.google.com/app/apikey) → Create API Key |

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login and get token cookie | ❌ |
| GET | `/api/auth/logout` | Logout and clear cookie | ✅ |
| GET | `/api/auth/getme` | Get logged-in user info | ✅ |

### Interview Routes — `/api/interview`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/interview/` | Generate AI interview report | ✅ |
| GET | `/api/interview/` | Get all reports for user | ✅ |
| GET | `/api/interview/report/:id` | Get single report by ID | ✅ |
| POST | `/api/interview/resume/pdf/:id` | Download AI resume as PDF | ✅ |

### Request Body — Generate Report

```json
{
  "jobDescription": "We are looking for a MERN Stack Developer...",
  "selfDescription": "I am a full-stack developer with 1 year experience..."
}
```

Also send `resume` as `multipart/form-data` (PDF file, max 3MB).

### Response — Generate Report

```json
{
  "message": "Interview report generated successfully.",
  "interviewReport": {
    "_id": "...",
    "title": "Junior MERN Stack Developer",
    "matchScore": 87,
    "technicalQuestion": [
      {
        "question": "Explain JWT authentication flow",
        "intention": "Test security knowledge",
        "answer": "JWT works by..."
      }
    ],
    "behavioralQuestion": [...],
    "skillGap": [
      { "skill": "Redux", "severity": "medium" }
    ],
    "preparationPlan": [
      {
        "day": 1,
        "focus": "JavaScript Fundamentals",
        "tasks": ["Revise closures", "Practice async/await"]
      }
    ],
    "createdAt": "2026-05-07T06:18:11.013Z"
  }
}
```

---

## ⚙️ How It Works

```
User uploads Resume (PDF) + Job Description + Self Description
                        ↓
         Multer receives the file upload
                        ↓
         pdf-parse extracts text from PDF
                        ↓
     Google Gemini AI analyzes all three inputs
                        ↓
         AI returns structured JSON report:
         • Match Score
         • Technical Questions (5+)
         • Behavioral Questions (3+)  
         • Skill Gaps with severity
         • 7-Day Preparation Plan
                        ↓
         Report saved to MongoDB
                        ↓
     User can also download ATS-friendly Resume PDF
     (AI generates HTML → Puppeteer converts to PDF)
```

---

## 🔒 Security

- Passwords hashed with **bcrypt** (salt rounds: 10)
- JWT stored in **HTTP-only cookies** (prevents XSS)
- `secure: true` flag on cookies in production
- `sameSite: strict` to prevent CSRF
- API keys stored in `.env` — never exposed to frontend
- File size limited to **3MB** via Multer

---

## 🌐 Deployment

| Service | Purpose | Free Tier |
|---|---|---|
| [MongoDB Atlas](https://cloud.mongodb.com) | Database hosting | ✅ 512MB free |
| [Render](https://render.com) | Backend hosting | ✅ Free tier |
| [Vercel](https://vercel.com) | Frontend hosting | ✅ Free tier |

### Deploy Backend to Render
1. Push backend code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`
6. Add all environment variables from `.env`

### Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) → Import project
2. Connect your GitHub repo (frontend folder)
3. Add environment variable: `VITE_API_URL=https://your-backend.render.com`
4. Deploy!

---

## 📜 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

**MD Ashiq Ilahi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/yourprofile)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yourusername)
[![Portfolio](https://img.shields.io/badge/Portfolio-7F77DD?style=for-the-badge&logo=google-chrome&logoColor=white)](https://yourportfolio.com)

---

<div align="center">
  <p>Built with ❤️ using MERN Stack + Google Gemini AI</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
