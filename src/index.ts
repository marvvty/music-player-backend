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
import { MusicController } from "./controllers/musicController.js";
import { PlaylistController } from "./controllers/playlistController.js";

dotenv.config({ path: "./.env" });
const app = express();
export const prisma = new PrismaClient();
const specs = swaggerJsdoc(swaggerOptions);
const musicController = new MusicController();
const playlistController = new PlaylistController();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.get("/music", musicController.getAll.bind(musicController));
app.get("/playlist", playlistController.getAll.bind(playlistController));
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
