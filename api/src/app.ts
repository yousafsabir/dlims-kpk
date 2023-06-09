import express, { Application, Router } from 'express'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import logger, { errorLogger } from '@/shared/config/logger'
import Settings from '@/shared/config'
import path from 'path'
import errorHandler from './middlewares/error.middleware'

function App(router: Router): Application {
  const app = express()
  //* Middlewares
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    })
  )
  app.use(
    cors(function (req, callback) {
      let corsOptions: CorsOptions
      if (
        Settings.ALLOWED_ORIGINS.indexOf(req.header('Origin') as string) !==
          -1 ||
        Settings.ALLOWED_ORIGINS === '*'
      ) {
        corsOptions = { origin: true, credentials: true }
      } else {
        corsOptions = { origin: false }
      }
      callback(null, corsOptions)
    })
  )
  app.use(logger)
  app.use(compression())

  app.get('/get', (req, res) => {
    throw new Error('Hello')
  })

  //* Request Parser
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  //* Server is working indication
  app.get('/', (req, res) => {
    res.send('Server is Working')
  })

  //* to serve static files
  app.use('/public', express.static(path.join(__dirname, '../public')))

  //* Adding Root Router
  app.use('/api', router)

  //* Error handling middleware
  app.use(errorLogger)
  app.use(errorHandler)

  return app
}

export default App
