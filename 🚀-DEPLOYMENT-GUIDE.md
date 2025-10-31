# 🚀 SerenMind Deployment Guide

**Developer:** Kalpak Manwar  
**Email:** kalpakm11@gmail.com  
**Project:** SerenMind Mental Wellness Platform

---

## 📋 **WHAT YOU'LL DEPLOY:**

✅ **Frontend** → Vercel (React app)  
✅ **Backend** → Railway (Spring Boot API)  
✅ **Database** → Railway MySQL  

**Total Time:** 30-45 minutes  
**Total Cost:** FREE! ✨

---

## 🎯 **STEP-BY-STEP DEPLOYMENT**

---

## 1️⃣ **SETUP GITHUB REPOSITORY (10 min)**

### **A. Create GitHub Account (if you don't have)**
1. Go to https://github.com
2. Sign up with your email: kalpakm11@gmail.com
3. Verify email

### **B. Create Repository**
1. Click "New Repository"
2. Name: `serenmind-mental-wellness`
3. Description: "Full-stack mental wellness platform - React + Spring Boot + MySQL"
4. Select: **Public** (so recruiters can see!)
5. Don't initialize with README (we have one)
6. Click "Create Repository"

### **C. Push Your Code**

Open Git Bash or Terminal in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SerenMind Mental Wellness Platform"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/serenmind-mental-wellness.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Your code is now on GitHub!**

---

## 2️⃣ **DEPLOY BACKEND ON RAILWAY (15 min)**

### **A. Create Railway Account**
1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway

### **B. Create New Project**
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Select your `serenmind-mental-wellness` repository
4. Railway will detect it's a Spring Boot app

### **C. Add MySQL Database**
1. In your Railway project, click "+ New"
2. Select "Database" → "MySQL"
3. Wait for MySQL to provision (2-3 minutes)

### **D. Configure Backend Environment Variables**

Click on your backend service → "Variables" tab → Add these:

```
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=mysql://mysql.railway.internal:3306/railway
SPRING_DATASOURCE_USERNAME=${MYSQLUSER}
SPRING_DATASOURCE_PASSWORD=${MYSQLPASSWORD}
SPRING_DATASOURCE_DATABASE=${MYSQLDATABASE}
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
OPENAI_API_KEY=your-openai-api-key-here
```

**Note:** Railway automatically provides `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE` variables.

### **E. Update application.yml for Production**

Railway will use `application-prod.yml` which should have:

```yaml
spring:
  datasource:
    url: ${SPRING_DATASOURCE_URL:jdbc:mysql://localhost:3306/serenmind_db}
    username: ${SPRING_DATASOURCE_USERNAME:root}
    password: ${SPRING_DATASOURCE_PASSWORD:root}
  
  jpa:
    hibernate:
      ddl-auto: none
    show-sql: false
  
  flyway:
    enabled: true
    baseline-on-migrate: true

server:
  port: ${PORT:8080}

jwt:
  secret: ${JWT_SECRET:default-secret-key}
  expiration: 86400000

openai:
  api:
    key: ${OPENAI_API_KEY:your-key}
```

### **F. Deploy**
1. Railway will automatically build and deploy
2. Wait 5-10 minutes for first deployment
3. Once done, click on backend service
4. Copy the public URL (e.g., `https://serenmind-backend-production.up.railway.app`)

✅ **Backend is LIVE!**

---

## 3️⃣ **DEPLOY FRONTEND ON VERCEL (10 min)**

### **A. Create Vercel Account**
1. Go to https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

### **B. Import Project**
1. Click "Add New..." → "Project"
2. Import your `serenmind-mental-wellness` repository
3. Vercel will detect it's a Vite app

### **C. Configure Build Settings**

**Root Directory:** `frontend`

**Build Command:** `npm run build`

**Output Directory:** `dist`

**Install Command:** `npm install`

### **D. Add Environment Variables**

In Vercel project settings → "Environment Variables":

```
VITE_API_URL=https://your-backend-url.railway.app/api
```

**Replace** `your-backend-url.railway.app` with your actual Railway backend URL!

### **E. Deploy**
1. Click "Deploy"
2. Wait 2-3 minutes
3. Once done, Vercel gives you a URL like: `https://serenmind.vercel.app`

