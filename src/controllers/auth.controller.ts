import { prisma } from "../services/prisma"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

export const isEmailRegistered = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return !!existingUser
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Verificar Usuário
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(401).json({ msg: "Usuário não encontrado" })
  }

  // Verificar password
  const passwordMatch = await bcrypt.compare(password, user.password)
  if (!passwordMatch) {
    return res.status(401).json({ msg: "Senha inválida" })
  }

  const SECRET = process.env.SECRET
  const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: "30min" })
  res.status(200).json({ msg: "Autentificação relizada com sucesso", token })
}
