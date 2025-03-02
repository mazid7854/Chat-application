import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  autoConnect: false, // Prevent auto-connection, we'll handle it manually
  withCredentials: true, // Allow cookies for authentication if needed
  transports: ["websocket"], // Force WebSocket (improves stability)
});

export default socket;
