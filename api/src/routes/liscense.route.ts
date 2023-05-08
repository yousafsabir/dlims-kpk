import express from 'express'
import licenseController from '@/controllers/license.controller'
import licenseSchema from '@/shared/schemas/license.schema'
import validateData from '@/middlewares/validation.middleware'
import authenticate from '@/middlewares/auth.middleware'
import upload from '@/shared/config/storage'

const licenseRouter = express.Router()

licenseRouter
  .route('/')
  .get(authenticate, licenseController.getLicenses)
  .post(
    upload.single('image'),
    validateData(licenseSchema.createLicenseSchema),
    licenseController.createLicense
  )
licenseRouter
  .route('/:id')
  .get(licenseController.getLicense)
  .put(authenticate, upload.single('image'), licenseController.updateLicense)
  .delete(authenticate, licenseController.deleteLicense)
export default licenseRouter
