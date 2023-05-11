import { Request, NextFunction } from 'express'
import { HttpExceptionI } from '@/shared/interfaces/httpException.interface'
import { TypedResponse } from '@/shared/utils/genericTypeUtils'
import { ResError } from '@/shared/interfaces/resError.interface'

const errorHandler = (
  err: HttpExceptionI,
  req: Request,
  res: TypedResponse<ResError>,
  next: NextFunction
) => {
  console.error("middleware err->",err.message)
  return res.status(err.status).json({
    message: err.message,
    details: err.details,
  })
}

export default errorHandler
