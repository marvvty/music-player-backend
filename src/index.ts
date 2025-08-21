import express from "express";
import authRoutes from "./routes/authRoute.js";
import { PrismaClient } from "./generated/prisma/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const app = express();

export const prisma = new PrismaClient();

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(2828, () => {
  console.log("Server is running on http://localhost:2828");
});
