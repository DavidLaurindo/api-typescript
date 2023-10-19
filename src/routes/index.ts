import { userRoutes } from "./user.routes"
import { Express } from "express"

export = (app: Express) => {
  userRoutes(app)
}
