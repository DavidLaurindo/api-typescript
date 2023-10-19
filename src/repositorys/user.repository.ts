import { prisma } from "../services/prisma"

interface CreateUserInput {
  name: string
  email: string
  password: string
}

export async function createUser(data: CreateUserInput) {
  const user = await prisma.user.create({
    data,
  })
  return user
}
