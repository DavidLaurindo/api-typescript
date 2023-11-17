import { Express } from "express"
import { login } from "../controllers/auth.controller"

export function authRoutes(app: Express) {
  app.get("/auth", login)
}
