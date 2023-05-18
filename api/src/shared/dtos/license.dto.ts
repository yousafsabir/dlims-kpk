import type { LicenseDocument } from '@/shared/interfaces/license.interface'

class LicenseDTO implements LicenseDocument {
  public id: string
  public licenseNo: string
  public name: string
  public image: string
  public fatherName: string
  public cnic: string
  public category: any
  public issueDate: string
  public expiryDate: string
  public createdAt: Date
  public updatedAt: Date

  constructor(license: LicenseDocument) {
    this.id = license.id
    this.licenseNo = license.licenseNo
    this.name = license.name
    this.image = license.image.filename
    this.fatherName = license.fatherName
    this.cnic = license.cnic
    this.category = license.category
    this.issueDate = license.issueDate
    this.expiryDate = license.expiryDate
    this.createdAt = license.createdAt
    this.updatedAt = license.updatedAt
  }
}

export default LicenseDTO
