import { Request, Response } from "express"
import {
  createProduct,
  deleteProduct,
  getAll,
  getById,
  updateProduct,
} from "../repositorys/product.repository"

//Criando novo produto
export async function create(req: Request, res: Response) {
  try {
    const product = await createProduct(req.body)
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Buscar todos os produtos
export async function get(req: Request, res: Response) {
  try {
    const skip = Number(req?.query?.skip) || 0
    const take = Number(req?.query?.take) || 20
    const products = await getAll(skip, take)
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Buscar por ID
export async function getId(req: Request, res: Response) {
  try {
    const product = await getById(req.params.id)
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Atualizar
export async function update(req: Request, res: Response) {
  try {
    const product = await updateProduct(req.params.id, req.body)
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send(error)
  }
}

//Deletar
export async function remove(req: Request, res: Response) {
  try {
    await deleteProduct(req.params.id)
    res.status(200).send()
  } catch (error) {
    res.status(400).send(error)
  }
}
