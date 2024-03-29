import db from '@/shared/config/db'
import {
  LicenseI,
  LicenseDocument,
} from '@/shared/interfaces/license.interface'

export async function createLicense(license: LicenseI) {
  return await db.license.create({
    data: license,
  })
}

export async function getLicenseById(id: string) {
  return await db.license.findUnique({
    where: {
      id,
    },
  })
}

export async function getLicenseByLicense(license: string) {
  return await db.license.findUnique({
    where: {
      licenseNo: license,
    },
  })
}

export async function getLicenseByCNIC(CNIC: string) {
  return await db.license.findUnique({
    where: {
      cnic: CNIC,
    },
  })
}

export async function countLicenses() {
  return await db.license.count()
}

export async function getLicenses(
  limit: number,
  startIdx?: number,
  sort?: string
) {
  return await db.license.findMany({
    orderBy: {
      createdAt: sort ? (sort as any) : 'desc',
    },
    skip: startIdx ? startIdx : 0,
    take: limit,
  })
}

export async function updateLicense(
  id: string,
  license: Partial<LicenseDocument> | any
) {
  return await db.license.update({
    where: {
      id,
    },
    data: license,
  })
}

export async function deleteLicenseByLicense(license: string) {
  return await db.license.delete({
    where: {
      licenseNo: license,
    },
  })
}

export async function deleteLicenseByCNIC(cnic: string) {
  return await db.license.delete({
    where: {
      cnic,
    },
  })
}

const licenseService = {
  createLicense,
  getLicenseById,
  getLicenseByLicense,
  getLicenseByCNIC,
  countLicenses,
  getLicenses,
  updateLicense,
  deleteLicenseByLicense,
  deleteLicenseByCNIC,
}

export default licenseService
