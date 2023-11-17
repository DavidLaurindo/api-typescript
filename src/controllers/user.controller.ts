import {
  createUser,
  deleteUser,
  getAll,
  getById,
  isUserRegistered,
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

    //Verificar user e email no banco:
    const { email, name } = value

    //Verificar Email;
    const emailRegistered = await isUserRegistered(email)
    if (emailRegistered) {
      return res.status(409).send("Email já cadastrado")
    }

    //Verificar Usuário;
    const nameRegistered = await isUserRegistered(name)
    if (nameRegistered) {
      return res.status(409).send("Nome de usuário já cadastrado")
    }

    const hashPassword = await bcrypt.hash(value.password, 10)
    value.password = hashPassword
    const user = await createUser(value)
    res.status(200).send(user)
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
