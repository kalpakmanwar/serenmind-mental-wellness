# SerenMind Frontend 🌸

Beautiful, accessible React frontend for the SerenMind mental wellness application.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualization
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## Project Structure

```
src/
├── assets/          # Static assets (SVGs, images)
├── components/      # React components
│   ├── layout/     # Layout components (Header, Footer)
│   ├── ui/         # Reusable UI components
│   └── common/     # Common components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── services/        # API services
├── types/           # TypeScript types
├── utils/           # Utility functions
├── App.tsx          # Root component
├── main.tsx         # Entry point
└── index.css        # Global styles
```

## Design System

### Colors

- **Primary Background**: `#F8EFE4` (Cream)
- **Accent Peach**: `#F6D7C3`
- **Accent Sage**: `#CFEFE6`
- **Accent Lavender**: `#E8D9F2`
- **Text Dark**: `#1E293B`

### Fonts

- **Headings**: Playfair Display (serif)
- **Body**: Poppins (sans-serif)

### Components

All components use:
- Rounded cards (`rounded-card` = 1.5rem)
- Soft shadows (`shadow-soft`)
- Smooth transitions
- ARIA attributes for accessibility

## Features

✅ **Authentication** - Login/register with JWT
✅ **Mood Tracking** - Daily mood logging with Chart.js visualization
✅ **Dark Mode** - Toggle between light/dark themes
✅ **Responsive** - Mobile-first design
✅ **Accessible** - ARIA labels and keyboard navigation
✅ **Animations** - Smooth Framer Motion transitions

## Environment Variables

Create a `.env` file:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_NAME=SerenMind
VITE_ENABLE_DARK_MODE=true
```

## Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
