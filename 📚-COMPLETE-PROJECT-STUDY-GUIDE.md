# 📚 **SERENMIND MENTAL WELLNESS - COMPLETE STUDY GUIDE**

## **Developer: Kalpak Shrikrushna Manwar**
📧 kalpakm11@gmail.com | 📱 +91-8767309198

---

## 📖 **TABLE OF CONTENTS**

1. [What is SerenMind?](#what-is-serenmind)
2. [Project Purpose & Vision](#project-purpose--vision)
3. [Complete Feature List](#complete-feature-list)
4. [Technical Architecture](#technical-architecture)
5. [Database Design Deep Dive](#database-design-deep-dive)
6. [Backend API Reference](#backend-api-reference)
7. [Frontend Component Structure](#frontend-component-structure)
8. [Authentication Flow Explained](#authentication-flow-explained)
9. [Key Algorithms & Logic](#key-algorithms--logic)
10. [How Each Feature Works](#how-each-feature-works)
11. [Code Organization](#code-organization)
12. [Interview Preparation](#interview-preparation)

---

## 🌟 **WHAT IS SERENMIND?**

**SerenMind** is a **comprehensive mental wellness application** designed to help users:
- Track their daily mood and mental state
- Journal their thoughts and feelings
- Get AI-powered wellness insights
- Access crisis support resources
- Set and track wellness goals
- Generate progress reports

### **Project Overview**

**Name:** SerenMind (Serene + Mind = Peaceful Mind)  
**Type:** Full-Stack Web Application  
**Domain:** Mental Health & Wellness  
**Target Users:** Anyone seeking to improve their mental health  
**Development:** Solo project by Kalpak Manwar  
**Status:** Production-ready with 20+ features  

### **The Problem It Solves**

1. **Mental Health Awareness:** Many people don't track their mental state
2. **Expensive Therapy:** Professional help is costly
3. **24/7 Support Needed:** Crisis can happen anytime
4. **Data-Driven Insights:** Hard to see patterns without tracking
5. **Accountability:** Difficult to stick to wellness goals

### **The Solution SerenMind Provides**

1. ✅ **Easy Mood Tracking** - Quick daily check-ins
2. ✅ **AI Companion** - 24/7 support via OpenAI GPT
3. ✅ **Visual Analytics** - Charts showing mental health trends
4. ✅ **Crisis Support** - Immediate help resources
5. ✅ **Goal Tracking** - Gamified wellness habits
6. ✅ **Privacy First** - Your data stays secure

---

## 🎯 **PROJECT PURPOSE & VISION**

### **Why I Built This**

Mental health is a growing concern worldwide:
- **1 in 4** people experience mental health issues
- Therapy costs **$100-200/session**
- **80%** of people don't track their mental state
- Crisis support should be **immediate and accessible**

### **Vision Statement**

> "To create an accessible, affordable, and intelligent mental wellness companion that helps users understand their mental patterns, receive personalized support, and build healthy habits through technology."

### **Core Values**

1. **Privacy** - User data is encrypted and secure
2. **Accessibility** - Free basic features, easy to use
3. **Evidence-Based** - Uses proven mental health techniques
4. **Intelligent** - AI-powered insights, not generic advice
5. **Empowering** - Helps users take control of their mental health

---

## 🚀 **COMPLETE FEATURE LIST**

### **1. User Authentication 🔐**
- JWT-based secure login/registration
- Password encryption with BCrypt
- Refresh token mechanism
- Session management
- Profile customization

### **2. Mood Tracking 📊**
Track three dimensions:
- **Mood Score** (1-10): Overall feeling
- **Energy Level** (1-10): Physical energy
- **Stress Level** (1-10): Anxiety/tension

**Features:**
- Quick entry form with sliders
- Optional notes for context
- Historical view with color coding
- Trends visualization with Chart.js
- Monthly calendar view

### **3. Smart Journaling 📝**
- Rich text journal entries
- Tags for categorization
- Favorite marking
- Full-text search
- Auto-save functionality
- Edit/delete capabilities
- Timestamp tracking

### **4. AI-Powered Chat 🤖**
- Integration with OpenAI GPT-4
- Context-aware responses (uses your mood/journal data)
- Text-to-speech output
- Conversation history
- Wellness insights and suggestions
- Coping strategies
- Motivational support

### **5. Visual Analytics 📈**
- **Mood Trends Chart:** Line graph showing patterns
- **Energy vs Stress:** Scatter plot analysis
- **Daily Averages:** Bar charts by time period
- **Monthly Calendar:** Day-by-day visual tracking
- **Statistics:** Average mood, best/worst days

### **6. PDF Reports 📄**
Auto-generated wellness reports containing:
- Summary statistics
- Mood trends graph
- Journal entries
- AI insights
- Recommendations
- Professional styling

### **7. Monthly Calendar 📅**
- Grid view of entire month
- Color-coded days by mood
- Click to see day details (popup modal)
- Shows mood, energy, stress
- Displays journal entries for that day
- Navigation between months

### **8. Crisis Mode 🆘**
Emergency support features:
- **Animated Breathing Exercises:**
  - Box breathing (4-4-4-4)
  - 4-7-8 technique
  - Deep breathing
- **Crisis Hotlines** by country
- **Immediate Resources**
- **Calming Techniques**
- Accessible via floating button in header

### **9. Goal Setting & Streaks 🎯**
Gamified wellness habits:
- Create custom goals
- Track progress
- Daily/Weekly/Monthly targets
- Streak counting
- Achievement badges
- Progress bars
- Goal categories (Exercise, Sleep, Meditation, etc.)

### **10. Push Notifications 🔔**
- Daily reminder notifications
- Web Push API integration
- Service Worker implementation
- Customizable notification times
- Toggle on/off preferences

### **11. Wellness Resources 📚**
Educational content:
- **Crisis Support** section
- **Therapy Types** explained (CBT, DBT, EMDR, etc.)
- **Self-Help Techniques**
- **Professional Resources**
- **Articles & Guides**

### **12. Profile Management ⚙️**
- View/edit profile information
- Email preferences
- Password change
- Notification settings
- Account deletion option

---

## 🏗️ **TECHNICAL ARCHITECTURE**

### **System Architecture**

```
┌─────────────────────────────────────────┐
│         Frontend (React 18)             │
│  ┌──────────────────────────────────┐   │
│  │  Components (30+)                │   │
│  │  - Pages (Dashboard, Journal...) │   │
│  │  - Layouts (Header, Footer)      │   │
│  │  - Features (Charts, Calendar)   │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  State Management                │   │
│  │  - Context API (Auth)            │   │
│  │  - Local State (useState)        │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Services                        │   │
│  │  - API Client (Axios)            │   │
│  │  - Notification Service          │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↕ HTTP/HTTPS
┌─────────────────────────────────────────┐
│      Backend (Spring Boot 3)            │
│  ┌──────────────────────────────────┐   │
│  │  Controllers (REST APIs)         │   │
│  │  - AuthController                │   │
│  │  - MoodController                │   │
│  │  - JournalController             │   │
│  │  - AiController                  │   │
│  │  - GoalController                │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Services (Business Logic)       │   │
│  │  - UserService                   │   │
│  │  - MoodService                   │   │
│  │  - JournalService                │   │
│  │  - AiService                     │   │
│  │  - PdfGenerationService          │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Security                        │   │
│  │  - JWT Filter                    │   │
│  │  - Spring Security Config        │   │
│  │  - CORS Configuration            │   │
│  └──────────────────────────────────┘   │
│  ┌──────────────────────────────────┐   │
│  │  Data Layer                      │   │
│  │  - JPA Repositories              │   │
│  │  - Entity Models                 │   │
│  │  - Flyway Migrations             │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↕ JDBC
┌─────────────────────────────────────────┐
│          Database (MySQL 8)             │
│  - users                                │
│  - mood_entries                         │
│  - journal_entries                      │
│  - goals                                │
│  - goal_completions                     │
│  - ai_reports                           │
│  - refresh_tokens                       │
└─────────────────────────────────────────┘

        External Services
        ┌────────────┐
        │ OpenAI API │
        └────────────┘
```

### **Technology Stack Breakdown**

#### **Frontend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI library |
| **TypeScript** | 5.5.3 | Type safety |
| **Vite** | 5.4.6 | Build tool |
| **Tailwind CSS** | 3.4.12 | Styling |
| **Framer Motion** | 11.5.4 | Animations |
| **React Router** | 6.26.0 | Navigation |
| **Axios** | 1.7.7 | HTTP client |
| **Chart.js** | 4.4.4 | Data visualization |
| **React Hot Toast** | 2.4.1 | Notifications |
| **Lucide React** | 0.441.0 | Icons |

#### **Backend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Java** | 17 | Programming language |
| **Spring Boot** | 3.2.0 | Framework |
| **Spring Security** | 6.x | Authentication/Authorization |
| **Spring Data JPA** | 3.x | Database access |
| **MySQL** | 8.0 | Database |
| **Flyway** | 9.x | Database migrations |
| **JWT (jjwt)** | 0.12.3 | Token generation |
| **BCrypt** | Built-in | Password hashing |
| **OpenPDF** | 1.3.x | PDF generation |
| **Lombok** | 1.18.x | Boilerplate reduction |

#### **DevOps & Tools**

- **Maven** - Dependency management
- **npm** - Package management
- **Git** - Version control
- **Docker** - Containerization
- **Postman** - API testing

---

## 💾 **DATABASE DESIGN DEEP DIVE**

### **Entity-Relationship Diagram**

```
┌─────────────────┐
│     users       │
│─────────────────│
│ id (PK)         │───┐
│ email           │   │
│ password_hash   │   │
│ full_name       │   │
│ created_at      │   │
└─────────────────┘   │
                      │ (1:Many)
                      │
    ┌─────────────────┼─────────────────┬──────────────────┐
    │                 │                 │                  │
    ↓                 ↓                 ↓                  ↓
┌─────────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐
│mood_entries │  │journal_entries│  │  goals     │  │ai_reports│
│─────────────│  │──────────────│  │────────────│  │──────────│
│id (PK)      │  │id (PK)       │  │id (PK)     │  │id (PK)   │
│user_id (FK) │  │user_id (FK)  │  │user_id (FK)│  │user_id   │
│mood_score   │  │title         │  │title       │  │content   │
│energy_level │  │content       │  │target_count│  │created_at│
│stress_level │  │tags          │  │progress    │  └──────────┘
│notes        │  │is_favorite   │  │streak      │
│timestamp    │  │created_at    │  └────────────┘
└─────────────┘  └──────────────┘       │
                                        │ (1:Many)
                                        ↓
                               ┌──────────────────┐
                               │goal_completions  │
                               │──────────────────│
                               │id (PK)           │
                               │goal_id (FK)      │
                               │completion_date   │
                               └──────────────────┘
```

### **Table Details**

#### **1. users Table**
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

**Purpose:** Store user account information  
**Key Fields:**
- `password_hash`: BCrypt encrypted password (never store plain text!)
- `email`: Unique identifier for login
- `created_at`: Account creation timestamp

#### **2. mood_entries Table**
```sql
CREATE TABLE mood_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    mood_score INT NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
    energy_level INT NOT NULL CHECK (energy_level BETWEEN 1 AND 10),
    stress_level INT NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
    notes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_timestamp (user_id, timestamp)
);
```

**Purpose:** Track daily mood data  
**Key Fields:**
- `mood_score`: 1-10 scale (1=terrible, 10=amazing)
- `energy_level`: Physical energy (1=exhausted, 10=energized)
- `stress_level`: Anxiety level (1=calm, 10=very stressed)
- `notes`: Optional context about the mood
- `timestamp`: When mood was recorded

**Queries Used:**
- Get mood trends for last 30 days
- Calculate average mood by time period
- Find mood patterns by day of week

#### **3. journal_entries Table**
```sql
CREATE TABLE journal_entries (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(500),
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_created (user_id, created_at),
    FULLTEXT INDEX idx_search (title, content)
);
```

**Purpose:** Store user journal entries  
**Key Fields:**
- `title`: Entry headline
- `content`: Full journal text
- `tags`: Comma-separated categories
- `is_favorite`: User can mark important entries
- `created_at` / `updated_at`: Timestamps

**Special Features:**
- FULLTEXT index for search functionality
- CASCADE DELETE ensures journals deleted when user deleted

#### **4. goals Table**
```sql
CREATE TABLE goals (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    target_count INT NOT NULL,
    period VARCHAR(20) NOT NULL,
    current_progress INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_status (user_id, status)
);
```

**Purpose:** Track user wellness goals  
**Key Fields:**
- `type`: EXERCISE, MEDITATION, SLEEP, etc.
- `target_count`: How many times to complete (e.g., 30 days)
- `period`: DAILY, WEEKLY, MONTHLY
- `current_streak`: Consecutive completions
- `status`: ACTIVE, COMPLETED, ABANDONED

#### **5. goal_completions Table**
```sql
CREATE TABLE goal_completions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    goal_id BIGINT NOT NULL,
    completion_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE,
    UNIQUE KEY unique_goal_date (goal_id, completion_date),
    INDEX idx_goal_date (goal_id, completion_date)
);
```

**Purpose:** Track when goals were completed  
**Why Separate Table:** Allows tracking multiple completions per goal  
**Unique Constraint:** Prevents duplicate completions on same day

#### **6. ai_reports Table**
```sql
CREATE TABLE ai_reports (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_created (user_id, created_at)
);
```

**Purpose:** Store AI-generated wellness reports  
**Types:** WEEKLY, MONTHLY, CUSTOM

#### **7. refresh_tokens Table**
```sql
CREATE TABLE refresh_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_token (token)
);
```

**Purpose:** Manage JWT refresh tokens  
**Security:** Tokens expire after 24 hours

---

## 🔌 **BACKEND API REFERENCE**

### **Authentication APIs**

#### **POST /api/auth/register**
Register new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

**Status Codes:**
- `200`: Success
- `400`: Email already exists or validation error

#### **POST /api/auth/login**
Login and get JWT tokens

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "dGVzdC1yZWZyZXNoLXRva2Vu...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

**Tokens:**
- Access Token: Valid for 15 minutes
- Refresh Token: Valid for 24 hours

#### **POST /api/auth/refresh**
Get new access token using refresh token

**Request Body:**
```json
{
  "refreshToken": "dGVzdC1yZWZyZXNoLXRva2Vu..."
}
```

---

### **Mood Tracking APIs**

#### **POST /api/moods**
Create new mood entry

**Headers:** `Authorization: Bearer {accessToken}`

**Request Body:**
```json
{
  "moodScore": 8,
  "energyLevel": 7,
  "stressLevel": 3,
  "notes": "Feeling great after morning exercise"
}
```

**Response:**
```json
{
  "id": 123,
  "moodScore": 8,
  "energyLevel": 7,
  "stressLevel": 3,
  "notes": "Feeling great after morning exercise",
  "timestamp": "2025-10-30T10:30:00"
}
```

#### **GET /api/moods**
Get all mood entries for logged-in user

**Query Parameters:**
- `startDate`: Filter from date (YYYY-MM-DD)
- `endDate`: Filter to date (YYYY-MM-DD)
- `limit`: Number of results (default: 100)

**Response:**
```json
[
  {
    "id": 123,
    "moodScore": 8,
    "energyLevel": 7,
    "stressLevel": 3,
    "notes": "Feeling great",
    "timestamp": "2025-10-30T10:30:00"
  },
  ...
]
```

#### **GET /api/moods/trends**
Get mood statistics and trends

**Response:**
```json
{
  "averageMood": 7.5,
  "averageEnergy": 6.8,
  "averageStress": 4.2,
  "totalEntries": 45,
  "trends": [
    {
      "date": "2025-10-01",
      "avgMood": 7.0,
      "avgEnergy": 6.5,
      "avgStress": 5.0
    },
    ...
  ]
}
```

---

### **Journal APIs**

#### **POST /api/journals**
Create new journal entry

**Request Body:**
```json
{
  "title": "Reflection on Today",
  "content": "Today was a productive day. I completed all my tasks and felt accomplished.",
  "tags": "productivity,gratitude"
}
```

**Response:**
```json
{
  "id": 456,
  "title": "Reflection on Today",
  "content": "Today was a productive day...",
  "tags": "productivity,gratitude",
  "isFavorite": false,
  "createdAt": "2025-10-30T20:00:00"
}
```

#### **GET /api/journals**
Get all journal entries

**Query Parameters:**
- `search`: Search in title and content
- `tag`: Filter by tag
- `favorite`: true/false to filter favorites

#### **PUT /api/journals/{id}**
Update journal entry

#### **DELETE /api/journals/{id}**
Delete journal entry

#### **PUT /api/journals/{id}/favorite**
Toggle favorite status

---

### **AI Chat APIs**

#### **POST /api/ai/chat**
Send message to AI and get response

**Request Body:**
```json
{
  "message": "I'm feeling anxious today. Can you help?"
}
```

**Response:**
```json
{
  "reply": "I understand you're feeling anxious. Let's try a breathing exercise together...",
  "suggestions": [
    "Try the 4-7-8 breathing technique",
    "Journal about your feelings",
    "Go for a short walk"
  ]
}
```

**How It Works:**
1. Backend receives user message
2. Fetches recent mood entries and journals for context
3. Builds prompt for OpenAI GPT
4. Sends request to OpenAI API
5. Formats response as structured JSON
6. Returns to frontend

---

### **Goal APIs**

#### **POST /api/goals**
Create new wellness goal

**Request Body:**
```json
{
  "title": "Daily Meditation",
  "description": "Meditate for 10 minutes every day",
  "type": "MEDITATION",
  "targetCount": 30,
  "period": "DAILY"
}
```

#### **GET /api/goals**
Get all goals for user

**Query Parameters:**
- `status`: ACTIVE, COMPLETED, ABANDONED

#### **POST /api/goals/{id}/complete**
Mark goal as completed for today

**Response Updates:**
- Increments `current_progress`
- Updates `current_streak` if consecutive
- Updates `longest_streak` if record broken

#### **GET /api/goals/{id}/progress**
Get detailed progress for goal

---

### **Report APIs**

#### **POST /api/reports/generate**
Generate wellness report PDF

**Request Body:**
```json
{
  "reportType": "MONTHLY",
  "startDate": "2025-10-01",
  "endDate": "2025-10-31"
}
```

**Response:**
```json
{
  "reportId": 789,
  "downloadUrl": "/api/reports/789/download"
}
```

#### **GET /api/reports/{id}/download**
Download PDF report

**Response:** Binary PDF file

---

## 🎨 **FRONTEND COMPONENT STRUCTURE**

### **Component Hierarchy**

```
App.tsx
├── AuthProvider (Context)
│   └── Provides: user, login(), logout(), isAuthenticated
│
├── Header
│   ├── Logo
│   ├── Navigation Links
│   │   ├── Dashboard
│   │   ├── Journal
│   │   ├── AI Chat
│   │   ├── Reports
│   │   ├── Goals
│   │   └── Resources
│   ├── User Menu
│   └── Crisis Button (floating)
│
├── Routes
│   ├── Public Routes
│   │   ├── Landing Page
│   │   ├── Login/Register
│   │   ├── About
│   │   └── Resources
│   │
│   └── Protected Routes (require authentication)
│       ├── Dashboard
│       │   ├── QuickStats
│       │   ├── RecentMoods
│       │   ├── MoodChart
│       │   └── ActiveGoals
│       │
│       ├── Journal Page
│       │   ├── JournalList
│       │   ├── JournalEntry
│       │   ├── SearchBar
│       │   └── TagFilter
│       │
│       ├── Chat Page
│       │   ├── MessageList
│       │   ├── MessageInput
│       │   ├── VoiceToggle
│       │   └── SuggestionChips
│       │
│       ├── Reports Page
│       │   ├── MonthlyCalendar
│       │   ├── TrendsChart
│       │   ├── StatisticsCards
│       │   └── PDFGenerator
│       │
│       ├── Goals Page
│       │   ├── GoalList
│       │   ├── CreateGoalForm
│       │   ├── ProgressBar
│       │   └── StreakDisplay
│       │
│       ├── Crisis Page
│       │   ├── BreathingExercise
│       │   ├── CrisisHotlines
│       │   └── CalmingTechniques
│       │
│       └── Profile Page
│           ├── UserInfo
│           ├── EmailPreferences
│           ├── NotificationSettings
│           ├── PasswordChange
│           └── DangerZone
│
└── Footer
    ├── About Link
    ├── Contact Info
    └── Copyright
```

### **Key Components Explained**

#### **1. Dashboard Component**
**File:** `frontend/src/pages/Dashboard.tsx`

**Purpose:** Main landing page after login

**What It Does:**
- Displays welcome message with user name
- Shows quick statistics (total moods, journals, average mood)
- Renders mood trends chart (last 30 days)
- Lists recent journal entries
- Shows active goals with progress

**Data Fetching:**
```typescript
useEffect(() => {
  const loadData = async () => {
    const [moods, journals, goals] = await Promise.all([
      moodService.getMoods(),
      journalService.getJournals(),
      goalService.getActiveGoals()
    ]);
    // Process and set state
  };
  loadData();
}, []);
```

#### **2. MoodChart Component**
**File:** `frontend/src/components/dashboard/MoodChart.tsx`

**Purpose:** Visualize mood trends over time

**Uses Chart.js:**
```typescript
import { Line } from 'react-chartjs-2';

const data = {
  labels: dates, // X-axis: dates
  datasets: [
    {
      label: 'Mood',
      data: moodScores, // Y-axis: mood values
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    },
    // ... energy and stress datasets
  ]
};
```

#### **3. MonthlyCalendar Component**
**File:** `frontend/src/components/dashboard/MonthlyCalendar.tsx`

**Purpose:** Visual month view of mood data

**How It Works:**
1. Generate calendar grid (7 columns × 5-6 rows)
2. Loop through each day of the month
3. Find mood entry for that day
4. Color-code based on mood score:
   - Green: High mood (8-10)
   - Yellow: Medium mood (5-7)
   - Red: Low mood (1-4)
   - Gray: No data
5. Click day → Show popup modal with details

**Key Algorithm:**
```typescript
const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
const moodForDay = moods.find(m => {
  const moodDate = new Date(m.timestamp);
  const moodKey = `${moodDate.getFullYear()}-${String(moodDate.getMonth() + 1).padStart(2, '0')}-${String(moodDate.getDate()).padStart(2, '0')}`;
  return moodKey === dateKey;
});
```

**Why This Approach:**
- Avoids timezone bugs with `.toISOString()`
- Compares dates as strings (YYYY-MM-DD)
- Ensures accurate day matching

#### **4. AI Chat Component**
**File:** `frontend/src/pages/Chat.tsx`

**Purpose:** Conversational AI support

**Features:**
- Send text messages
- Receive AI responses
- Text-to-speech output
- Typing indicators
- Suggestion chips

**Implementation:**
```typescript
const sendMessage = async (text: string) => {
  // Add user message to chat
  setChatHistory(prev => [...prev, { role: 'user', content: text }]);
  
  // Show loading
  setIsLoading(true);
  
  // Call backend API
  const response = await aiService.chat(text);
  
  // Add AI response
  setChatHistory(prev => [...prev, { role: 'assistant', content: response.reply }]);
  
  // Speak response if voice enabled
  if (voiceEnabled) {
    speak(response.reply);
  }
};
```

#### **5. Goal Tracking Component**
**File:** `frontend/src/pages/Goals.tsx`

**Purpose:** Manage wellness goals

**Streak Calculation Logic:**
```typescript
const calculateStreak = (completions: Date[]) => {
  // Sort dates in descending order
  const sorted = completions.sort((a, b) => b.getTime() - a.getTime());
  
  let streak = 0;
  let expectedDate = new Date();
  expectedDate.setHours(0, 0, 0, 0);
  
  for (const completion of sorted) {
    const compDate = new Date(completion);
    compDate.setHours(0, 0, 0, 0);
    
    if (compDate.getTime() === expectedDate.getTime()) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1); // Check previous day
    } else {
      break; // Streak broken
    }
  }
  
  return streak;
};
```

---

## 🔐 **AUTHENTICATION FLOW EXPLAINED**

### **Complete Flow Diagram**

```
┌────────────────────────────────────────────────────────────┐
│                   1. USER REGISTERS                        │
│                                                            │
│  Frontend: LoginRegister.tsx                               │
│  └─> POST /api/auth/register                               │
│      Body: { email, password, fullName }                   │
│                                                            │
│  Backend: AuthController.register()                        │
│  ├─> Check if email exists                                 │
│  ├─> Hash password with BCrypt                             │
│  ├─> Save user to database                                 │
│  └─> Return success message                                │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│                    2. USER LOGS IN                         │
│                                                            │
│  Frontend: LoginRegister.tsx                               │
│  └─> POST /api/auth/login                                  │
│      Body: { email, password }                             │
│                                                            │
│  Backend: AuthController.login()                           │
│  ├─> Find user by email                                    │
│  ├─> Verify password with BCrypt                           │
│  ├─> Generate JWT access token (15 min expiry)             │
│  ├─> Generate refresh token (24 hour expiry)               │
│  ├─> Save refresh token to database                        │
│  └─> Return { accessToken, refreshToken, user }            │
│                                                            │
│  Frontend: AuthContext                                     │
│  ├─> Save accessToken to localStorage                      │
│  ├─> Save refreshToken to localStorage                     │
│  ├─> Set user in context state                             │
│  └─> Redirect to /dashboard                                │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│               3. USER MAKES API REQUEST                    │
│                                                            │
│  Frontend: api.ts (Axios interceptor)                      │
│  └─> GET /api/moods                                        │
│      Headers: { Authorization: "Bearer {accessToken}" }    │
│                                                            │
│  Backend: JwtFilter                                        │
│  ├─> Extract token from Authorization header              │
│  ├─> Validate token signature                              │
│  ├─> Check token expiration                                │
│  ├─> Extract email from token claims                       │
│  ├─> Load user details                                     │
│  ├─> Set authentication in SecurityContext                 │
│  └─> Continue to controller                                │
│                                                            │
│  Backend: MoodController.getMoods()                        │
│  ├─> Get user ID from SecurityContext                      │
│  ├─> Query moods for this user                             │
│  └─> Return mood data                                      │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│          4. ACCESS TOKEN EXPIRES (after 15 min)            │
│                                                            │
│  Frontend: api.ts (Axios response interceptor)             │
│  ├─> Receives 401 Unauthorized response                    │
│  ├─> POST /api/auth/refresh                                │
│  │   Body: { refreshToken }                                │
│  ├─> Receives new accessToken                              │
│  ├─> Save new accessToken to localStorage                  │
│  └─> Retry original request with new token                 │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│                   5. USER LOGS OUT                         │
│                                                            │
│  Frontend: AuthContext.logout()                            │
│  ├─> Clear localStorage (tokens)                           │
│  ├─> Clear context state (user = null)                     │
│  └─> Redirect to /login                                    │
│                                                            │
│  Optional: Backend token invalidation                      │
│  └─> DELETE /api/auth/logout                               │
│      (Delete refresh token from database)                  │
└────────────────────────────────────────────────────────────┘
```

### **JWT Token Structure**

**Access Token Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk4NzY1NDMyLCJleHAiOjE2OTg3NjYzMzJ9.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Decoded Payload:**
```json
{
  "sub": "user@example.com",  // Subject (user email)
  "iat": 1698765432,           // Issued At timestamp
  "exp": 1698766332            // Expiration timestamp
}
```

**How Backend Verifies:**
1. Split token into header, payload, signature
2. Recompute signature using secret key
3. Compare computed signature with provided signature
4. If match → token is valid and not tampered with
5. Check `exp` field to ensure not expired

---

## 🧮 **KEY ALGORITHMS & LOGIC**

### **1. Mood Color Coding**

**Problem:** How to visually represent mood?

**Solution:** Color mapping based on score

```typescript
const getMoodColor = (moodScore: number): string => {
  if (moodScore >= 8) return 'bg-green-100 border-green-300 text-green-800';
  if (moodScore >= 6) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
  if (moodScore >= 4) return 'bg-orange-100 border-orange-300 text-orange-800';
  return 'bg-red-100 border-red-300 text-red-800';
};
```

### **2. Goal Streak Calculation**

**Problem:** How to calculate consecutive goal completions?

**Algorithm:**
```java
public int calculateStreak(List<LocalDate> completions) {
    if (completions.isEmpty()) return 0;
    
    // Sort in reverse order (newest first)
    completions.sort(Comparator.reverseOrder());
    
    int streak = 0;
    LocalDate expectedDate = LocalDate.now();
    
    for (LocalDate completion : completions) {
        if (completion.equals(expectedDate)) {
            streak++;
            expectedDate = expectedDate.minusDays(1);
        } else {
            break; // Streak broken
        }
    }
    
    return streak;
}
```

**Example:**
- Today: Oct 30
- Completions: [Oct 30, Oct 29, Oct 28, Oct 26]
- Result: Streak = 3 (Oct 30, 29, 28)
- Broken on Oct 27 (missing)

### **3. Mood Trend Analysis**

**Problem:** Calculate average mood per week

**Algorithm:**
```java
public Map<String, Double> calculateWeeklyAverages(List<MoodEntry> moods) {
    Map<String, List<Integer>> weeklyScores = new HashMap<>();
    
    for (MoodEntry mood : moods) {
        // Get week key (e.g., "2025-W44")
        String weekKey = getWeekKey(mood.getTimestamp());
        
        // Add score to this week's list
        weeklyScores
            .computeIfAbsent(weekKey, k -> new ArrayList<>())
            .add(mood.getMoodScore());
    }
    
    // Calculate averages
    Map<String, Double> averages = new HashMap<>();
    weeklyScores.forEach((week, scores) -> {
        double avg = scores.stream()
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
        averages.put(week, avg);
    });
    
    return averages;
}
```

### **4. AI Context Building**

**Problem:** Give AI context about user's mental state

**Solution:** Include recent data in prompt

```java
public String buildContextPrompt(User user) {
    // Get recent moods
    List<MoodEntry> recentMoods = moodRepository
        .findByUserIdOrderByTimestampDesc(user.getId())
        .stream()
        .limit(7) // Last 7 days
        .collect(Collectors.toList());
    
    // Get recent journals
    List<JournalEntry> recentJournals = journalRepository
        .findByUserIdOrderByCreatedAtDesc(user.getId())
        .stream()
        .limit(3) // Last 3 entries
        .collect(Collectors.toList());
    
    // Build context string
    StringBuilder context = new StringBuilder();
    context.append("User's recent mood data:\n");
    for (MoodEntry mood : recentMoods) {
        context.append(String.format("- %s: Mood %d/10, Energy %d/10, Stress %d/10\n",
            mood.getTimestamp().toLocalDate(),
            mood.getMoodScore(),
            mood.getEnergyLevel(),
            mood.getStressLevel()
        ));
    }
    
    context.append("\nRecent journal entries:\n");
    for (JournalEntry journal : recentJournals) {
        context.append(String.format("- %s: %s\n",
            journal.getCreatedAt().toLocalDate(),
            journal.getTitle()
        ));
    }
    
    return context.toString();
}
```

### **5. PDF Report Generation**

**Problem:** Create formatted PDF with charts

**Solution:** OpenPDF library

```java
public byte[] generateReport(User user, LocalDate start, LocalDate end) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    Document document = new Document(PageSize.A4);
    PdfWriter writer = PdfWriter.getInstance(document, baos);
    
    document.open();
    
    // Add header
    Font titleFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD);
    Paragraph title = new Paragraph("Wellness Report", titleFont);
    title.setAlignment(Element.ALIGN_CENTER);
    document.add(title);
    
    // Add user info
    document.add(new Paragraph(String.format(
        "Generated for: %s\nPeriod: %s to %s\n\n",
        user.getFullName(), start, end
    )));
    
    // Add statistics
    document.add(new Paragraph("Summary Statistics", new Font(..., 18, Font.BOLD)));
    // ... calculate and add stats
    
    // Add mood chart (as image)
    byte[] chartImage = generateMoodChartImage(moods);
    Image chart = Image.getInstance(chartImage);
    chart.scaleToFit(500, 300);
    document.add(chart);
    
    // Add journal entries
    document.add(new Paragraph("\n\nJournal Entries", new Font(..., 18, Font.BOLD)));
    for (JournalEntry journal : journals) {
        document.add(new Paragraph(journal.getTitle(), new Font(..., 14, Font.BOLD)));
        document.add(new Paragraph(journal.getContent()));
        document.add(new Paragraph("\n"));
    }
    
    // Add footer
    Paragraph footer = new Paragraph(
        "Generated by SerenMind - Created by Kalpak Manwar\n" +
        "kalpakm11@gmail.com | +91-8767309198"
    );
    footer.setAlignment(Element.ALIGN_CENTER);
    document.add(footer);
    
    document.close();
    return baos.toByteArray();
}
```

---

## 🔧 **HOW EACH FEATURE WORKS**

### **Feature 1: Mood Tracking**

**User Flow:**
1. User clicks "Add Mood" on Dashboard
2. Modal opens with 3 sliders (Mood, Energy, Stress)
3. User adjusts sliders (1-10 scale)
4. Optional: Add notes
5. Click "Save"
6. Frontend sends POST request to backend
7. Backend validates data
8. Saves to `mood_entries` table
9. Returns saved mood entry
10. Frontend updates UI and shows success toast

**Backend Code:**
```java
@PostMapping
public ResponseEntity<MoodEntry> createMood(
    @RequestBody MoodRequest request,
    Authentication auth
) {
    Long userId = getUserIdFromAuth(auth);
    
    // Validate scores (1-10)
    if (request.getMoodScore() < 1 || request.getMoodScore() > 10) {
        throw new ValidationException("Mood score must be between 1 and 10");
    }
    
    MoodEntry mood = new MoodEntry();
    mood.setUserId(userId);
    mood.setMoodScore(request.getMoodScore());
    mood.setEnergyLevel(request.getEnergyLevel());
    mood.setStressLevel(request.getStressLevel());
    mood.setNotes(request.getNotes());
    mood.setTimestamp(LocalDateTime.now());
    
    MoodEntry saved = moodRepository.save(mood);
    return ResponseEntity.ok(saved);
}
```

**Frontend Code:**
```typescript
const saveMood = async (data: MoodData) => {
  try {
    setIsLoading(true);
    const response = await moodService.createMood(data);
    toast.success('Mood saved successfully! 🎉');
    setMoods([response, ...moods]); // Add to list
    setShowModal(false);
  } catch (error) {
    toast.error('Failed to save mood');
  } finally {
    setIsLoading(false);
  }
};
```

### **Feature 2: AI Chat**

**How It Works End-to-End:**

1. **User Types Message:**
   ```typescript
   const [message, setMessage] = useState('');
   
   <input
     value={message}
     onChange={(e) => setMessage(e.target.value)}
     onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
   />
   ```

2. **Frontend Sends to Backend:**
   ```typescript
   const sendMessage = async () => {
     const response = await axios.post('/api/ai/chat', {
       message: message
     }, {
       headers: { Authorization: `Bearer ${accessToken}` }
     });
     
     setAiReply(response.data.reply);
   };
   ```

3. **Backend Receives Request:**
   ```java
   @PostMapping("/chat")
   public AiResponse chat(
       @RequestBody ChatRequest request,
       Authentication auth
   ) {
       Long userId = getUserIdFromAuth(auth);
       
       // Build context from user's recent data
       String context = buildUserContext(userId);
       
       // Call OpenAI
       String aiReply = openAiClient.chat(context + "\n\nUser: " + request.getMessage());
       
       // Parse suggestions
       List<String> suggestions = extractSuggestions(aiReply);
       
       return new AiResponse(aiReply, suggestions);
   }
   ```

4. **OpenAI API Call:**
   ```java
   public String chat(String prompt) {
       HttpRequest request = HttpRequest.newBuilder()
           .uri(URI.create("https://api.openai.com/v1/chat/completions"))
           .header("Authorization", "Bearer " + apiKey)
           .header("Content-Type", "application/json")
           .POST(HttpRequest.BodyPublishers.ofString(
               buildRequestBody(prompt)
           ))
           .build();
       
       HttpResponse<String> response = httpClient.send(request);
       return parseResponse(response.body());
   }
   
   private String buildRequestBody(String prompt) {
       return String.format("""
           {
             "model": "gpt-4",
             "messages": [
               {
                 "role": "system",
                 "content": "You are a compassionate mental health support assistant..."
               },
               {
                 "role": "user",
                 "content": "%s"
               }
             ],
             "temperature": 0.7,
             "max_tokens": 500
           }
           """, prompt);
   }
   ```

5. **Frontend Displays Response:**
   ```typescript
   <div className="ai-message">
     <p>{aiReply}</p>
     {suggestions.map(s => (
       <button onClick={() => sendMessage(s)}>
         {s}
       </button>
     ))}
   </div>
   ```

6. **Text-to-Speech (Optional):**
   ```typescript
   const speak = (text: string) => {
     const utterance = new SpeechSynthesisUtterance(text);
     utterance.rate = 0.9;
     utterance.pitch = 1.0;
     utterance.voice = window.speechSynthesis.getVoices()[0];
     window.speechSynthesis.speak(utterance);
   };
   ```

### **Feature 3: Goal Streaks**

**Complete Implementation:**

1. **User Creates Goal:**
   ```typescript
   const createGoal = async () => {
     await goalService.create({
       title: "Daily Meditation",
       type: "MEDITATION",
       targetCount: 30,
       period: "DAILY"
     });
   };
   ```

2. **User Marks Goal Complete:**
   ```typescript
   const completeGoal = async (goalId: number) => {
     await goalService.complete(goalId);
     // Refetch goals to update UI
     loadGoals();
   };
   ```

3. **Backend Processes Completion:**
   ```java
   @PostMapping("/{id}/complete")
   public ResponseEntity<Goal> completeGoal(@PathVariable Long id) {
       Goal goal = goalRepository.findById(id)
           .orElseThrow(() -> new NotFoundException("Goal not found"));
       
       // Check if already completed today
       LocalDate today = LocalDate.now();
       boolean alreadyCompletedToday = goalCompletionRepository
           .existsByGoalIdAndCompletionDate(id, today);
       
       if (alreadyCompletedToday) {
           throw new ValidationException("Goal already completed today");
       }
       
       // Save completion
       GoalCompletion completion = new GoalCompletion();
       completion.setGoalId(id);
       completion.setCompletionDate(today);
       goalCompletionRepository.save(completion);
       
       // Update progress
       goal.setCurrentProgress(goal.getCurrentProgress() + 1);
       
       // Calculate streak
       List<LocalDate> completionDates = goalCompletionRepository
           .findByGoalIdOrderByCompletionDateDesc(id)
           .stream()
           .map(GoalCompletion::getCompletionDate)
           .collect(Collectors.toList());
       
       int streak = calculateStreak(completionDates);
       goal.setCurrentStreak(streak);
       
       // Update longest streak if necessary
       if (streak > goal.getLongestStreak()) {
           goal.setLongestStreak(streak);
       }
       
       // Check if goal completed
       if (goal.getCurrentProgress() >= goal.getTargetCount()) {
           goal.setStatus(GoalStatus.COMPLETED);
       }
       
       Goal saved = goalRepository.save(goal);
       return ResponseEntity.ok(saved);
   }
   ```

4. **Frontend Displays Streak:**
   ```typescript
   <div className="streak-display">
     <Flame className="text-orange-500" />
     <span>{goal.currentStreak} day streak!</span>
     {goal.currentStreak >= 7 && (
       <span className="badge">🔥 On Fire!</span>
     )}
   </div>
   ```

---

## 📁 **CODE ORGANIZATION**

### **Backend Structure**

```
backend/src/main/java/com/serenmind/
├── config/
│   ├── CorsConfig.java           # CORS settings
│   ├── SecurityConfig.java       # Spring Security
│   ├── OpenApiConfig.java        # Swagger docs
│   └── JwtConfig.java            # JWT settings
│
├── controller/
│   ├── AuthController.java       # /api/auth/*
│   ├── MoodController.java       # /api/moods/*
│   ├── JournalController.java    # /api/journals/*
│   ├── AiController.java         # /api/ai/*
│   ├── GoalController.java       # /api/goals/*
│   └── ReportController.java     # /api/reports/*
│
├── service/
│   ├── UserService.java          # User operations
│   ├── MoodService.java          # Mood logic
│   ├── JournalService.java       # Journal logic
│   ├── GoalService.java          # Goal & streak logic
│   ├── JwtService.java           # Token generation
│   ├── OpenAiClient.java         # OpenAI integration
│   └── PdfGenerationService.java # PDF creation
│
├── repository/
│   ├── UserRepository.java
│   ├── MoodRepository.java
│   ├── JournalRepository.java
│   ├── GoalRepository.java
│   ├── GoalCompletionRepository.java
│   └── RefreshTokenRepository.java
│
├── model/
│   ├── User.java                 # Entity classes
│   ├── MoodEntry.java
│   ├── JournalEntry.java
│   ├── Goal.java
│   └── ...
│
├── dto/
│   ├── request/                  # Request DTOs
│   │   ├── LoginRequest.java
│   │   ├── MoodRequest.java
│   │   └── ...
│   └── response/                 # Response DTOs
│       ├── AuthResponse.java
│       ├── MoodResponse.java
│       └── ...
│
├── security/
│   ├── JwtFilter.java            # Token validation
│   └── CustomUserDetailsService.java
│
└── SerenMindApplication.java     # Main class
```

### **Frontend Structure**

```
frontend/src/
├── pages/
│   ├── Landing.tsx               # Home page
│   ├── LoginRegister.tsx         # Auth page
│   ├── Dashboard.tsx             # Main dashboard
│   ├── Journal.tsx               # Journal page
│   ├── Chat.tsx                  # AI chat
│   ├── Reports.tsx               # Analytics
│   ├── Goals.tsx                 # Goal tracking
│   ├── Crisis.tsx                # Crisis support
│   ├── Resources.tsx             # Wellness resources
│   ├── Profile.tsx               # User settings
│   └── About.tsx                 # About page
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   └── dashboard/
│       ├── MoodChart.tsx
│       ├── MonthlyCalendar.tsx
│       ├── QuickStats.tsx
│       └── RecentActivity.tsx
│
├── context/
│   └── AuthContext.tsx           # Global auth state
│
├── services/
│   ├── api.ts                    # Axios config
│   └── notificationService.ts    # Push notifications
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── App.tsx                       # Root component
└── main.tsx                      # Entry point
```

---

## 🎓 **INTERVIEW PREPARATION**

### **Questions You Should Be Ready For**

#### **Q1: Walk me through the authentication flow**

**Answer:** (See Authentication Flow section above)

Key points to mention:
- JWT tokens (access + refresh)
- BCrypt password hashing
- Token expiration and refresh mechanism
- Spring Security filter chain

#### **Q2: How does the AI chat work?**

**Answer:**
1. User sends message from frontend
2. Backend receives and builds context from user's recent moods/journals
3. Sends enriched prompt to OpenAI GPT-4 API
4. OpenAI returns contextual response
5. Backend parses and formats response
6. Frontend displays and optionally speaks response

**Why this architecture:**
- API keys never exposed to frontend
- Can add rate limiting
- Can log conversations
- Can add caching

#### **Q3: Explain the database schema**

**Answer:** (See Database Design section)

Key relationships:
- One user → Many moods/journals/goals
- One goal → Many completions
- Foreign keys with CASCADE DELETE

#### **Q4: How do you handle timezone issues?**

**Answer:**
```typescript
// WRONG - shifts dates due to UTC conversion
const dateKey = new Date(timestamp).toISOString().split('T')[0];

// CORRECT - uses local date
const date = new Date(timestamp);
const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
```

I learned this through debugging the calendar feature where moods were showing on wrong days.

#### **Q5: What security measures did you implement?**

**Answer:**
1. **Password Security:**
   - BCrypt hashing (never store plain text)
   - Minimum password requirements
   
2. **JWT Security:**
   - Signed tokens (prevent tampering)
   - Short expiration (15 min)
   - HttpOnly cookies option
   
3. **CORS:**
   - Whitelist allowed origins
   - No wildcard with credentials
   
4. **SQL Injection:**
   - JPA/Hibernate parameterized queries
   
5. **XSS Protection:**
   - React escapes content by default
   - Sanitize user input
   
6. **API Rate Limiting:**
   - Planned feature (not yet implemented)

#### **Q6: How would you scale this application?**

**Answer:** (See "How would you scale this application?" in INTERVIEW.md)

#### **Q7: What was the hardest bug you fixed?**

**Answer:** 

**Timezone Bug in Calendar:**
- **Problem:** Calendar showing moods on wrong days
- **Cause:** `.toISOString()` converts to UTC, shifting dates
- **Solution:** Custom local date string formatting
- **File:** `MonthlyCalendar.tsx` line 162
- **Learning:** Always be careful with Date objects across timezones

**CORS 403 Error:**
- **Problem:** Login/register returning 403 Forbidden
- **Cause:** `allowCredentials(true)` can't be used with wildcard origins
- **Solution:** Explicitly list allowed origins
- **File:** `CorsConfig.java` lines 28-34
- **Learning:** Read Spring Security documentation carefully

### **Technical Terms You Should Know**

1. **JWT** - JSON Web Token for authentication
2. **BCrypt** - Password hashing algorithm
3. **CORS** - Cross-Origin Resource Sharing
4. **JPA** - Java Persistence API
5. **ORM** - Object-Relational Mapping
6. **REST** - Representational State Transfer
7. **DTO** - Data Transfer Object
8. **CRUD** - Create, Read, Update, Delete
9. **Context API** - React state management
10. **Service Worker** - Background script for PWA features

### **Code You Should Memorize**

#### **1. getUserIdFromAuth Pattern**
```java
private Long getUserIdFromAuth(Authentication auth) {
    String email = auth.getName();
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"))
        .getId();
}
```

#### **2. Axios Interceptor**
```typescript
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      // Refresh token logic
    }
    return Promise.reject(error);
  }
);
```

#### **3. Protected Route**
```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};
```

---

## 🎯 **FINAL STUDY CHECKLIST**

### **Things to Review Before Interview:**

- [ ] Read this entire document
- [ ] Understand authentication flow diagram
- [ ] Review database schema
- [ ] Practice explaining AI chat integration
- [ ] Know streak calculation algorithm
- [ ] Understand timezone fix
- [ ] Review CORS configuration
- [ ] Know all API endpoints
- [ ] Understand component hierarchy
- [ ] Review key code snippets
- [ ] Prepare answers to common questions
- [ ] Test the app and know all features
- [ ] Read INTERVIEW.md
- [ ] Practice live coding scenarios

### **What to Bring to Interview:**

- [ ] Printed copy of `📋-SHOW-THIS-TO-INTERVIEWER.md`
- [ ] Laptop with project running
- [ ] GitHub repository link
- [ ] List of technologies used
- [ ] Your developer credentials

---

## 📞 **CONTACT**

**Developer:** Kalpak Shrikrushna Manwar  
**Email:** kalpakm11@gmail.com  
**Phone:** +91-8767309198  

---

## 🎉 **YOU'RE READY!**

You now have complete knowledge of:
✅ What SerenMind is and why you built it  
✅ How every feature works technically  
✅ The complete architecture  
✅ Database design and relationships  
✅ All API endpoints  
✅ Key algorithms and logic  
✅ Common interview questions  
✅ Code you should know by heart  

**Go ace that interview!** 🚀

---

**Last Updated:** October 30, 2025  
**By:** Kalpak Manwar (kalpakm11@gmail.com)


