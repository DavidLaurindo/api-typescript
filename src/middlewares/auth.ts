import { NextFunction, Response, Request } from "express"
import { verify } from "jsonwebtoken"
import { JwtPayload } from "../interfaces/jwt.interface"

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ msg: "Token não existe" })
  }

  const token = authorization.split(" ")[1]

  const passJwt = process.env.SECRET as string

  try {
    const decoded = verify(token, passJwt)
    const { id } = decoded as JwtPayload

    req.userId = id

    next()
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" })
  }
}
