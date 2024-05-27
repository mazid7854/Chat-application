import express from "express";
const app = express();

/* import routes */
import authRoutes from "./routs/auth.routes.js";

/*  config dotenv */
import dotenv from "dotenv";
import connectMongoDB from "./db.connection/dbConnection.js";
dotenv.config();
const port = process.env.PORT || 5000;

/* cors */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* register routes */
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.json({ msg: "hello world" }));
app.listen(port, () => {
  console.log(` Server running on http://127.0.0.1:${port}`);
  connectMongoDB();
});
