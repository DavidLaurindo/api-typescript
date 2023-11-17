import { authRoutes } from "./auth.routes"
import { productRoutes } from "./product.routes"
import { userRoutes } from "./user.routes"
import { Express } from "express"

export = (app: Express) => {
  userRoutes(app)
  productRoutes(app)
  authRoutes(app)
}
