import { Request, NextFunction, RequestHandler } from 'express'
import { verifyToken } from '@/shared/utils/jwt'
import HttpException from '@/shared/utils/HttpEception'
import { ResError } from '@/shared/interfaces/resError.interface'
import { TypedResponse } from '@/shared/utils/genericTypeUtils'

const authenticate:RequestHandler = (req, res, next) => {
  try {
    let key = req.headers.authorization
    if (!key) {
      throw new HttpException(401, 'Not Authorized, No Token')
    }
    let token = key.split(' ')[1]
    const decoded = verifyToken(token)
    if (!decoded) {
      throw new HttpException(401, 'Not Authorized, Invalid Token')
    }
    req.body.user = {
      id: decoded.id,
    }
    next()
  } catch (error) {
    console.error('Error in src/middlewares/auth.middleware.ts')
    if (error instanceof HttpException) {
      next(new HttpException(error.status, error.message, error.details))
    } else {
      next(new HttpException(500, 'Internal Server Error'))
    }
  }
}

export default authenticate
