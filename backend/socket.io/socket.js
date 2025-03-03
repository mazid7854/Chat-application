import { Server } from "socket.io";
import User from "../model/userModel.js";
import mongoose from "mongoose";

const onlineUsers = new Map(); // Store online users (userId -> socketId)
let ioInstance; // Store io instance

export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  ioInstance = io; // Store io instance

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("userConnected", (userId) => {
      if (userId) {
        onlineUsers.set(userId, socket.id);
        io.emit("onlineUsers", Array.from(onlineUsers.keys())); // Broadcast online users
      }
    });

    // Handle "typing" event
    socket.on("userTyping", ({ senderId, recipientId }) => {
      const recipientSocketId = onlineUsers.get(recipientId);

      io.emit("userTyping", { senderId });
    });

    // Handle "stopTyping" event
    socket.on("userStoppedTyping", ({ senderId, recipientId }) => {
      const recipientSocketId = onlineUsers.get(recipientId);

      io.emit("userStoppedTyping", { senderId });
    });

    socket.on("disconnect", async () => {
      let disconnectedUserId = null;

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys())); // Update online users list
      console.log("A user disconnected:", socket.id);

      if (disconnectedUserId) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            disconnectedUserId,
            { lastSeen: new Date() },
            { new: true, runValidators: true }
          );
        } catch (error) {
          console.error("Error updating last seen:", error);
        }
      }
    });
  });

  return io;
};

// Helper functions to access socket instance and online users
export const getIoInstance = () => ioInstance;
export const getOnlineUsers = () => onlineUsers;
