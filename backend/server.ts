// backend/server.ts
import express from 'express';
import { Server } from 'ws';
import http from 'http';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes';
import dotenv from 'dotenv';
dotenv.config();  // Add this at the very top

console.log('JWT_SECRET available:', !!process.env.JWT_SECRET);

const app = express();
app.use(cors({
  origin: ['http://127.0.0.1:51264', 'http://localhost:5173'],  // Explicitly allow your GameMaker origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  credentials: true,
}));
// Add preflight handling
app.options('*', cors());
// Ensure CORS headers are always sent

app.use((req, res, next) => {
  // Use a function to check against allowed origins
  const allowedOrigins = ['http://127.0.0.1:51264', 'http://localhost:5173'];
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  next();
});
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3001;

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new Server({ server });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Handle incoming messages
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Echo the message back to the client
    ws.send(`You said: ${message}`);
  });

  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the Express server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});