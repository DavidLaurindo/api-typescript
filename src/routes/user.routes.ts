import { create } from "../controllers/user.controller"
import { Express } from "express"

export function userRoutes(app: Express) {
  app.post("/user", create)
}
