export interface ContactI {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactDocument extends ContactI {
  id: string
  createdAt: Date
  updatedAt: Date
}
