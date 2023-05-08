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

export interface LicenseI {
  licenseNo: string
  name: string
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
  fatherName: string
  cnic: string
  category: Array<{
    category: string
    place: string
  }>
  issueDate: Date
  expiryDate: Date
}

export interface LicenseDocument extends Omit<LicenseI, 'image' | 'category'> {
  id: string
  image: any
  category: any
  createdAt: Date
  updatedAt: Date
}
