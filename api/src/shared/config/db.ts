import { PrismaClient } from '@prisma/client'
import Settings from '@/shared/config'

interface CustomNodeJsGlobal {
  prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

const db = global.prisma || new PrismaClient()

if (Settings.NODE_ENV === 'development') global.prisma = db

export default db
