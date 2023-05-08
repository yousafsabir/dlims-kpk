type Url = string

interface EnvI {
  NODE_ENV: string
  PORT: number
  MONGO_URI: string
  JWT_SECRET: string
  ALLOWED_FRONTENDS: Array<Url> | ['*']
}

export default EnvI
