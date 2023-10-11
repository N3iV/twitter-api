import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenPayload } from '~/models/requests/Users.requests'

dotenv.config()

interface JWTPayload {
  payload: string | object | Buffer
  options?: jwt.SignOptions
  privateKey?: string
}

export const signToken = ({
  payload,
  options = {
    algorithm: 'HS256'
  },
  privateKey = process.env.JWT_SECRET as string
}: JWTPayload) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) throw reject(err)

      return resolve(String(token))
    })
  })
}

export const verifyToken = async ({
  token,
  secretOrPublicKey = process.env.JWT_SECRET as string
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decoded) => {
      if (error) throw reject(error)
      resolve(decoded as TokenPayload)
    })
  })
}
