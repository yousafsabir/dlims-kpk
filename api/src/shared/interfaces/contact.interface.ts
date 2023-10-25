import { Contact } from '@prisma/client'

export interface ContactI {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactDocument extends Contact {}
