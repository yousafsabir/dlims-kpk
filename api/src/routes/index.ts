import express from 'express'
import userRouter from '@/routes/user.route'
import licenseRouter from './liscense.route'

const rootRouter = express.Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/licenses', licenseRouter)

export default rootRouter
