import express from "express"
import { config } from "dotenv"

config()

const app = express()
app.use(express.json())

const port = process.env.PORT

import userRoutes from "../src/routes/index"
userRoutes(app)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
