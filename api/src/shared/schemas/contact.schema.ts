import z from 'zod'

export const createContactSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Not a valid Email'),
  phone: z.string({ required_error: 'Phone No. is required' }),
  message: z.string({ required_error: 'Message is required' }),
})

const contactSchema = {
  createContactSchema,
}

export default contactSchema
