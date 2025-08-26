import { Router } from "express";
import { MusicController } from "../controllers/musicController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
const musicController = new MusicController();

router.use(authMiddleware);

/**
 * @swagger
 * /music:
 *   post:
 *     summary: Create a new music track
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *             example:
 *               title: Sample Track
 *               artist: Sample Artist
 *               album: Sample Album
 *               user_id: 1
 *     responses:
 *       201:
 *         description: Music track created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", musicController.create.bind(musicController));

/**
 * @swagger
 * /music/user/{user_id}:
 *   get:
 *     summary: Retrieve all music tracks for a specific user
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: All music tracks
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:user_id", musicController.getByUser.bind(musicController));

/**
 * @swagger
 * /music/{id}:
 *   get:
 *     summary: Retrieve a single music track by me
 *     responses:
 *      200:
 *         description: all music tracks
 *      401:
 *         description: Unauthorized
 */

router.get("/:id", musicController.getById.bind(musicController));

/**
 * @swagger
 * /music/{id}:
 *   put:
 *     summary: Update a music track by ID
 *     responses:
 *       200:
 *         description: Music track updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Music track not found
 */
router.put("/:id", musicController.update.bind(musicController));

/**
 * @swagger
 * /music/{id}:
 *   delete:
 *     summary: Delete a music track by ID
 *     responses:
 *       200:
 *         description: Music track deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Music track not found
 */
router.delete("/:id", musicController.delete.bind(musicController));

export default router;
