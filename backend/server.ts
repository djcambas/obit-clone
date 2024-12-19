// backend/server.ts
import express from 'express';
import { Server } from 'ws';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 3000;

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