import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/mongoDBConfig.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);

// Sends user friendly errors
app.use(errorMiddleware);

const startServer = async () => {
  await connectDB(); // Wait for the MongoDB connection to succeed

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
};

// Start the server after DB connection
startServer();
