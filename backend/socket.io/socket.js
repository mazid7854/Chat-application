import { Server } from "socket.io";

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
      onlineUsers.set(userId, socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.keys())); // Broadcast online users
    });

    // socket.on("sendMessage", (data) => {
    //   const { conversationId, message, receiverId } = data;

    //   // Send message only to receiver if online
    //   // const receiverSocketId = onlineUsers.get(receiverId);
    //   // if (receiverSocketId) {
    //   //   io.to(receiverSocketId).emit("receiveMessage", {
    //   //     conversationId,
    //   //     message,
    //   //   });
    //   // }
    // });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
};

// Helper functions to access socket instance and online users
export const getIoInstance = () => ioInstance;
export const getOnlineUsers = () => onlineUsers;
