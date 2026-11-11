import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import env from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import workspaceRoutes from './routes/workspaceRoutes.js';
import repositoryRoutes from './routes/repositoryRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import codeReviewRoutes from './routes/codeReviewRoutes.js';
import securityRoutes from './routes/securityRoutes.js';
import architectureRoutes from './routes/architectureRoutes.js';
import apiIntelligenceRoutes from './routes/apiIntelligenceRoutes.js';
import testGeneratorRoutes from './routes/testGeneratorRoutes.js';
import refactoringRoutes from './routes/refactoringRoutes.js';
import dependencyRoutes from './routes/dependencyRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import collaborationRoutes from './routes/collaborationRoutes.js';
import evolutionRoutes from './routes/evolutionRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

const app = express();

// Security & Parsing Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return callback(null, true);
      if (env.CORS_ORIGINS.includes(origin) || origin.startsWith('http://localhost')) {
        return callback(null, true);
      }
      return callback(null, true); // Dev-friendly permissive origin
    },
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'CodeMind AI Core Backend',
    environment: env.NODE_ENV,
  });
});

// Mount Module Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/repositories', repositoryRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/code-review', codeReviewRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/architecture', architectureRoutes);
app.use('/api/api-intelligence', apiIntelligenceRoutes);
app.use('/api/tests', testGeneratorRoutes);
app.use('/api/refactoring', refactoringRoutes);
app.use('/api/dependencies', dependencyRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/api/evolution', evolutionRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);

// 404 Route Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`,
  });
});

// Centralized Error Handler
app.use(errorHandler);

export default app;

