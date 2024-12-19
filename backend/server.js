"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/server.ts
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Create an HTTP server
const server = http_1.default.createServer(app);
// Create a WebSocket server
const wss = new ws_1.Server({ server });
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
