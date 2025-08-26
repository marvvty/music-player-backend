import { Router } from "express";
import { PlaylistController } from "../controllers/playlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();
const playlistController = new PlaylistController();
router.use(authMiddleware);

/**
 * @swagger
 * /playlist:
 *   post:
 *     summary: create a playlist
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", playlistController.create.bind(playlistController));

/**
 * @swagger
 * /playlist/add-music:
 *   post:
 *     summary: add music to playlist
 *     responses:
 *       200:
 *         description: Music added to playlist successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/add-music",
  playlistController.addMusicToPlaylist.bind(playlistController)
);

/**
 * @swagger
 * /playlist/{id}:
 *   get:
 *     summary: Retrieve a single playlist by ID
 *     responses:
 *       200:
 *         description: A single playlist
 *       404:
 *         description: Playlist not found
 */
router.get("/:id", playlistController.getById.bind(playlistController));

/**
 * @swagger
 * /playlist/user/{user_id}:
 *   get:
 *     summary: Retrieve a list of playlists by user
 *     responses:
 *       200:
 *         description: A list of playlists
 *       401:
 *         description: Unauthorized
 */
router.get(
  "/user/:user_id",
  playlistController.getByUser.bind(playlistController)
);

/**
 * @swagger
 * /playlist/{id}:
 *   put:
 *     summary: Update a playlist by ID
 *     responses:
 *       200:
 *         description: Playlist updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Playlist not found
 */
router.put("/:id", playlistController.update.bind(playlistController));

/**
 * @swagger
 * /playlist/{id}:
 *   delete:
 *    summary: Delete a playlist by ID
 *   responses:
 *    200:
 *      description: Playlist deleted successfully
 *   401:
 *    description: Unauthorized
 *    500:
 *      description: Internal server error
 */
router.delete("/:id", playlistController.delete.bind(playlistController));

export default router;
