# 🌸 Frontend Quick Start Guide

## Installation & Setup (3 Commands)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

**Open**: `http://localhost:5173`

---

## What's Included

✅ **Complete React + TypeScript setup** with Vite
✅ **Tailwind CSS** with Canva-inspired design tokens
✅ **Framer Motion** animations
✅ **Chart.js** for mood visualization
✅ **Full authentication** (login/register with JWT)
✅ **7 pages** (Landing, Login/Register, Dashboard, Journal, Chat, Reports, Profile)
✅ **Dark mode** toggle
✅ **Responsive** mobile-first design
✅ **Accessible** with ARIA attributes

---

## Pages

| Page | Route | Status | Description |
|------|-------|--------|-------------|
| **Landing** | `/` | ✅ Complete | Hero, features, CTA |
| **Login/Register** | `/login`, `/register` | ✅ Complete | Two-column Canva style |
| **Dashboard** | `/dashboard` | ✅ Complete | Mood input + Chart.js |
| **Journal** | `/journal` | 🚧 Stub | Coming in STEP 8 |
| **Chat** | `/chat` | 🚧 Stub | Coming in STEP 8 |
| **Reports** | `/reports` | 🚧 Stub | Coming in STEP 8 |
| **Profile** | `/profile` | ✅ Basic | User info, dark mode toggle |

---

## Design System

### Colors
- **Cream Background**: `#F8EFE4`
- **Peach Accent**: `#F6D7C3`
- **Sage Accent**: `#CFEFE6`
- **Lavender Accent**: `#E8D9F2`

### Fonts
- **Headings**: Playfair Display (serif)
- **Body**: Poppins (sans-serif)

### Components
- **Cards**: Rounded 1.5rem, soft shadows
- **Buttons**: Rounded 1rem, smooth transitions
- **Inputs**: Rounded 1rem, focus glow

---

## Test the App

### 1. Start Backend (Terminal 1)
```bash
cd backend
./mvnw spring-boot:run
```

### 2. Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

### 3. Test Flow
1. Open `http://localhost:5173`
2. Click "Start Your Journey"
3. Register: `test@example.com`, `testuser`, `password123`
4. Redirected to Dashboard
5. Fill mood form → Submit
6. See Chart.js visualization!

---

## Key Features

### Dashboard (Fully Functional)
- 6 emoji mood buttons
- 3 sliders (mood, energy, stress)
- Notes textarea
- Real-time Chart.js visualization
- Summary cards with averages
- Recent entries list

### Authentication
- Login/Register with validation
- Show/hide password
- JWT token management
- Auto token refresh
- Protected routes

### Dark Mode
- Toggle in header
- Toggle in profile
- Persistent (localStorage)
- Smooth transitions

---

## Folder Structure

```
frontend/
├── src/
│   ├── assets/          # SVG decorations
│   ├── components/
│   │   └── layout/      # Header, Footer, ProtectedRoute
│   ├── context/         # AuthContext
│   ├── hooks/           # useTheme, useDebounce
│   ├── pages/           # All pages
│   ├── services/        # API client (axios)
│   ├── types/           # TypeScript types
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind + custom styles
├── public/
│   └── favicon.svg      # App icon
├── package.json
├── vite.config.ts
├── tailwind.config.js   # Custom design tokens
└── tsconfig.json
```

---

## Available Scripts

```bash
npm run dev          # Start dev server (port 5173)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## Environment Variables

Create `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=SerenMind
VITE_ENABLE_DARK_MODE=true
```

---

## Troubleshooting

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### API requests failing (CORS)
- Ensure backend is running on port 8080
- Check `.env` file has correct `VITE_API_BASE_URL`

---

## Next Steps

✅ **STEP 7 is complete!** Frontend is fully functional.

**Optional enhancements** (STEP 8):
- Expand Journal page (rich text editor)
- Expand Chat page (chat bubbles, typing indicator)
- Expand Reports page (report cards, PDF download UI)

**Or proceed to**:
- STEP 9: CI/CD with GitHub Actions
- STEP 10: Deployment to Vercel/Render/AWS

---

## Documentation

- `frontend/README.md` - Frontend setup guide
- `STEP7-COMPLETE.md` - Comprehensive implementation guide
- `FRONTEND-QUICK-START.md` - This file

---

**Happy Coding! 🚀**

