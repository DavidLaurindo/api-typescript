import { ProductInfo } from "../interfaces/user.interface"
import { prisma } from "../services/prisma"

//Criando novo produto
export async function createProduct(data: ProductInfo) {
  const product = await prisma.product.create({
    data,
  })
  return product
}

//Buscar todos os produtos
export async function getAll(skip: number, take: number) {
  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        createdAt: false,
        updatedAt: false,
      },
      skip,
      take,
    }),
    prisma.product.count(),
  ])
  const totalPage = Math.ceil(total / take)
  return { total, totalPage, products }
}

//Buscar por id
export async function getById(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: false,
      name: true,
      price: true,
      description: true,
    },
  })
  return product
}

//Atualizar
export async function updateProduct(id: string, data: ProductInfo) {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data,
  })
  return product
}

//Deletar
export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: {
      id,
    },
  })
  return
}
