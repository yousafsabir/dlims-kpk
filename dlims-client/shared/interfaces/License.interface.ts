export interface LicenseI {
  id: string
  licenseNo: string
  name: string
  image: string
  fatherName: string
  cnic: string
  category: Array<{
    category: string
    place: number
  }>
  issueDate: string
  expiryDate: string
}