✅ **Frontend is LIVE!**

---

## 4️⃣ **UPDATE CORS IN BACKEND**

### **Important:** Add your Vercel URL to allowed origins!

Update `backend/src/main/java/com/serenmind/config/CorsConfig.java`:

```java
configuration.setAllowedOrigins(Arrays.asList(
    "http://localhost:5173",
    "http://localhost:3000",
    "https://serenmind.vercel.app",  // Add your Vercel URL
    "https://*.vercel.app"            // Allow all Vercel preview URLs
));
```

Commit and push:

```bash
git add .
git commit -m "Add Vercel URL to CORS allowed origins"
git push
```

Railway will auto-redeploy!

---

## 5️⃣ **TEST YOUR DEPLOYMENT**

### **A. Test Backend API**

Visit: `https://your-backend.railway.app/actuator/health`

Should return: `{"status":"UP"}`

### **B. Test Frontend**

Visit: `https://serenmind.vercel.app`

Should see your landing page!

### **C. Test Full Flow**

1. Register a new user
2. Login
3. Track mood
4. Write journal
5. Chat with AI
6. Check dashboard

✅ **Everything works? YOU'RE LIVE!** 🎉

---

## 6️⃣ **GET YOUR LIVE URLs**

### **Frontend URL:**
```
https://serenmind.vercel.app
```

### **Backend API URL:**
```
https://serenmind-backend.railway.app
```

### **Add These to Your Resume!** 📝

---

## 🎯 **TROUBLESHOOTING**

### **Problem: Backend won't start**
**Solution:** Check Railway logs
- Click backend service → "Deployments" → Latest deployment → "View Logs"
- Look for errors in Flyway migrations or database connection

### **Problem: Frontend can't connect to backend**
**Solution:** Check CORS
- Make sure Vercel URL is in CORS allowed origins
- Check browser console for CORS errors
- Verify `VITE_API_URL` environment variable in Vercel

### **Problem: Database migration fails**
**Solution:** 
- SSH into Railway MySQL
- Run migrations manually
- Or use `spring.flyway.baseline-on-migrate=true`

### **Problem: 404 on frontend routes**
**Solution:** 
- Make sure `vercel.json` has rewrite rules
- Check that all routes go to `index.html`

---

## 📊 **AFTER DEPLOYMENT**

### **Update These Documents:**

**1. README.md**
Add:
```markdown
## 🌐 Live Demo

**Frontend:** https://serenmind.vercel.app  
**Backend API:** https://serenmind-backend.railway.app  

**Test Credentials:**
- Email: demo@serenmind.com
- Password: Demo@123
```

**2. Resume**
Add:
```
SerenMind - Mental Wellness Platform | Live: serenmind.vercel.app
```

**3. LinkedIn**
Update project section with live URL

---

## 🎉 **CONGRATULATIONS!**

Your project is now:
✅ **Live on the internet**  
✅ **Accessible via URL**  
✅ **Ready to share with recruiters**  
✅ **Production-ready**  
✅ **Looks professional**  

---

## 💡 **INTERVIEW TALKING POINTS:**

**"I deployed my project to production using:"**
- Vercel for frontend (CDN, auto-scaling)
- Railway for backend (container-based deployment)
- Railway MySQL for database (managed service)
- GitHub for version control
- Environment variables for configuration
- CORS for security
- Flyway for database migrations

**"It demonstrates my knowledge of:"**
- CI/CD pipelines
- Cloud deployment
- Production configuration
- Security best practices
- DevOps fundamentals

---

## 🚀 **FREE TIER LIMITS:**

**Vercel:**
- Unlimited deployments
- 100 GB bandwidth/month
- Plenty for demo!

**Railway:**
- $5 free credit/month
- ~500 hours runtime
- Enough for interviews!

**Tip:** If Railway credit runs out, deploy on Render.com (also free!)

---

## 📞 **SUPPORT:**

If you face any issues during deployment, check:
1. Railway logs
2. Vercel logs
3. Browser console
4. Network tab

---

**Deployment Guide Created by:** Kalpak Manwar  
**Date:** October 2024  
**Project:** SerenMind Mental Wellness Platform

---

**Now go deploy and share your live URL with the world!** 🚀✨

