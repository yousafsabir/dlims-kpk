import db from '@/shared/config/db'
import type {
  UserRegister,
  UserDocument,
} from '@/shared/interfaces/user.interface'
import { hashPassword } from '@/shared/utils/bcrypt'

//* Hash Password Middleware
db.$use(async (params, next) => {
  if (params.action === 'create' && params.model === 'User') {
    const user = params.args.data
    user.password = await hashPassword(user.password)
  }
  return await next(params)
})

const userFieldsToReturn = {
  id: true,
  name: true,
  email: true,
}

//* User CRUD
export async function createUser(user: UserRegister) {
  return await db.user.create({
    data: user,
    select: userFieldsToReturn,
  })
}

export async function getUser(user: Partial<UserDocument>) {
  return await db.user.findFirst({
    where: {
      ...user,
    },
    select: userFieldsToReturn,
  })
}

export async function getUserById(id: string) {
  return await db.user.findUnique({
    where: {
      id,
    },
  })
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  })
}

export async function getUsers(user: Partial<UserDocument>) {
  return await db.user.findMany({
    where: {
      ...user,
    },
    select: userFieldsToReturn,
  })
}

export async function updateUser(id: string, user: Partial<UserDocument>) {
  return await db.user.update({
    where: {
      id,
    },
    data: user,
    select: userFieldsToReturn,
  })
}

export async function deleteUser(id: string) {
  return await db.user.delete({
    where: { id },
    select: userFieldsToReturn,
  })
}

const userService = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  getUsers,
  updateUser,
  deleteUser,
}

export default userService
