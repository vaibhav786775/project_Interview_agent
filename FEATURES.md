# 🚀 Features Specification & Deep Dive

This document provides a comprehensive, component-by-component breakdown of all features and capabilities within the **AI Interview Agent & Career Acceleration Platform**.

---

## 📑 Table of Contents

1. [AI Mock Interview Simulator](#1-ai-mock-interview-simulator)
   - [Step 1: Setup & Customization](#step-1-setup--customization)
   - [Step 2: Live Interview Interface](#step-2-live-interview-interface)
   - [Step 3: Multi-Agent Evaluation & Rubric](#step-3-multi-agent-evaluation--rubric)
   - [Step 4: Comprehensive Scorecard & Analytics](#step-4-comprehensive-scorecard--analytics)
2. [AI Resume Scorer & ATS Gap Analyzer](#2-ai-resume-scorer--ats-gap-analyzer)
3. [Interactive ATS Resume Builder](#3-interactive-ats-resume-builder)
4. [AI Career Roadmap Generator](#4-ai-career-roadmap-generator)
5. [Credit Coin Economy & Razorpay Billing](#5-credit-coin-economy--razorpay-billing)
6. [Interactive User Dashboard & Visual Analytics](#6-interactive-user-dashboard--visual-analytics)
7. [API Gateway & Microservices Infrastructure](#7-api-gateway--microservices-infrastructure)

---

## 1. AI Mock Interview Simulator

The platform's flagship feature is an intelligent, multi-turn AI interview simulator powered by **LangGraph** and high-speed **Groq (LLaMA 3)** inference.

```
[Start Interview Request] 
           │
           ▼
   ┌───────────────┐
   │ interviewNode │ ──> Generates tailored questions (Role, Resume, Difficulty)
   └───────────────┘
           │
           ▼ [User Submits Answer via Voice/Code]
   ┌───────────────┐
   │ feedbackNode  │ ──> Evaluates 8 competency metrics & generates targeted feedback
   └───────────────┘
           │
           ├── If more questions ──> [Next Question in interviewNode]
           │
           ▼ If completed
   ┌───────────────┐
   │  summaryNode  │ ──> Aggregates overall score, strengths, weaknesses & summary
   └───────────────┘
```

### Step 1: Setup & Customization
- **Role Selection**: Customize interview for any technical or non-technical role (e.g., *Frontend Developer*, *Backend Engineer*, *DevOps Specialist*, *System Architect*, *Product Manager*).
- **Interview Mode**:
  - **Technical Interview**: Focuses on algorithms, system architecture, data structures, live coding problems, and syntax explanations.
  - **HR / Behavioral Interview**: Focuses on situational leadership, conflict resolution, STAR methodology questions, and team collaboration.
- **Difficulty Settings**: Choose between **Easy**, **Medium**, and **Hard** question pools.
- **Resume-Grounded Context (`useResume`)**:
  - When enabled, the AI loads the candidate's parsed resume from the Resume Service.
  - Generates deep-dive questions based on past projects, technical stack, and listed experience.
- **Coin Validation**: Transparent coin deduction check before starting an interview session.

### Step 2: Live Interview Interface
- **Dual Response Modes**:
  - **Speech-to-Text (Voice Recognition)**: Live browser Web Speech API integration allows candidates to speak naturally as in a real call.
  - **Text Input**: Manual text response box with real-time character count.
- **Monaco Code Playground**:
  - Embedded industry-standard VS Code-powered Monaco Editor.
  - Syntax highlighting, auto-indentation, and multi-language support for live coding challenges.
- **Dynamic Countdown Timer**:
  - Configurable countdown timer per question to simulate time-pressured environments.
  - Auto-submits answer or warns candidate when time expires.
- **State Progression**:
  - Displays current question index (e.g., `Question 2 of 5`) and live completion percentage.

### Step 3: Multi-Agent Evaluation & Rubric
Every submitted answer is processed through an automated evaluation node scoring eight core competencies on a 0–100 scale:

| Metric | Focus Area | Description |
|---|---|---|
| **Correctness** | Accuracy | Validates technical accuracy, mathematical correctness, or behavioral validity. |
| **Clarity** | Expression | Checks whether the explanation is articulated simply without excessive jargon. |
| **Relevance** | Directness | Assesses whether the candidate answered the exact question asked without wandering. |
| **Detail** | Depth | Evaluates whether concrete examples, metrics, and implementations were provided. |
| **Efficiency** | Optimization | Focuses on optimal runtime/space complexity or efficient operational methods. |
| **Communication** | Structure | Checks coherent thought structure (e.g., STAR framework or step-by-step logic). |
| **Problem Solving**| Adaptability | Evaluates trade-off analysis, edge-case identification, and debugging acumen. |
| **Creativity** | Innovation | Measures out-of-the-box approaches, system resilience, and alternative perspectives. |

### Step 4: Comprehensive Scorecard & Analytics
- **Overall Aggregated Score**: 0–100 overall readiness index.
- **Radar Competency Chart**: Built with **Recharts**, visualizing candidate strengths across all 8 dimensions.
- **Strengths & Weaknesses**: AI-generated bullet points highlighting exceptional performance areas and blind spots.
- **Actionable Recommendations**: Clear, prioritized recommendations for interview improvement.
- **Complete Transcript Review**: Expandable accordion detailing each question, candidate answer, metric scores, and personalized critique.

---

## 2. AI Resume Scorer & ATS Gap Analyzer

The Resume Scorer assists candidates in navigating applicant tracking systems (ATS) before submitting resumes to recruiters.

- **Drag-and-Drop PDF Upload**: Instant file parsing using `multer` and `pdf-parse`.
- **ATS Compatibility Score**: Calculated 0–100 score analyzing keyword density, structure, readability, and content relevance.
- **Automated Profile Extraction**:
  - Personal Information (Name, Email, Phone)
  - Education history
  - Technical skills catalog
  - Work experience and responsibilities
  - Completed projects and technologies
- **Skill Gap & Vulnerability Analysis**:
  - **Strengths**: What stands out positively to hiring managers.
  - **Weaknesses**: Vague bullet points, missing metrics, or formatting risks.
  - **Missing In-Demand Skills**: Identifies critical industry skills missing from the candidate's profile.
- **Targeted Role Matching**: Recommends best-fit job roles based on skills identified in the document.

---

## 3. Interactive ATS Resume Builder

An in-browser resume creation studio engineered to generate ATS-safe resumes without formatting glitches.

- **Auto-Sync with Scorer**: Pre-populates form fields using data extracted from the candidate's scanned resume.
- **Modular Form Sections**:
  - Personal & Contact details
  - Professional summary / Objective
  - Work Experience entries with dynamic Add/Remove controls
  - Education history
  - Projects with live links and tech stacks
  - Categorized Technical and Soft skills
- **Live Reactive Preview**: Side-by-side real-time rendering using standard ATS typography and single-column formatting.
- **One-Click PDF Export**: Uses `react-to-print` to generate vector-grade, print-ready PDF files directly from the browser without third-party watermarks.

---

## 4. AI Career Roadmap Generator

A personalized career mentor that converts career targets into actionable weekly learning milestones.

- **Target Package Input**: Define desired compensation (e.g. `12 LPA`, `25 LPA`, `$140k`).
- **Experience Baseline**: Tailors the path for `Beginner`, `Intermediate`, or `Advanced` levels.
- **Timeline Configuration**: Configurable target duration (e.g. 1 month, 3 months, 6 months).
- **Curated Milestones**:
  - Step-by-step sequential learning modules.
  - Module difficulty rating (`Easy`, `Medium`, `Hard`) and estimated completion time.
  - Concrete curriculum topics and project milestones.
- **Integrated Learning Resources**:
  - Auto-curated video lectures (via YouTube Data API integration).
  - Recommended technical articles, official documentation, and reference links.
- **Progress Tracking & History**: All generated roadmaps are stored in MongoDB and accessible from the user's dashboard.

---

## 5. Credit Coin Economy & Razorpay Billing

To support high-performance LLM compute and prevent spam, the platform implements a tokenized coin credit system.

- **150 Starter Coins**: Every new user automatically receives 150 coins upon their initial Firebase registration.
- **Pay-as-you-go Usage**:
  - Mock interviews deduct a transparent coin fee per session.
  - Safe verification on the backend prevents starting an interview without sufficient coins.
- **Flexible Coin Recharge Packages**:
  - Multiple tier packages (e.g., Starter, Pro, Enterprise Bundles) displayed via responsive `PricingCard` components.
- **Razorpay Checkout Integration**:
  - Server-side order creation (`/api/billing/create`).
  - Native Razorpay popup modal checkout with UPI, Cards, NetBanking, and Wallets.
  - **HMAC-SHA256 Cryptographic Verification** (`/api/billing/verify`) to ensure payment authenticity before crediting coins.

---

## 6. Interactive User Dashboard & Visual Analytics

A central command hub unifying all career preparation tools:

- **Metric Cards (`Statbox`)**:
  - Total Interviews Completed
  - Average Performance Score
  - Available Interview Coins Balance
- **Performance Radar**:
  - Real-time aggregated radar chart illustrating competency distribution across all past interviews.
- **Past Interviews History**:
  - Chronological list of completed mock interviews with dates, target roles, and scores.
  - One-click navigation to inspect historical scorecards and question breakdowns.
- **Quick Action Launchers**:
  - Instant navigation to Resume Scorer, Resume Builder, New Interview, or Roadmap Generator.
- **Dark-Mode Glassmorphism Design**:
  - Built with Tailwind CSS 4, smooth gradients, subtle border glows, and Framer Motion transitions.

---

## 7. API Gateway & Microservices Infrastructure

- **Zero-Trust Reverse Proxy**: Single public entry point (`localhost:6000`) protecting internal microservices.
- **Distributed Session Cache**: Uses Redis key-value storage (`session:<id>`) with expiration to maintain state across independent services.
- **Header Injection (`x-user-id`)**: The Gateway decodes the user session and forwards the authenticated `x-user-id` in internal headers to downstream services.
- **Container-Ready**: Includes `docker-compose.yml` for Redis and container support across services.
