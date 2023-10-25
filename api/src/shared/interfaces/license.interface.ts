import { License } from '@prisma/client'

interface Image {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}

export interface LicenseDocument extends License {}

export interface LicenseI
  extends Omit<
    LicenseDocument,
    'id' | 'image' | 'category' | 'createdAt' | 'updatedAt'
  > {
  image: {
    fieldname: string
    originalname: string
    encoding: string
    mimetype: string
    destination: string
    filename: string
    path: string
    size: number
  }
  category: Array<{
    category: string
    place: number
  }>
}
