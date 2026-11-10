# CodeMind AI — AI-Powered Software Intelligence Platform
> **Understand. Analyze. Secure. Improve.**

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Babel](https://img.shields.io/badge/Babel-AST%20Parser-yellow.svg)](https://babeljs.io/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-cyan.svg)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-purple.svg)](LICENSE)

CodeMind AI is an enterprise-grade software intelligence and codebase understanding platform developed as a B.Tech Computer Science Major Project. It combines deterministic Abstract Syntax Tree (AST) analysis, cyclomatic complexity profiling, OWASP security scanning, and Google Gemini Retrieval-Augmented Generation (RAG) to understand and evaluate JavaScript/MERN software repositories.

---

## 🌟 Key Functional Modules (12 Interconnected Modules)

1. **Intelligent Repository Analyzer**: Ingest GitHub repositories via URL or local ZIP archives with Zip-Slip path traversal and decompression bomb protection. Includes recursive folder explorer and Monaco Editor syntax preview.
2. **AI Code Review Engine**: Evaluates code across 12 distinct categories (logical bugs, runtime errors, code smells, duplicate code, complexity, error handling, performance bottlenecks, naming conventions). Provides side-by-side before/after fix diffs.
3. **Advanced Security Analyzer**: Scans for exposed credentials (AWS keys, GitHub tokens, JWTs, DB URIs) and OWASP Top 10 vulnerabilities (`eval()`, React XSS via `dangerouslySetInnerHTML`, SQL/NoSQL injection).
4. **Software Architecture Visualization**: Generates interactive React Flow architecture maps connecting React components, Express routes, controllers, and Mongoose database models from actual AST import/export relationships.
5. **AI Codebase Chat with RAG**: Repository-grounded AI conversational assistant using AST-based chunking and vector retrieval with exact source line citations and prompt hardening against injection.
6. **API Intelligence**: Automatically discovers Express route definitions, middleware chains, parameters, and authentication requirements, and exports compliant OpenAPI 3.0 JSON specifications.
7. **Automated Test Generator**: Synthesizes Jest and React Testing Library unit, edge-case, and negative test suites with mocked dependencies and one-click test file download.
8. **AI Refactoring Assistant**: Guides code simplification, performance tuning, and modernization with side-by-side code diffs, expected benefits, and potential side-effect analyses.
9. **Dependency Intelligence**: Analyzes `package.json` dependencies, compares them against AST import occurrences to detect unused packages, and identifies known vulnerable libraries.
10. **Project Health Dashboard**: Real-time DB analytics displaying Code Quality, Security, Complexity, Dependency Health, and Test Coverage scores calculated via transparent, documented mathematical formulas.
11. **Team Workspaces & RBAC**: Multi-user collaboration with Role-Based Access Control (Owner, Admin, Developer, Viewer), member invitations, and audit timelines.
12. **Code Evolution & Historical Analysis**: Stable SHA256 finding fingerprints track newly introduced, resolved, and persistent issues across previous commits and analysis runs.

---

## 🛠 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM v7, Framer Motion, Lucide React, Recharts, React Flow (`@xyflow/react`), Monaco Editor (`@monaco-editor/react`).
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, bcryptjs, Multer, PDFKit, BullMQ, ioredis.
- **Code Intelligence**: `@babel/parser`, `@babel/traverse`, `@babel/types`, ESLint, fast-glob, minimatch.
- **AI & RAG**: Google Gemini API (`@google/generative-ai`), dense embeddings, in-memory cosine vector store with TF-IDF fallback.

---

## 🎨 macOS Liquid Glass Design System

CodeMind AI features a dark-first visual experience inspired by macOS Liquid Glass and Apple visionOS:
- Deep midnight background (`#030712`, `#060B18`) with cyan and violet ambient highlights.
- Frosted glass cards and panels with `backdrop-blur-md` and translucent borders.
- Reusable glass design system: `GlassCard`, `GlassPanel`, `GlassModal`, `GlassButton`, `GlassInput`, `AnimatedMetricCard`, `SeverityBadge`, `StatusBadge`, `DiffViewer`.
- Smooth transitions powered by Framer Motion.

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)
- MongoDB (Running locally on `mongodb://localhost:27017` or MongoDB Atlas URI)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-team/codemind-ai.git
cd CodeAnalyzer

# Install all workspace dependencies
npm install
```

### 3. Environment Configuration
Create `.env` files from the provided templates:
```bash
cp backend/.env.example backend/.env
cp worker/.env.example worker/.env
cp frontend/.env.example frontend/.env
```
*(Optional: Add your `GEMINI_API_KEY` in `backend/.env` for live Google Gemini LLM synthesis. The system operates in offline heuristic fallback mode if no key is provided).*

### 4. Run Automated Tests
```bash
npm test
```
*(Runs all 4 test suites: Code Intelligence, Security Scanning, API Health, and End-to-End Pipeline Integration without any paid API keys).*

### 5. Start the Application
Start backend, frontend, and worker concurrently:
```bash
# Terminal 1: Backend API (Port 5000)
npm run dev:backend

# Terminal 2: Frontend Client (Port 5173)
npm run dev:frontend

# Terminal 3: Background Worker (Optional)
npm run dev:worker
```

Open your browser at `http://localhost:5173`.

---

## 🐳 Docker Deployment
Run the complete stack (MongoDB, Redis, Backend, Worker, Frontend) via Docker Compose:
```bash
docker-compose up --build
```

---

## 🎓 Academic Documentation Package
Comprehensive academic materials tailored for B.Tech Major Project evaluations are available in `docs/academic/`:
- **Complete Academic Report**: `docs/academic/ACADEMIC_REPORT.md` (Abstract, Problem Statement, Literature Review, SRS, Level 0/1/2 DFDs, UML Use Case, UML Class Diagram, Sequence Diagrams, Testing Results, Limitations & References).
- **Development & Team Ownership Guide**: `DEVELOPMENT_GUIDE.md`
- **Testing Verification Document**: `TESTING.md`

---

## ⚖️ License
This project is licensed under the ISC License.

