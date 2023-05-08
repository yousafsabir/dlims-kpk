export interface UserRegister {
  name: string
  email: string
  password: string
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserDocument extends UserRegister {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type UserInRes = Omit<UserDocument, 'password' | 'createdAt' | 'updatedAt'> & {
  token: string
}

export interface UserReturn {
  message: string
  user: UserInRes
}
