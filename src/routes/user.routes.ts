import {
  create,
  get,
  getId,
  update,
  remove,
} from "../controllers/user.controller"
import { Express } from "express"
import { authMiddleware } from "../middlewares/auth"

export function userRoutes(app: Express) {
  app.post("/user", create)
  app.get("/user", get)
  app.get("/user/:id", authMiddleware, getId)
  app.put("/user/:id", authMiddleware, update)
  app.delete("/user/:id", authMiddleware, remove)
}
