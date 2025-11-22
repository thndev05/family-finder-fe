# 🌐 Family Finder AI - Frontend

[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.4-purple.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Modern React web application for Family Finder AI - A facial recognition system for matching missing and found persons**

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [System Requirements](#-system-requirements)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Components](#-components)
- [Services](#-services)
- [Development](#-development)
- [Building for Production](#-building-for-production)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🎯 Overview

**Family Finder AI Frontend** is a modern, responsive web application built with React and Vite. It provides an intuitive user interface for uploading missing and found person photos, viewing cases, and managing the facial recognition matching system.

### Key Features

- 📤 **Upload Missing/Found Persons** - Easy-to-use forms with image preview
- 🔍 **Search Cases** - Search by case ID or found ID
- 📊 **Cases Dashboard** - Real-time overview of all cases with statistics
- 🎯 **Matching Results** - Visual display of potential matches with confidence scores
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🌙 **Modern UI** - Beautiful dark-themed interface with smooth animations

---

## ✨ Features

### Core Functionality
- ✅ Upload missing person with metadata
- ✅ Upload found person with metadata
- ✅ Automatic matching on upload
- ✅ Search cases by ID
- ✅ View all cases with filtering
- ✅ Real-time statistics dashboard
- ✅ Match results with confidence scores
- ✅ Health status monitoring

### UI/UX Features
- 🎨 Modern dark theme
- 📱 Fully responsive design
- ⚡ Fast page loads with Vite
- 🎯 Intuitive navigation
- 💫 Smooth animations and transitions
- 🎨 Tailwind CSS styling
- 📊 Data visualization
- ⚠️ Error handling and validation

---

## 🚀 Quick Start

Get the frontend running in **3 simple steps**:

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API URL (Optional)
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Step 3: Start Development Server
```bash
npm run dev
```

### ✅ You're Ready!
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000 (make sure backend is running)

---

## 💻 System Requirements

### Minimum Requirements
- **Node.js**: 18.0+ (LTS recommended)
- **npm**: 9.0+ or **yarn**: 1.22+
- **RAM**: 4GB
- **Storage**: 500MB free space

### Recommended
- **Node.js**: 20.0+ LTS
- **RAM**: 8GB+
- **Modern browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## 🛠️ Installation

### Prerequisites

#### Install Node.js
- **Windows/Mac**: Download from [nodejs.org](https://nodejs.org/)
- **Linux**: 
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

### Installation Steps

1. **Clone Repository** (if not already done)
   ```bash
   git clone https://github.com/thndev05/family-finder-aI4life.git
   cd family-finder-aI4life/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment** (Optional)
   ```bash
   # Create .env file
   echo "VITE_API_BASE_URL=http://localhost:8000" > .env
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Optional: Enable debug mode
VITE_DEBUG=true
```

### API Configuration

The frontend connects to the backend API. Make sure:

1. Backend is running on the configured port (default: 8000)
2. CORS is enabled in backend for the frontend origin
3. API endpoints are accessible

### Build Configuration

Edit `vite.config.js` for custom build settings:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
```

---

## 📁 Project Structure

```
frontend/
├── public/                  # Static assets
│   └── vite.svg
├── src/
│   ├── assets/             # Images, icons, etc.
│   │   └── react.svg
│   ├── components/         # Reusable components
│   │   ├── AppLayout.jsx   # Main layout wrapper
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Footer.jsx      # Footer component
│   │   ├── UploadForm.jsx  # Upload form component
│   │   ├── ResultPanel.jsx # Results display
│   │   ├── MatchCard.jsx   # Match result card
│   │   ├── StatCard.jsx    # Statistics card
│   │   ├── HealthStatus.jsx # Health indicator
│   │   ├── Toast.jsx       # Toast notifications
│   │   └── ModeToggle.jsx  # Upload mode toggle
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx    # Home/landing page
│   │   ├── FinderPage.jsx  # Upload/search page
│   │   ├── CasesPage.jsx   # Cases dashboard
│   │   └── InsightsPage.jsx # Insights/analytics
│   ├── services/           # API services
│   │   ├── apiClient.js    # Axios instance
│   │   └── familyService.js # API functions
│   ├── utils/              # Utility functions
│   │   └── errorParser.js  # Error parsing
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env                    # Environment variables (create this)
├── .env.example            # Example env file
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS config
├── tailwind.config.js      # Tailwind CSS config
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

---

## 📄 Pages

### HomePage (`/`)
Landing page with overview of the system and quick links.

**Features:**
- System introduction
- Key statistics
- Quick navigation

### FinderPage (`/finder`)
Main page for uploading and searching cases.

**Features:**
- Toggle between missing/found upload mode
- Image upload with preview
- Metadata form with validation
- Search by ID functionality
- Real-time results display
- Health status indicator

**Usage:**
1. Select upload mode (Missing or Found)
2. Choose an image file
3. Fill in metadata form
4. Click upload
5. View potential matches

### CasesPage (`/cases`)
Dashboard displaying all cases with statistics.

**Features:**
- Real-time statistics cards
- Spotlight cases (top 3 by confidence)
- Complete cases table
- Auto-refresh every 15 minutes
- Filtering capabilities

**Statistics Displayed:**
- Total missing cases
- Total found cases
- High priority matches
- Total cases

### InsightsPage (`/insights`)
Analytics and insights page (future feature).

**Features:**
- System analytics
- Performance metrics
- Usage statistics

---

## 🧩 Components

### Core Components

#### UploadForm
Form component for uploading missing/found persons.

**Props:**
- `mode`: 'missing' | 'found'
- `onSubmit`: Callback function
- `loading`: Loading state

**Features:**
- Image file selection
- Image preview
- Dynamic form fields based on mode
- Client-side validation
- Auto-generated IDs

#### ResultPanel
Displays search and upload results.

**Features:**
- Match cards with confidence scores
- Detailed match information
- Contact information
- Confidence explanations
- Empty state handling

#### MatchCard
Individual match result card.

**Props:**
- `match`: Match result object
- `type`: 'missing' | 'found'

**Displays:**
- Face similarity score
- Confidence level and score
- Metadata information
- Contact details
- Match explanation

#### Navbar
Navigation bar component.

**Features:**
- Logo and branding
- Navigation links
- Access Finder button
- Responsive mobile menu

#### HealthStatus
Displays backend API health status.

**Features:**
- Real-time health check
- Service status indicators
- Connection status
- Auto-refresh

#### Toast
Toast notification component.

**Features:**
- Success/error messages
- Auto-dismiss
- Smooth animations
- Multiple toast support

---

## 🔌 Services

### API Client (`services/apiClient.js`)

Axios instance configured with base URL and interceptors.

**Features:**
- Base URL configuration
- Request timeout
- Error interceptors
- Response interceptors

### Family Service (`services/familyService.js`)

API service functions for interacting with backend.

**Available Functions:**

#### Upload Functions
```javascript
// Upload missing person
uploadMissingPerson({ imageFile, metadata })
  .then(result => console.log(result))

// Upload found person
uploadFoundPerson({ imageFile, metadata })
  .then(result => console.log(result))
```

#### Search Functions
```javascript
// Search missing person by case ID
searchMissingByCaseId(caseId)
  .then(result => console.log(result))

// Search found person by found ID
searchFoundById(foundId)
  .then(result => console.log(result))

// Get all cases
getAllCases(limit, type)
  .then(result => console.log(result))
```

#### Utility Functions
```javascript
// Get API health status
getHealthStatus()
  .then(status => console.log(status))

// Get API information
getApiInfo()
  .then(info => console.log(info))
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Workflow

1. **Start Backend**
   ```bash
   cd ../family-finder-aI4life
   docker-compose up -d
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

3. **Make Changes**
   - Edit files in `src/`
   - Hot module replacement will auto-reload
   - Check browser console for errors

4. **Test Changes**
   - Test all upload flows
   - Verify API integration
   - Check responsive design

### Code Style

The project uses ESLint for code quality.

**Run Linter:**
```bash
npm run lint
```

**Key Rules:**
- React hooks rules enforced
- ES6+ syntax preferred
- Consistent formatting
- No console.log in production code

---

## 🏗️ Building for Production

### Build Process

1. **Configure Environment**
   ```bash
   # Update .env with production API URL
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

2. **Build Project**
   ```bash
   npm run build
   ```

3. **Output**
   - Built files in `dist/` directory
   - Optimized and minified
   - Ready for deployment

### Deployment Options

#### Option 1: Static Hosting (Netlify, Vercel)

```bash
# Install CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 2: Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /var/www/family-finder-frontend/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Option 3: Docker

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment Variables in Production

Set environment variables in your hosting platform:
- `VITE_API_BASE_URL`: Backend API URL

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Cannot Connect to API
**Error:** `Network Error` or `ECONNREFUSED`

**Solutions:**
- Verify backend is running: `curl http://localhost:8000/health`
- Check `VITE_API_BASE_URL` in `.env`
- Verify CORS settings in backend
- Check firewall settings

#### 2. CORS Errors
**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solutions:**
- Add frontend URL to backend CORS origins
- Check backend `api/config.py` CORS settings
- Ensure correct API base URL

#### 3. Module Not Found
**Error:** `Cannot find module '...'`

**Solutions:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Build Fails
**Error:** Build errors during `npm run build`

**Solutions:**
- Check for TypeScript/ESLint errors
- Verify all imports are correct
- Check for missing dependencies
- Review console errors

#### 5. Images Not Loading
**Error:** Images not displaying

**Solutions:**
- Check image paths (should be relative to `public/` or imported)
- Verify file extensions
- Check browser console for 404 errors

#### 6. Styling Issues
**Error:** Styles not applying

**Solutions:**
- Verify Tailwind CSS config
- Check PostCSS configuration
- Ensure Tailwind directives in `index.css`
- Clear browser cache

### Debug Mode

Enable debug logging:
```javascript
// In services/apiClient.js
const DEBUG = import.meta.env.VITE_DEBUG === 'true'

if (DEBUG) {
  console.log('API Request:', config)
}
```

---

## 🎨 Styling

### Tailwind CSS

The project uses Tailwind CSS for styling.

**Configuration:** `tailwind.config.js`

**Key Features:**
- Custom color palette
- Dark theme support
- Responsive utilities
- Custom animations

### Customization

**Colors:**
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color',
      }
    }
  }
}
```

**Global Styles:**
Edit `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
```

---

## 📦 Dependencies

### Production Dependencies

- **react** (^19.0.0) - React library
- **react-dom** (^19.0.0) - React DOM bindings
- **react-router-dom** (^7.9.6) - Routing
- **axios** - HTTP client

### Development Dependencies

- **vite** (^7.4) - Build tool
- **@vitejs/plugin-react** - React plugin for Vite
- **tailwindcss** (^3.4) - CSS framework
- **autoprefixer** - CSS post-processor
- **postcss** - CSS processor
- **eslint** - Linter
- **eslint-plugin-react-hooks** - React hooks linting

---

## 🔄 State Management

Currently using React hooks for state management:

- `useState` for component state
- `useEffect` for side effects
- Component props for data flow

For complex state, consider:
- Zustand
- Redux Toolkit
- Context API

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Upload missing person
- [ ] Upload found person
- [ ] Search by case ID
- [ ] Search by found ID
- [ ] View all cases
- [ ] Filter cases
- [ ] Responsive design
- [ ] Error handling
- [ ] Loading states

### Testing Tools

Consider adding:
- Vitest for unit tests
- React Testing Library
- Playwright for E2E tests

---

## 🤝 Contributing

Contributions are welcome!

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Guidelines

- Follow React best practices
- Use functional components and hooks
- Keep components small and focused
- Add comments for complex logic
- Follow ESLint rules

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/thndev05/family-finder-aI4life/issues)
- **Documentation**: See main README in root directory
- **Backend API Docs**: http://localhost:8000/docs (when backend is running)

---

## 🗺️ Roadmap

### Planned Features

- [ ] User authentication
- [ ] Case filtering and sorting
- [ ] Export/import functionality
- [ ] Real-time notifications
- [ ] Advanced search filters
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] PWA support
- [ ] Unit and E2E tests

---

<div align="center">

**Made with ❤️ for families searching for their loved ones**

[⭐ Star us on GitHub](https://github.com/thndev05/family-finder-aI4life) | [🐛 Report Bug](https://github.com/thndev05/family-finder-aI4life/issues) | [💡 Request Feature](https://github.com/thndev05/family-finder-aI4life/issues)

</div>