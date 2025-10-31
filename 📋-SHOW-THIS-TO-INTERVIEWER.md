# 🎯 **SHOW THIS TO YOUR INTERVIEWER**

---

<div align="center">

# **SerenMind Mental Wellness Application**

### **Developed By**

# **Kalpak Shrikrushna Manwar**

📧 **kalpakm11@gmail.com**  
📱 **+91-8767309198**

---

**Full-Stack Developer | Project Architect**

</div>

---

## ⚡ **QUICK FACTS**

| Aspect | Details |
|--------|---------|
| **Developer** | Kalpak Shrikrushna Manwar (Solo Project) |
| **Email** | kalpakm11@gmail.com |
| **Phone** | +91-8767309198 |
| **Development Period** | October 2025 |
| **Lines of Code** | 15,000+ |
| **Files Created** | 150+ |
| **Features Built** | 20+ major features |
| **Technologies** | 15+ integrated |

---

## 🚀 **WHAT I BUILT**

### **Complete Mental Wellness Platform**

✅ **Mood Tracking** - Daily mood, energy, stress with visual charts  
✅ **AI Chat** - OpenAI GPT integration with voice output  
✅ **Smart Journal** - CRUD, search, favorites, auto-save  
✅ **PDF Reports** - Auto-generated wellness insights  
✅ **Monthly Calendar** - Day-by-day tracking with popups  
✅ **Crisis Mode** - Emergency support with breathing exercises  
✅ **Goal Tracking** - Streaks and progress visualization  
✅ **Push Notifications** - Daily reminders via Service Worker  
✅ **Resources** - Therapy info and self-help techniques  
✅ **Authentication** - JWT with refresh tokens  

---

## 💻 **TECH STACK I USED**

### **Frontend**
- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Chart.js, Axios, React Router
- Web Speech API, Service Workers

### **Backend**
- Java 17 + Spring Boot 3
- Spring Security + JWT
- MySQL 8 + JPA/Hibernate
- OpenAI API + OpenPDF
- Flyway Migrations

---

## 🎯 **PROOF OF OWNERSHIP**

### **Ask Me To:**

1. ✅ **Explain any part of the code**
2. ✅ **Walk through the architecture**
3. ✅ **Describe specific challenges I solved**
4. ✅ **Add a new feature live**
5. ✅ **Debug any issue**
6. ✅ **Answer technical questions**

### **Check These Files:**

```
📄 README.md         → Developer section at top
📄 DEVELOPER.md      → Complete profile & declaration
📄 INTERVIEW.md      → Technical Q&A guide
📄 App.tsx           → Developer comment header
📄 SerenMindApplication.java → Developer JavaDoc
📄 package.json      → Author field
📄 pom.xml           → Developer section
```

### **Run The App & See:**

```
🌐 Footer → "Made with ❤️ by Kalpak Manwar"
📄 PDF Reports → "Created by Kalpak Manwar"
ℹ️ About Page → Developer profile
🔗 Swagger UI → Contact: Kalpak Manwar
```

---

## 💡 **3 CHALLENGES I SOLVED**

### **1. Timezone Bug in Calendar**
**Problem:** JavaScript `.toISOString()` converted to UTC, shifting dates  
**Solution:** Custom local date formatting  
**Code:** `MonthlyCalendar.tsx` line 162

### **2. CORS 403 Error**
**Problem:** `allowCredentials(true)` conflict with wildcard origins  
**Solution:** Explicitly listed allowed origins  
**Code:** `CorsConfig.java` lines 28-34

### **3. JWT User Extraction**
**Problem:** Controllers used hardcoded user ID  
**Solution:** Extract email from token → query database  
**Code:** `getUserIdFromAuth()` in all controllers

---

## 📈 **SKILLS DEMONSTRATED**

<div align="center">

| Skill | Evidence |
|-------|----------|
| **Full-Stack Development** | Complete frontend + backend |
| **REST API Design** | 40+ endpoints |
| **Database Design** | 8 normalized tables |
| **Authentication** | JWT + Spring Security |
| **AI Integration** | OpenAI GPT with retry logic |
| **Modern UI/UX** | Tailwind + Framer Motion |
| **Problem Solving** | Fixed timezone, CORS, auth bugs |
| **Testing** | Unit tests + integration tests |
| **Documentation** | Comprehensive README & guides |
| **Production Ready** | Docker, CI/CD, migrations |

</div>

---

## 🔥 **TECHNICAL HIGHLIGHTS**

```typescript
// Custom timezone fix I implemented
const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
```

```java
// User ID extraction from JWT
private Long getUserIdFromAuth(Authentication auth) {
    String email = auth.getName();
    return userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"))
        .getId();
}
```

```tsx
// Voice AI integration
const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
};
```

---

## 📞 **CONTACT ME**

<div align="center">

### **Ready for Technical Interview!**

**Kalpak Shrikrushna Manwar**

📧 **kalpakm11@gmail.com**  
📱 **+91-8767309198**

**Available for:**
- Video call demos
- Code walkthroughs
- Technical discussions
- Live coding sessions

</div>

---

## ✍️ **DECLARATION**

<div align="center">

**I, Kalpak Shrikrushna Manwar, certify that:**

✅ I built this entire project independently  
✅ I wrote every line of code personally  
✅ I can explain any technical decision  
✅ I debugged and solved all issues myself  
✅ I can extend this project with new features  

**Date:** October 30, 2025  
**Signature:** Kalpak Manwar

</div>

---

<div align="center">

## 🏆 **THIS PROJECT SHOWCASES MY ABILITY TO:**

**Design • Develop • Debug • Deploy • Document**

### **FULL-STACK APPLICATIONS**

</div>

---

<div align="center">

### **🚀 Ready to Contribute These Skills to Your Organization! 🚀**

</div>

