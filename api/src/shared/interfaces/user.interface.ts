import { User } from '@prisma/client'

export interface UserRegister {
  name: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserDocument extends User {}

export type UserInRes = Omit<
  UserDocument,
  'password' | 'createdAt' | 'updatedAt'
> & {
  token: string
}

export interface UserReturn {
  message: string
  user: UserInRes
}
