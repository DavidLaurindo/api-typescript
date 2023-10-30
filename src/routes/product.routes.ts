import { Express } from "express"
import {
  create,
  get,
  getId,
  remove,
  update,
} from "../controllers/product.controller"

export function productRoutes(app: Express) {
  app.post("/product", create)
  app.get("/product", get)
  app.get("/product/:id", getId)
  app.put("/product/:id", update)
  app.delete("/product/:id", remove)
}
