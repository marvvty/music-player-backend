import { Request, Response } from "express";
import { AuthService } from "../services/authService.js";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const createUser = await authService.register(req.body);

      res.json(createUser);
      res
        .status(201)
        .json({ message: "User registered successfully", createUser });
    } catch (error) {
      console.error("User registration error:", error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await authService.login(req.body);

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async me(req: Request, res: Response) {
    try {
      if (!req.user_id) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const user = await authService.me(req.user_id);

      res.json(user);
      res
        .status(200)
        .json({ message: "User data retrieved successfully", user });
    } catch (error) {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
