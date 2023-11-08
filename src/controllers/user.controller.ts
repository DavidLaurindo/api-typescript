import {
  createUser,
  deleteUser,
  getAll,
  getById,
  isEmailRegistered,
  updateUser,
} from "../repositorys/user.repository"
import { Response, Request } from "express"
import bcrypt from "bcrypt"
import createUserValidator from "../validator/create.user.validator"

//Criando novo usuário
export async function create(req: Request, res: Response) {
  try {
    const { error, value } = createUserValidator.validate(req.body)
    if (error) {
      return res
        .status(400)
        .send(error.details.map((err) => err.message).join(", "))
    }

    //Verificar Email no Banco
    const email = value.email
    const isRegistered = await isEmailRegistered(email)

    if (isRegistered) {
      return res.status(409).send("Usuário já cadastrado")
    } else {
      const hashPassword = await bcrypt.hash(value.password, 10)
      value.password = hashPassword
      const user = await createUser(value)
      res.status(200).send(user)
    }
  } catch (error) {
    res.status(400).send(error)
  }
}

//Buscar todos usuários
export async function get(req: Request, res: Response) {
  try {
    const skip = Number(req?.query?.skip) || 0
    const take = Number(req?.query.take) || 20
    const users = await getAll(skip, take)
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
