import { HttpExceptionI } from '@/shared/interfaces/httpException.interface'

class HttpException extends Error implements HttpExceptionI {
  public status: number
  public message: string
  public details?: any | undefined

  constructor(status: number, message: string, details?: any) {
    super(message)
    this.status = status
    this.message = message
    this.details = details
  }
}
export default HttpException
