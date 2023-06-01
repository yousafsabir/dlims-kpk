import userService from '@/services/user.service'
import type {
  UserRegister,
  UserLogin,
  UserReturn,
} from '@/shared/interfaces/user.interface'
import { TypedRequest, TypedResponse } from '@/shared/utils/genericTypeUtils'
import asyncHandler from '@/shared/utils/asyncHandler'
import HttpException from '@/shared/utils/HttpException'
import { comparePassword } from '@/shared/utils/bcrypt'
import { generateToken } from '@/shared/utils/jwt'
import UserDTO from '@/shared/dtos/user.dto'

export const registerUser = asyncHandler(
  async (req: TypedRequest<UserRegister>, res: TypedResponse<UserReturn>) => {
    const user = await userService.createUser(req.body)
    return res.status(201).json({
      message: 'User Created',
      user: new UserDTO({ ...user, token: generateToken(user.id) }),
    })
  }
)

export const loginUser = asyncHandler(
  async (
    req: TypedRequest<UserLogin>,
    res: TypedResponse<UserReturn | any>
  ) => {
    let user = await userService.getUserByEmail(req.body.email)
    if (!user) {
      throw new HttpException(404, "User Deoesn't Exist")
    }
    //* comparing password
    const passMatch = await comparePassword(req.body.password, user.password)
    if (!passMatch) {
      throw new HttpException(400, 'Wrong Credentials')
    }
    return res.status(200).json({
      message: 'Logged In Successfully',
      user: new UserDTO({ ...user, token: generateToken(user.id) }),
    })
  }
)

export const authenticate = asyncHandler(async function (
  req: TypedRequest<{
    user: {
      id: string
    }
  }>,
  res: TypedResponse<{ message: string }>
) {
  return res.status(200).json({
    message: 'User Authenticated Successfully',
  })
})

const userController = {
  registerUser,
  loginUser,
  authenticate,
}

export default userController
