import express from "express";
import authRoutes from "./routes/authRoute.js";
import musicRoutes from "./routes/musicRoute.js";
import playlistRoutes from "./routes/playlistRoute.js";
import { PrismaClient } from "../generated/prisma/index.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./swagger/swaggerOptions.js";
import path from "path";
import cors from "cors";

dotenv.config({ path: "./.env" });
const app = express();
export const prisma = new PrismaClient();
const specs = swaggerJsdoc(swaggerOptions);

app.use(cors());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/music", musicRoutes);
app.use("/playlist", playlistRoutes);
app.use("/swaga", swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  "/uploads/music",
  express.static(path.join(process.cwd(), "uploads", "music"))
);

app.listen(2828, () => {
  console.log("Server is running on http://localhost:2828");
});
