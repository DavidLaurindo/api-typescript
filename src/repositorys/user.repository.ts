import { prisma } from "../services/prisma"
import { UserInfo } from "../interfaces/user.interface"

//Verificar Usuário:
export async function isUserRegistered(name: string): Promise<boolean> {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ name }, { email: name }],
    },
  })
  return !!existingUser
}

//Criando novo usuário
export async function createUser(data: UserInfo) {
  const user = await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      password: false,
      email: true,
    },
  })
  return user
}

//Buscar todos usuários(com paginação)
export async function getAll(skip: number, take: number) {
  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        password: false,
        email: true,
        createdAt: false,
        updatedAt: false,
      },
      skip,
      take,
    }),
    prisma.user.count(),
  ])
  const totalPage = Math.ceil(total / take)

  return { total, totalPage, users }
}

/*
//Antes da paginação(Buscar todos usuários)
export async function getAll() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      password: false,
      email: true,
    },
  })
  return users
}
*/

//Buscar por ID
export async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      password: false,
      email: true,
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
    select: {
      id: false,
      name: true,
      email: true,
      password: false,
      createdAt: false,
      updatedAt: false,
    },
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
