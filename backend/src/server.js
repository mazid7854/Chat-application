import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { initializeSocket } from "./socket.io/socket.js"; // Import socket setup
import path from "path";

/* import routes */
import authRoutes from "./routs/auth.routes.js";
import messageRoutes from "./routs/message.routes.js";
import userRoutes from "./routs/user.routes.js";
import fileRoutes from "./routs/file.routes.js";

/*  config dotenv */
import dotenv from "dotenv";
import connectMongoDB from "./db.connection/dbConnection.js";
dotenv.config();
const port = process.env.PORT || 5000;

/* socket.io */
const server = createServer(app); // Create HTTP server

// Initialize socket.io
const io = initializeSocket(server);

/* cors */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://obrolan.in/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* middlewares */
app.use(express.json({ limit: "10mb" })); // parse json
app.use(express.urlencoded({ limit: "10mb", extended: true })); // parse form data
app.use(cookieParser()); // parse cookies

/* register routes */
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.get("/", (req, res) => res.json({ msg: "hello world" }));
server.listen(port, () => {
  console.log(` Server running on http://127.0.0.1:${port}`);
  connectMongoDB();
});
