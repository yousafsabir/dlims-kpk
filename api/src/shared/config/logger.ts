import winston from 'winston'
import 'winston-mongodb'
import expressWinston from 'express-winston'
import Settings from '@/shared/config'

const devLogFormat = winston.format.printf(
  ({ level, meta, timestamp, stack }) => {
    return `[${level}] ${meta.req.method} ${meta.req.url} ${timestamp}: ${
      meta.res.statusCode
    }: ${stack ? stack : ''}`
  }
)

const loggerTransports: (
  | winston.transports.FileTransportInstance
  | winston.transports.ConsoleTransportInstance
)[] = [
  // All Logs
  new winston.transports.File({
    filename: 'logs/logs.log',
  }),
]

if (Settings.NODE_ENV === 'development') {
  loggerTransports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD h:mm:ssa' }),
        devLogFormat
      ),
    })
  )
}

const logger = expressWinston.logger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: loggerTransports,
})

// Internal Server Error Logger with express-winston
export const errorLogger = expressWinston.errorLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: 'logs/errors.log',
    }),
    new winston.transports.MongoDB({
      level: 'error',
      db: Settings.MONGO_URI,
      options: { useUnifiedTopology: true },
      collection: 'errorLogs',
    }),
  ],
})

export default logger
