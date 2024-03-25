import * as dotenv from "dotenv";
import express from "express";
import * as mongoose from "mongoose";
import cors from "cors";

import workoutRoutes from "./routers/workouts";
import userRoutes from "./routers/user";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(
  cors({
    origin: ["https://workout-tracker-client-rho.vercel.app/"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONG_URI ?? "default_connection_string")
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(
        `Connected to database and service listening on port ${port}`
      );
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
