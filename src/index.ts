import express from "express"
import { config } from "dotenv"

config()

const app = express()
app.use(express.json())

const port = process.env.PORT

app.get("/", (req, res) => {
  res.send({ msg: "hello world!" })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
