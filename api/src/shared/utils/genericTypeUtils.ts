import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'

export interface TypedRequest<T> extends Request {
  body: T
}

export interface TypedResponse<T> extends Response {
  json: Send<T, this>
}
