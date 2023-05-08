import z from 'zod'

export const registerUserSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Not a valid email'),
  password: z.string({ required_error: 'Password is required' }),
})

export const loginUserSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Not a valid email'),
  password: z.string({ required_error: 'Password is required' }),
})

const userSchema = {
  registerUserSchema,
  loginUserSchema,
}

export default userSchema
