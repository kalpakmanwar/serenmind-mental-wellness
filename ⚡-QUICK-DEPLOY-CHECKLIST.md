# ⚡ Quick Deployment Checklist

**Follow this step-by-step to deploy in 30 minutes!**

---

## ☐ **STEP 1: GitHub Setup (5 min)**

- [ ] Create GitHub account (if needed)
- [ ] Create new repository: `serenmind-mental-wellness`
- [ ] Make it **Public**
- [ ] Run these commands in project folder:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/YOUR-USERNAME/serenmind-mental-wellness.git
  git push -u origin main
  ```
- [ ] Verify code is on GitHub

---

## ☐ **STEP 2: Deploy Backend on Railway (15 min)**

- [ ] Go to https://railway.app
- [ ] Login with GitHub
- [ ] Click "New Project" → "Deploy from GitHub repo"
- [ ] Select your repository
- [ ] Click "+ New" → "Database" → "MySQL"
- [ ] Wait for MySQL to provision
- [ ] Click backend service → "Variables"
- [ ] Add these variables:
  - `SPRING_PROFILES_ACTIVE` = `prod`
  - `JWT_SECRET` = `your-secret-key-change-this`
  - `OPENAI_API_KEY` = `your-openai-key`
- [ ] Wait for deployment (5-10 min)
- [ ] Copy backend URL (e.g., `https://serenmind-production.up.railway.app`)
- [ ] Test: Visit `https://your-backend.railway.app/actuator/health`
- [ ] Should return: `{"status":"UP"}`

---

## ☐ **STEP 3: Deploy Frontend on Vercel (10 min)**

- [ ] Go to https://vercel.com
- [ ] Login with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Import your repository
- [ ] Set **Root Directory**: `frontend`
- [ ] Click "Environment Variables"
- [ ] Add: `VITE_API_URL` = `https://your-backend.railway.app/api`
  - **Use your actual Railway backend URL!**
- [ ] Click "Deploy"
- [ ] Wait 2-3 minutes
- [ ] Copy frontend URL (e.g., `https://serenmind.vercel.app`)

---

## ☐ **STEP 4: Update CORS (5 min)**

- [ ] Open `backend/src/main/java/com/serenmind/config/CorsConfig.java`
- [ ] Add your Vercel URL to allowed origins
- [ ] Commit and push:
  ```bash
  git add .
  git commit -m "Add Vercel URL to CORS"
  git push
  ```
- [ ] Railway will auto-redeploy

---

## ☐ **STEP 5: Test Everything (5 min)**

- [ ] Visit your frontend URL
- [ ] Register a new account
- [ ] Login
- [ ] Track a mood
- [ ] Write a journal entry
- [ ] Try AI chat (if you have OpenAI key)
- [ ] Check dashboard
- [ ] Everything works? **YOU'RE LIVE!** 🎉

---

## ☐ **STEP 6: Share Your Success**

- [ ] Update resume with live URL
- [ ] Update LinkedIn with project link
- [ ] Update README.md with live demo links
- [ ] Share with friends and recruiters!

---

## 📋 **YOUR LIVE URLS:**

**Frontend:** `https://_________________.vercel.app`

**Backend:** `https://_________________.railway.app`

---

## 🎯 **Add to Resume:**

```
SERENMIND - Mental Wellness Platform | Live: your-url.vercel.app
Full-stack web app with React, Spring Boot, MySQL | 15,000+ LOC
• Deployed on Vercel (frontend) & Railway (backend) with CI/CD
• 40+ REST APIs, JWT auth, OpenAI GPT-4 integration
• Tech: React 18, TypeScript, Spring Boot 3, MySQL 8, Flyway
```

---

## ✅ **DONE!**

**Total Time:** ~30-45 minutes  
**Total Cost:** FREE!  
**Result:** Professional live project to show recruiters!  

**Now you can say: "Here's my live project" instead of "It's on localhost"** 🚀

---

**Created by:** Kalpak Manwar  
**Email:** kalpakm11@gmail.com  
**Phone:** +91-8767309198

