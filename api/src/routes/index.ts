import express from 'express'
import userRouter from '@/routes/user.route'
import licenseRouter from '@/routes/liscense.route'
import contactRouter from '@/routes/contact.route'

const rootRouter = express.Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/licenses', licenseRouter)
rootRouter.use('/contacts', contactRouter)

export default rootRouter
