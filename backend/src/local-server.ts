import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Make environment variables available in request object
declare global {
  namespace Express {
    interface Request {
      env: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      };
      userId?: string;
    }
  }
}

// Add environment variables to request object
app.use((req, res, next) => {
  req.env = {
    DATABASE_URL: process.env.DATABASE_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || ''
  };
  next();
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com', 'http://localhost:5173'] 
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/blog', blogRouter);

// Health check route
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    env: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/v1/`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 