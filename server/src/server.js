import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import homeworkRoutes from "./routes/homeworkRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import mcqAttemptRoutes from "./routes/mcqAttemptRoutes.js";
import liveSessionRoutes from "./routes/liveSessionRoutes.js";
import crosswordRoutes from "./routes/crosswordRoutes.js";
import fillBlankRoutes from "./routes/fillBlankRoutes.js";
import wordMatchRoutes from "./routes/wordMatchRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import googleRoutes from "./routes/googleRoutes.js";
import sendEmail from "./utils/sendEmail.js";

const app = express();

const PORT = process.env.PORT || 8080;

// DATABASE

connectDB();

// CORS

app.use(
  cors({
    origin: ["http://localhost:5173", process.env.CLIENT_URL],
    credentials: true,
  }),
);

// STATIC FOLDER

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

// BODY PARSER

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

// API TEST ROUTE

app.get("/", (req, res) => {
  res.send("<h1>API working fine!</h1>");
});

app.get("/test-email", async (req, res) => {
  try {
    await sendEmail({
      email: "yourpersonalemail@gmail.com",
      subject: "Test Email",
      message: "Email service is working.",
    });

    res.send("Email sent successfully");
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
});
// ROUTES

app.use("/api/users", userRoutes);
app.use("/api/homework", homeworkRoutes);
app.use("/api/mcq", mcqRoutes);
app.use("/api/mcq-attempts", mcqAttemptRoutes);
app.use("/api/live-sessions", liveSessionRoutes);
app.use("/api/crossword", crosswordRoutes);
app.use("/api/fill-blanks", fillBlankRoutes);
app.use("/api/word-match", wordMatchRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/google", googleRoutes);

// ERROR MIDDLEWARE

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port: ${PORT}`);
});
