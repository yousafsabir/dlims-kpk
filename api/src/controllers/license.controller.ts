import { NextFunction, Request, Response } from 'express'
import { TypedRequest, TypedResponse } from '@/shared/utils/genericTypeUtils'
import {
  LicenseI,
  LicenseDocument,
} from '@/shared/interfaces/license.interface'
import licenseService from '@/services/license.service'
import HttpException from '@/shared/utils/HttpException'
import deleteFile from '@/shared/utils/deleteFile'
import { Pagination } from '@/shared/interfaces/pagination.interface'
import TrimLicense from '@/shared/utils/trimLicense'

export async function createLicense(
  req: TypedRequest<LicenseI>,
  res: TypedResponse<{ message: string; license: LicenseDocument }>,
  next: NextFunction
) {
  try {
    const image = req.file
    if (!image) {
      throw new HttpException(500, "Coudn't Add License, Server Error")
    }
    const license = await licenseService.createLicense({
      ...req.body,
      image,
    })
    return res.status(201).json({
      message: 'License Added Succesfully',
      license: new TrimLicense(license),
    })
  } catch (error) {
    if (error instanceof HttpException) {
      next(new HttpException(error.status, error.message, error.details))
    } else {
      next(new HttpException(500, 'Internal Server Error'))
    }
  }
}

export async function getLicense(
  req: Request,
  res: TypedResponse<{ message: string; license: LicenseDocument }>,
  next: NextFunction
) {
  try {
    const cnic = req.params.id
    const license = await licenseService.getLicenseByCNIC(cnic)
    if (!license) {
      throw new HttpException(404, 'License Not Found')
    }
    return res.status(200).json({
      message: 'Get License Succesfully',
      license: new TrimLicense(license),
    })
  } catch (error) {
    if (error instanceof HttpException) {
      next(new HttpException(error.status, error.message, error.details))
    } else {
      next(new HttpException(500, 'Internal Server Error'))
    }
  }
}

export async function getLicenses(
  req: Request,
  res: TypedResponse<{
    message: string
    licenses: LicenseDocument[]
    pagination: Pagination
  }>,
  next: NextFunction
) {
  try {
    const { cnic, page, limit, sort } = req.query
    let pagination = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 5,
      total: 0,
      prev: false,
      next: false,
    }
    if (cnic) {
      const license = await licenseService.getLicenseByCNIC(cnic as string)
      if (!license) {
        throw new HttpException(404, 'License not found')
      }
      return res.status(200).json({
        message: 'Get Licenses Succesfully',
        licenses: [license],
        pagination: { ...pagination, total: 1 },
      })
    }
    pagination.total = await licenseService.countLicenses()
    const startIdx = (pagination.page - 1) * pagination.limit
    if (pagination.page * pagination.limit < pagination.total) {
      pagination.next = true
    }
    if (startIdx > 0) {
      pagination.prev = true
    }
    const licenses = await licenseService.getLicenses(
      pagination.limit,
      startIdx,
      sort as string
    )
    const trimmedLicenses = licenses.map((license) => new TrimLicense(license))

    return res.status(200).json({
      message: 'Get Licenses Succesfully',
      licenses: trimmedLicenses,
      pagination,
    })
  } catch (error) {
    if (error instanceof HttpException) {
      next(new HttpException(error.status, error.message, error.details))
    } else {
      next(new HttpException(500, 'Internal Server Error'))
    }
  }
}

export async function updateLicense(
  req: TypedRequest<Partial<LicenseDocument>>,
  res: TypedResponse<{ message: string; license: LicenseDocument }>,
  next: NextFunction
) {
  try {
    const id = req.params.id
    const image = req.file
    const data = req.body
    let prevImgPath: any
    if (image) {
      data.image = image
      const prevLicense = await licenseService.getLicenseById(id)
      const prevImage = prevLicense?.image as any
      prevImgPath = prevImage.path
    }
    const license = await licenseService.updateLicense(id, data)
    if (image) {
      await deleteFile(prevImgPath)
    }
    return res.status(200).json({
      message: 'Updated License Succesfully',
      license: new TrimLicense(license),
    })
  } catch (error) {
    console.log('errorUpdate_>', error)
    if (error instanceof HttpException) {
      next(new HttpException(error.status, error.message, error.details))
    } else {
      next(new HttpException(500, 'Internal Server Error'))
    }
  }
}

export async function deleteLicense(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const cnic = req.params.id
    await licenseService.deleteLicenseByCNIC(cnic)
    return res.status(200).json({
      message: 'License Deleted Succesfully',
    })
  } catch (error) {
    if (error instanceof HttpException) {
      next(new HttpException(error.status, error.message, error.details))
    } else {
      next(new HttpException(500, 'Internal Server Error'))
    }
  }
}

const licenseController = {
  createLicense,
  getLicense,
  getLicenses,
  updateLicense,
  deleteLicense,
}

export default licenseController
