# Text-to-Learn: AI-Powered Course Generator

> Enter a topic → get a complete, structured online course with rich content, quizzes, videos, Hinglish audio, and PDF export.

## Overview

Text-to-Learn is a full-stack web application that transforms any user-submitted topic into a multi-module course. Powered by Google Gemini for AI content generation, it delivers structured lessons with headings, paragraphs, code blocks, interactive MCQs, YouTube video suggestions, and multilingual audio explanations.

## Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Frontend   | React 18 · Vite · Chakra UI · React Router v6     |
| Backend    | Node.js · Express · MongoDB (Mongoose)            |
| Auth       | Auth0 (OAuth 2.0 + JWT)                           |
| AI         | Google Gemini API                                 |
| Video      | YouTube Data API v3                               |
| PDF Export | jsPDF + html2canvas                               |
| Deploy     | Vercel (frontend) · Render (backend)              |

## Project Structure

```
text-to-learn/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level views
│   │   ├── hooks/        # Custom React hooks
│   │   ├── context/      # Context providers
│   │   ├── utils/        # API helpers, utilities
│   │   ├── App.jsx       # Root component with routing
│   │   ├── main.jsx      # Vite entry point
│   │   └── theme.js      # Chakra UI custom theme
│   └── package.json
├── server/               # Express backend
│   ├── config/           # DB connection, env setup
│   ├── controllers/      # Route business logic
│   ├── middlewares/       # Auth, error handling, validation
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API endpoint definitions
│   ├── services/         # External service integrations (AI, YouTube)
│   ├── utils/            # Utility functions
│   └── server.js         # Application entry point
├── .gitignore
├── package.json          # Root workspace scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- MongoDB Atlas cluster (or local MongoDB instance)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/text-to-learn.git
cd text-to-learn

# Install all dependencies (root + server + client)
npm install
npm run install:all
```

### Environment Variables

Copy the example files and fill in your credentials:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**Server (`server/.env`):**

| Variable         | Description                         |
| ---------------- | ----------------------------------- |
| `PORT`           | Server port (default: 5000)         |
| `MONGO_URI`      | MongoDB connection string           |
| `AUTH0_ISSUER`   | Auth0 domain URL (Phase 2)          |
| `AUTH0_AUDIENCE` | Auth0 API identifier (Phase 2)      |
| `GEMINI_API_KEY` | Google Gemini API key (Phase 3)     |
| `YOUTUBE_API_KEY`| YouTube Data API key (Phase 6)      |

### Running Locally

```bash
# Start both server and client concurrently
npm run dev

# Or run individually:
npm run dev:server   # Express on http://localhost:5000
npm run dev:client   # Vite dev server on http://localhost:3000
```

### Verify

- **Health check:** `GET http://localhost:5000/api/health`
- **Frontend:** Open `http://localhost:3000` — you should see the landing page with a system status card.

## Development Phases

| Phase | Description                                       | Status |
| ----- | ------------------------------------------------- | ------ |
| 1     | Scaffolding, Express server, MongoDB models       | ✅     |
| 2     | Auth0 integration (backend + frontend)            | ⬜     |
| 3     | AI prompt engine + course generation API          | ⬜     |
| 4     | Frontend core UI + course display                 | ⬜     |
| 5     | Lesson rendering + rich content blocks            | ⬜     |
| 6     | YouTube video integration                         | ⬜     |
| 7     | Hinglish audio explanations (Gemini TTS)          | ⬜     |
| 8     | PDF export                                        | ⬜     |
| 9     | Polish, error handling, UX                        | ⬜     |
| 10    | Deployment, CI/CD, documentation                  | ⬜     |

## License

MIT
