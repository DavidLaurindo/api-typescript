import {
  create,
  get,
  getId,
  update,
  remove,
} from "../controllers/user.controller"
import { Express } from "express"

export function userRoutes(app: Express) {
  app.post("/user", create)
  app.get("/user", get)
  app.get("/user/:id", getId)
  app.put("/user/:id", update)
  app.delete("/user/:id", remove)
}
