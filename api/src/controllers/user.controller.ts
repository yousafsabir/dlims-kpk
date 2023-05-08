import { NextFunction } from 'express'
import userService from '@/services/user.service'
import type {
  UserRegister,
  UserLogin,
  UserReturn,
} from '@/shared/interfaces/user.interface'
import { TypedRequest, TypedResponse } from '@/shared/utils/genericTypeUtils'
import asyncHandler from '@/shared/utils/asyncHandler'
import HttpEception from '@/shared/utils/HttpEception'
import { comparePassword } from '@/shared/utils/bcrypt'
import { generateToken } from '@/shared/utils/jwt'
import TrimUser from '@/shared/utils/trimUser'

export const registerUser = asyncHandler(
  async (
    req: TypedRequest<UserRegister>,
    res: TypedResponse<UserReturn>,
    next: NextFunction
  ) => {
    try {
      const user = await userService.createUser(req.body)
      return res.status(201).json({
        message: 'User Created',
        user: new TrimUser({ ...user, token: generateToken(user.id) }),
      })
    } catch (err) {
      next(new HttpEception(500, 'Internal Server Error'))
    }
  }
)

export const loginUser = async function (
  req: TypedRequest<UserLogin>,
  res: TypedResponse<UserReturn | any>,
  next: NextFunction
) {
  try {
    let user = await userService.getUserByEmail(req.body.email)
    if (!user) {
      throw new HttpEception(404, "User Deoesn't Exist")
    }
    //* comparing password
    const passMatch = await comparePassword(req.body.password, user.password)
    if (!passMatch) {
      throw new HttpEception(400, 'Wrong Credentials')
    }
    return res.status(200).json({
      message: 'Logged In Successfully',
      user: new TrimUser({ ...user, token: generateToken(user.id) }),
    })
  } catch (err: any) {
    next(err)
  }
}

const userController = {
  registerUser, 
  loginUser
}

export default userController
