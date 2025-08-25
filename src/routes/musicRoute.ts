import { Router } from "express";
import { MusicController } from "../controllers/musicController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
const musicController = new MusicController();

router.use(authMiddleware);

router.post("/", musicController.create.bind(musicController));
router.get("/user/:user_id", musicController.getByUser.bind(musicController));
router.get("/:id", musicController.getById.bind(musicController));
router.put("/:id", musicController.update.bind(musicController));
router.delete("/:id", musicController.delete.bind(musicController));

export default router;
