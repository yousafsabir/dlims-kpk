import z from 'zod'

export const createLicenseSchema = z.object({
  licenseNo: z.string({ required_error: 'License No. is required' }),
  name: z.string({ required_error: 'Name is required' }),
  fatherName: z.string({ required_error: 'Father Name is required' }),
  cnic: z.string({ required_error: 'CNIC Name is required' }),
  category: z.string().transform((arg) => {
    return JSON.parse(arg)
  }),

  issueDate: z.string({ required_error: 'Issue Date Name is required' }),

  expiryDate: z.string({ required_error: 'Expiry Date Name is required' }),
})

export const updateLicenseScehma = z.optional(createLicenseSchema)

const licenseSchema = {
  createLicenseSchema,
  updateLicenseScehma,
}

export default licenseSchema
