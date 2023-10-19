import { createUser } from "../repositorys/user.repository"
import { Response, Request } from "express"

export async function create(req: Request, res: Response) {
  try {
    const user = await createUser(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}
