# 🤖 AI Interview Agent & Career Acceleration Platform

An enterprise-grade, microservices-based AI career preparation platform. It empowers candidates with **adaptive AI mock interviews** (voice & Monaco code editor), **ATS resume scoring & parsing**, an **interactive ATS-compliant resume builder**, **personalized career roadmaps** with curated resources, and a **coin-based billing economy**.

---

## 🌟 Quick Links

- [Features Specification (FEATURES.md)](./FEATURES.md)
- [Architecture & Design](#-system-architecture)
- [Microservices Overview](#-microservices-breakdown)
- [Environment Configuration](#-environment-configuration)
- [Installation & Local Setup](#-installation--quickstart)
- [API Reference](#-api-reference)
- [Security Notice](#-security--credentials-policy)

---

## 🏗️ System Architecture

The platform is designed around an event-ready **Microservices Architecture** with a central **API Gateway**, distributed session management via **Redis**, database persistence via **MongoDB**, identity management via **Firebase Auth**, and fast LLM inference powered by **Groq (LLaMA 3)** orchestrated via **LangGraph**.

```
                           +------------------------+
                           |  React 19 + Vite + CSS |
                           |    (Port 5173)         |
                           +-----------+------------+
                                       |
                                       | HTTP / Cookies
                                       v
                           +------------------------+
                           |      API Gateway       |
                           |      (Port 6000)       |
                           +-----------+------------+
                                       |
              +------------------------+------------------------+
              |                        |                        |
              v                        v                        v
       [Redis Session]         [Bearer / x-user-id]      [CORS & Proxy]
              |                        |
    +---------+----------+-------------+------------+-----------------+
    |                    |                          |                 |
    v                    v                          v                 v
+------------+   +---------------+          +---------------+  +---------------+
|    Auth    |   |   Interview   |          |    Resume     |  |    Roadmap    |
|  Service   |   |    Service    |          |    Service    |  |    Service    |
| (Port 6001)|   |  (Port 6003)  |          |  (Port 6002)  |  |  (Port 6004)  |
+-----+------+   +-------+-------+          +-------+-------+  +-------+-------+
      |                  |                          |                  |
      |                  | LangGraph                | Multer + PDF     | LangGraph
      | Firebase Admin   | StateGraph               | Parsing          | Resource Agent
      v                  v                          v                  v
 [MongoDB Auth]   [Groq AI / Mongo]          [Groq AI / Mongo]  [Groq AI / Mongo]
                                                            \
                                                             +-> [Billing Service]
                                                                 (Port 6005 - Razorpay)
```

---

## 🧩 Microservices Breakdown

| Service | Port | Primary Tech | Role & Responsibilities |
|---|---|---|---|
| **API Gateway** | `6000` | Express, `express-http-proxy`, Redis | Central entry point, validates Redis sessions, decorates requests with `x-user-id`, routes to services. |
| **Auth Service** | `6001` | Express, Firebase Admin, Redis, Mongoose | Firebase token verification, user registration, 150 starter coins balance, session creation. |
| **Resume Service** | `6002` | Express, Multer, `pdf-parse`, Groq, LangChain | PDF resume upload, text extraction, ATS scoring (0-100), skills gap analysis, suggested roles. |
| **Interview Service**| `6003` | Express, LangGraph, Groq, Mongoose | Multi-agent state machine (`interviewAgent`, `feedbackAgent`, `summaryAgent`), rubric scoring. |
| **Roadmap Service** | `6004` | Express, LangGraph, Groq, YouTube API | Career trajectory planner, milestones based on target salary, duration, and curated study materials. |
| **Billing Service** | `6005` | Express, Razorpay SDK, Crypto HMAC | Coin packs checkout, webhook/order verification, auto-credits coins to Auth service. |
| **Frontend** | `5173` | React 19, Vite, Tailwind CSS 4, Recharts, Monaco | Interactive UI, voice transcription, code playground, radar charts, PDF export. |

---

## 🛠️ Tech Stack & Dependencies

### Frontend
- **Framework**: [React 19](https://react.dev/), [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion (Framer Motion)](https://motion.dev/)
- **Code Playground**: [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react)
- **Data Visualization**: [Recharts](https://recharts.org/) (Radar & Performance charts)
- **PDF Generation**: [react-to-print](https://github.com/gregnb/react-to-print)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Icons & Progress**: `react-icons`, `react-circular-progressbar`

### Backend & AI Infrastructure
- **Agent Orchestration**: [@langchain/langgraph](https://langchain-ai.github.io/langgraphjs/), [@langchain/core](https://js.langchain.com/)
- **LLM Engine**: [@langchain/groq](https://groq.com/) (LLaMA-3 ultra-fast inference)
- **Cache & Sessions**: [ioredis](https://github.com/redis/ioredis) (Redis 7)
- **Databases**: [MongoDB](https://www.mongodb.com/) via Mongoose 9
- **Authentication**: Firebase Client SDK + Firebase Admin SDK
- **Payment Processing**: [Razorpay](https://razorpay.com/) SDK
- **PDF Extraction**: [pdf-parse](https://www.npmjs.com/package/pdf-parse), [Multer](https://github.com/expressjs/multer)

---

## 📁 Repository Directory Structure

```plaintext
project_Interview_agent/
├── .gitignore                          # Global repository gitignore
├── README.md                           # Main architecture & developer guide
├── FEATURES.md                         # Comprehensive feature specification
├── Interview_agent/
│   ├── backend/
│   │   ├── docker-compose.yml          # Redis container orchestration
│   │   ├── package.json                # Concurrently dev runner
│   │   ├── gateway/                    # Central API Gateway (Port 6000)
│   │   │   ├── controllers/
│   │   │   ├── middleware/             # isAuth Redis session validator
│   │   │   ├── utils/                  # proxyWithHeaders (x-user-id injector)
│   │   │   └── index.js
│   │   ├── shared/
│   │   │   └── redis/                  # Shared Redis connection client
│   │   └── services/
│   │       ├── auth/                   # Auth Service (Port 6001)
│   │       ├── resume/                 # Resume Analyzer (Port 6002)
│   │       ├── interview/              # LangGraph Interview Agent (Port 6003)
│   │       ├── roadmap/                # Career Roadmap Generator (Port 6004)
│   │       └── billing/                # Razorpay Billing Service (Port 6005)
│   └── frontend/                       # React 19 Client (Port 5173)
│       ├── src/
│       │   ├── apis/                   # Axios client endpoints
│       │   ├── components/             # Reusable UI, Monaco, Radar, Modals
│       │   ├── pages/                  # Dashboard, Scorer, Interview, Roadmap, Billing
│       │   ├── redux/                  # Redux slices
│       │   └── App.jsx                 # Client routes
```

---

## ⚙️ Environment Configuration

Each microservice requires its own `.env` file. Ready-to-use `.env.example` templates are provided in each directory.

### 1. API Gateway (`Interview_agent/backend/gateway/.env`)
```ini
PORT=6000
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:5173

AUTH_SERVICE_URL=http://localhost:6001
RESUME_SERVICE_URL=http://localhost:6002
INTERVIEW_SERVICE_URL=http://localhost:6003
ROADMAP_SERVICE_URL=http://localhost:6004
BILLING_SERVICE_URL=http://localhost:6005
```

### 2. Auth Service (`Interview_agent/backend/services/auth/.env`)
```ini
PORT=6001
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/auth_db?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379
```
> **Firebase Setup**: Place your Firebase Admin private key as `serviceAccountKey.json` inside `Interview_agent/backend/services/auth/`. (This file is ignored by Git).

### 3. Interview Service (`Interview_agent/backend/services/interview/.env`)
```ini
PORT=6003
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/interview_db?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 4. Resume Service (`Interview_agent/backend/services/resume/.env`)
```ini
PORT=6002
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/resume_db?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### 5. Roadmap Service (`Interview_agent/backend/services/roadmap/.env`)
```ini
PORT=6004
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/roadmap_db?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379
GROQ_API_KEY=gsk_your_groq_api_key_here
YOUTUBE_API_KEY=AIzaSy_your_youtube_data_api_v3_key
```

### 6. Billing Service (`Interview_agent/backend/services/billing/.env`)
```ini
PORT=6005
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/billing_db?retryWrites=true&w=majority
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
AUTH_SERVICE_URL=http://localhost:6001
```

### 7. Frontend (`Interview_agent/frontend/.env`)
```ini
VITE_FIREBASE_APIKEY=AIzaSy_your_firebase_web_api_key
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id
VITE_BACKEND_URL=http://localhost:6000
```

---

## 🚀 Installation & Quickstart

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Docker**: For running Redis (or a local Redis server)
- **MongoDB**: MongoDB Atlas URI or local MongoDB
- **Groq API Key**: Free tier from [console.groq.com](https://console.groq.com/)
- **Firebase Project**: Web App API key + Admin SDK private key JSON

---

### Step 1: Start Redis
Using the bundled Docker Compose:
```bash
cd Interview_agent/backend
docker compose up -d
```
Or with standalone Docker:
```bash
docker run -d --name redis-interview -p 6379:6379 redis:alpine
```

---

### Step 2: Install Dependencies

#### Install Backend & Service Dependencies:
```bash
# In Interview_agent/backend
cd Interview_agent/backend
npm install

# Install dependencies for gateway and each service:
npm install --prefix gateway
npm install --prefix services/auth
npm install --prefix services/interview
npm install --prefix services/resume
npm install --prefix services/roadmap
npm install --prefix services/billing
```

#### Install Frontend Dependencies:
```bash
cd ../frontend
npm install
```

---

### Step 3: Run the Application

#### Option A: Run Backend Services Concurrently
From `Interview_agent/backend`:
```bash
npm run dev
```
*This launches Gateway, Auth, Billing, Interview, Resume, and Roadmap services in parallel with color-coded logs.*

#### Option B: Run Frontend
From `Interview_agent/frontend`:
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📡 API Reference

All requests from the client go to `http://localhost:6000` (API Gateway) with the cookie `session=<token>`.

### Authentication (`/api/auth`)
- `POST /api/auth/login` - Verify Firebase token, create user, return session cookie.
- `GET /api/auth/logout` - Invalidate session in Redis, clear cookie.
- `GET /api/me` - Retrieve authenticated user profile, coin balance, and metadata.
- `POST /api/auth/use-coins` - Deduct coins for starting an interview session.
- `POST /api/auth/add-coins` - Internal credit callback after verified payment.

### Mock Interview (`/api/interview`)
- `POST /api/interview/start` - Initiate interview with role, type (`hr` / `technical`), difficulty, and optional resume context.
- `POST /api/interview/answer` - Submit user's answer; evaluates response and generates the next adaptive question.
- `GET /api/interview/all` - List all past interview sessions for the user.
- `GET /api/interview/:id` - Fetch detailed report, scores, radar metrics, and transcripts.

### Resume Analyzer (`/api/resume`)
- `POST /api/resume/upload` - Upload PDF resume; extracts text and returns complete ATS analysis and score.
- `GET /api/resume/get-resume` - Retrieve saved resume analysis and profile breakdown.

### Career Roadmap (`/api/roadmap`)
- `POST /api/roadmap/generate` - Generate tailored milestones based on target package, duration, and experience level.
- `GET /api/roadmap/all` - List user's saved roadmaps.
- `GET /api/roadmap/:id` - Fetch detailed module breakdown and resources.

### Billing & Coins (`/api/billing`)
- `POST /api/billing/create` - Create Razorpay order for coin bundles.
- `POST /api/billing/verify` - Verify Razorpay signature and trigger coin credit.

---

## 🔒 Security & Credentials Policy

1. **No Credentials in Version Control**:
   - `serviceAccountKey.json`, `*.env`, `*.pem`, `*.key`, and all secret files are strictly listed in all `.gitignore` files.
   - Sample configuration files are maintained as `.env.example`.
2. **Session Security**:
   - Sessions are isolated in Redis using randomized UUIDs and transmitted via `HttpOnly` cookies.
   - Gateway acts as a zero-trust boundary, attaching `x-user-id` only to validated requests.
3. **If You Fork/Clone This Repository**:
   - Never commit your actual `serviceAccountKey.json` or `.env` files.
   - Always verify git status using `git status` and `git check-ignore` before pushing changes.

---

## 📄 License & Credits

This project is open-source under the ISC License. Created for modern developers preparing for high-impact technical and behavioral interviews.
