import {
  createUser,
  deleteUser,
  getAll,
  getById,
  updateUser,
} from "../repositorys/user.repository"
import { Response, Request } from "express"

//Criando novo usuário
export async function create(req: Request, res: Response) {
  try {
    const user = await createUser(req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Buscar todos usuários
export async function get(req: Request, res: Response) {
  try {
    const users = await getAll()
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Buscar por ID
export async function getId(req: Request, res: Response) {
  try {
    const user = await getById(req.params.id)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Atualizar
export async function update(req: Request, res: Response) {
  try {
    const user = await updateUser(req.params.id, req.body)
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Deletar
export async function remove(req: Request, res: Response) {
  try {
    await deleteUser(req.params.id)
    res.status(200).send()
  } catch (error) {
    res.status(400).send(error)
  }
}
