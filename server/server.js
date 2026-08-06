import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import noteRoute from "./routes/note.route.js";

dotenv.config(); // it helps us to access env data in all project

const app = express();

// Middleware
app.use(cors()); // helps frontend to acces backend apis
app.use(express.json()); // it converts json data into js boject

// Connect Database
connectDB();

// User Routes
app.use("/api", userRoutes);

//Note Routes
app.use("/api", noteRoute);

app.get("/", (req, res) => {
  res.send("Server is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
