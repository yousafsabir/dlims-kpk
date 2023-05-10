import express from 'express'
import userController from '@/controllers/user.controller'
import userSchema from '@/shared/schemas/user.schema'
import validateData from '@/middlewares/validation.middleware'
import authenticate from '@/middlewares/auth.middleware'

const userRouter = express.Router()

userRouter.post(
  '/register',
  validateData(userSchema.registerUserSchema),
  userController.registerUser
)
userRouter.post(
  '/login',
  validateData(userSchema.loginUserSchema),
  userController.loginUser
)
userRouter.get('/authenticate', authenticate, userController.authenticate)

export default userRouter
