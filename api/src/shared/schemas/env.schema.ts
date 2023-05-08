import z from 'zod'

const mongoUriRegex = new RegExp(
  /^mongodb\+srv:\/\/+[\w-]+:+[\w-]+@+\w+\.\w+\.mongodb+\.net\/([\w-]*)+(\?.*)?$/
)

const urlRegex = new RegExp(
  /^(?:http(s)?:\/\/)?\w+(\.\w+)*(:[0-9]+)?\/?(\/[.\w]*)*([\w-]*)+(\?.*)?$/
)

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).default('5000').transform(Number),
  MONGO_URI: z.string().regex(mongoUriRegex),
  JWT_SECRET: z.string(),
  ALLOWED_ORIGINS: z
    .union([z.array(z.string().regex(urlRegex)), z.literal('*')])
    .default('*'),
})

export default envSchema
