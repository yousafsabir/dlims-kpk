//* Load Env Vars
import 'dotenv/config'
import App from '@/app'
import rootRouter from '@/routes'
import Settings from '@/shared/config'

const app = App(rootRouter)

app.listen(Settings.PORT, () => {
  console.log(`Server started at port:${Settings.PORT}`)
})
