import { Request, Response } from 'express'
import { TypedRequest, TypedResponse } from '@/shared/utils/genericTypeUtils'
import {
  LicenseI,
  LicenseDocument,
} from '@/shared/interfaces/license.interface'
import licenseService from '@/services/license.service'
import asyncHandler from '@/shared/utils/asyncHandler'
import HttpException from '@/shared/utils/HttpException'
import deleteFile from '@/shared/utils/deleteFile'
import { Pagination } from '@/shared/interfaces/pagination.interface'
import LicenseDTO from '@/shared/dtos/license.dto'

export const createLicense = asyncHandler(
  async (
    req: TypedRequest<LicenseI>,
    res: TypedResponse<{ message: string; license: LicenseDocument }>
  ) => {
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
      license: new LicenseDTO(license),
    })
  }
)

export const getLicense = asyncHandler(
  async (
    req: Request,
    res: TypedResponse<{ message: string; license: LicenseDocument }>
  ) => {
    const cnic = req.params.id
    const license = await licenseService.getLicenseByCNIC(cnic)
    if (!license) {
      throw new HttpException(404, 'License Not Found')
    }
    return res.status(200).json({
      message: 'Get License Succesfully',
      license: new LicenseDTO(license),
    })
  }
)

export const getLicenses = asyncHandler(
  async (
    req: Request,
    res: TypedResponse<{
      message: string
      licenses: LicenseDocument[]
      pagination: Pagination
    }>
  ) => {
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
    const trimmedLicenses = licenses.map((license) => new LicenseDTO(license))

    return res.status(200).json({
      message: 'Get Licenses Succesfully',
      licenses: trimmedLicenses,
      pagination,
    })
  }
)

export const updateLicense = asyncHandler(
  async (
    req: TypedRequest<Partial<LicenseDocument>>,
    res: TypedResponse<{ message: string; license: LicenseDocument }>
  ) => {
    const id = req.params.id
    const image = req.file
    const data = req.body
    let prevImgPath: any
    if (image) {
      data.image = image as any
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
      license: new LicenseDTO(license),
    })
  }
)

export const deleteLicense = asyncHandler(
  async (req: Request, res: Response) => {
    const cnic = req.params.id
    await licenseService.deleteLicenseByCNIC(cnic)
    return res.status(200).json({
      message: 'License Deleted Succesfully',
    })
  }
)

const licenseController = {
  createLicense,
  getLicense,
  getLicenses,
  updateLicense,
  deleteLicense,
}

export default licenseController
