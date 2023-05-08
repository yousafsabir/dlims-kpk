import envSchema from '@/shared/schemas/env.schema'
import { generateErrorMessage } from 'zod-error'

function validatedEnv() {
  try {
    const env = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      MONGO_URI: process.env.MONGO_URI,
      JWT_SECRET: process.env.JWT_SECRET,
      ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(', '),
    }
    const validationResult = envSchema.parse(env)
    return validationResult
  } catch (error: any) {
    console.error('Error in Environment Variables')
    console.error(
      generateErrorMessage(error.issues, {
        delimiter: { error: '\n' },
      })
    )
    // shutting the server down
    process.exit(1)
  }
}

export default validatedEnv
