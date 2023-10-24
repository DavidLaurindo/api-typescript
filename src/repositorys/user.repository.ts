import { prisma } from "../services/prisma"
import { UserInfo } from "../interfaces/user.interface"

//Criando novo usuário
export async function createUser(data: UserInfo) {
  const user = await prisma.user.create({
    data,
  })
  return user
}

//Buscar todos usuários
export async function getAll() {
  const users = await prisma.user.findMany({})
  return users
}

//Buscar por ID
export async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}

//Atualizar
export async function updateUser(id: string, data: UserInfo) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  })
  return user
}

//Deletar
export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  })
  return
}
