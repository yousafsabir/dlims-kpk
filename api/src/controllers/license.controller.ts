import { NextFunction, Request, Response } from 'express'
import { TypedRequest, TypedResponse } from '@/shared/utils/genericTypeUtils'
import {
  LicenseI,
  LicenseDocument,
} from '@/shared/interfaces/license.interface'
import licenseService from '@/services/license.service'
import HttpException from '@/shared/utils/HttpEception'
import deleteFile from '@/shared/utils/deleteFile'

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
      license: license,
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
      license: license,
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
  res: TypedResponse<{ message: string; licenses: LicenseDocument[] }>,
  next: NextFunction
) {
  try {
    const licenses = await licenseService.getLicenses()
    return res.status(200).json({
      message: 'Get Licenses Succesfully',
      licenses: licenses,
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
      license: license,
    })
  } catch (error) {
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
    licenseService.deleteLicenseByCNIC(cnic)
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
