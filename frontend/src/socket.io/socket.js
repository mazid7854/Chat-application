import { io } from "socket.io-client";

export const socket = io("https://chat-application-uilo.onrender.com", {
  autoConnect: false, // Prevent auto-connection, we'll handle it manually
  withCredentials: true, // Allow cookies for authentication if needed
  transports: ["websocket"], // Force WebSocket (improves stability)
});

export default socket;
