# 📝 **SERENMIND - 1-PAGE CHEAT SHEET**

## **Kalpak Manwar | kalpakm11@gmail.com | +91-8767309198**

---

## ⚡ **30-SECOND PITCH**
"I built **SerenMind**, a mental wellness app with **mood tracking**, **AI chat**, and **goal streaks**. Stack: **React 18, Spring Boot 3, MySQL**. Integrated **OpenAI GPT-4**. **15,000+ lines**, **20+ features**. Can explain any part."

---

## 💻 **TECH STACK**
- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **Backend:** Spring Boot 3 + Java 17
- **Database:** MySQL 8
- **Auth:** JWT (access 15min, refresh 24h)
- **AI:** OpenAI GPT-4
- **Extras:** Chart.js, Framer Motion

---

## 📊 **KEY NUMBERS**
- ✅ **15,000+** lines of code
- ✅ **150+** files
- ✅ **30+** React components
- ✅ **40+** API endpoints
- ✅ **8** database tables
- ✅ **20+** features
- ✅ **100%** solo project

---

## 🎯 **MAIN FEATURES**
1. **Mood Tracking** - Daily mood/energy/stress (1-10 scale)
2. **AI Chat** - OpenAI GPT-4 with user context
3. **Journal** - CRUD, search, tags, favorites
4. **Goals & Streaks** - Daily habits with gamification
5. **PDF Reports** - Auto-generated wellness reports
6. **Crisis Support** - Breathing exercises + hotlines

---

## 💾 **DATABASE** (8 Tables)
- `users` - Accounts
- `mood_entries` - Daily moods
- `journal_entries` - User journals
- `goals` - Wellness goals
- `goal_completions` - Streak tracking
- `ai_reports` - Generated reports
- `refresh_tokens` - JWT tokens

---

## 🔐 **AUTHENTICATION FLOW**
1. User logs in → Backend checks password
2. Backend generates JWT (15min access + 24h refresh)
3. Frontend stores tokens
4. Every API call: `Authorization: Bearer {token}`
5. Token expires → Auto-refresh with refresh token

---

## 🤖 **AI CHAT FLOW**
1. User message → Backend
2. Backend gets recent moods/journals (context)
3. Backend → OpenAI GPT-4 with context
4. OpenAI → Response
5. Backend → Frontend
6. Display + speak (text-to-speech)

**Why proxy?** Keep API key secret, add logging/caching

---

## 🔥 **3 BUGS I FIXED**
1. **Timezone** - Moods on wrong day (fixed with local date)
2. **CORS** - 403 errors (explicit origins, not wildcard)
3. **User ID** - Extract email from JWT → query database

---

## 🎤 **INTERVIEW Q&A**

**Q: Tech stack?**  
A: React 18, TypeScript, Spring Boot 3, Java 17, MySQL, JWT, OpenAI GPT-4

**Q: Solo project?**  
A: Yes! 100%. I can explain any component.

**Q: Hardest part?**  
A: Timezone bug - `.toISOString()` shifted dates. Fixed with custom formatting.

**Q: How AI works?**  
A: Backend proxies to OpenAI with user context. Secure, adds logging.

**Q: Database design?**  
A: 8 tables, foreign keys, CASCADE DELETE, indexes on key fields.

**Q: Scale it?**  
A: Redis cache, DB replicas, CDN, load balancer, queue for OpenAI.

---

## 🔑 **KEY CODE**

### **JWT Generation**
```java
Jwts.builder()
  .setSubject(email)
  .setExpiration(new Date(now + 900000))
  .signWith(key)
  .compact();
```

### **Protected Route**
```typescript
if (!isAuthenticated) return <Navigate to="/login" />;
return <>{children}</>;
```

### **Streak Calc**
```java
int streak = 0;
LocalDate expected = LocalDate.now();
for (date : dates) {
  if (date.equals(expected)) { streak++; expected--; }
  else break;
}
```

---

## ✅ **WHY IT'S GOOD**
1. Complete full-stack (FE + BE + DB)
2. Real AI integration (not mock)
3. Modern tech (React 18, Spring Boot 3)
4. Security (JWT, BCrypt, CORS)
5. Production-ready (migrations, error handling)
6. Well-documented (your name everywhere)
7. Real-world problem (mental health)
8. Professional UI (animations, charts)

---

## 📂 **CODE STRUCTURE**
```
Backend: controller → service → repository → DB
Frontend: pages → components → services → API
```

---

## 🎯 **BEFORE INTERVIEW**
- [ ] Say elevator pitch 3 times
- [ ] Memorize: React 18, Spring Boot 3, MySQL
- [ ] Remember: 15,000 lines, 20+ features
- [ ] Test the app
- [ ] Confident! You built this! 💪

---

## 💡 **QUICK ANSWERS**
- **What?** Mental wellness app
- **Stack?** React 18, Spring Boot 3, MySQL
- **Features?** Mood tracking, AI chat, goals, journals
- **Solo?** Yes! I built everything
- **Lines?** 15,000+
- **Proof?** My name in code, can explain everything

---

## 🏆 **YOU'RE READY!**
You know the project. You built it. You can explain it. **Go show them!** 🚀

---

**Keep this with you during interview!**

