import { Request, Response, NextFunction } from 'express'
import z from 'zod'
import { generateErrorMessage } from 'zod-error'

const validateData =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.parseAsync(req.body)
      return next()
    } catch (error: any) {
      const issues = error.issues as z.ZodIssue[]
      console.error(
        generateErrorMessage(issues, {
          delimiter: { error: '\n' },
        })
      )
      const messages = issues.map((issue) => issue.message)
      return res
        .status(400)
        .json({ message: 'Data not valid', details: messages })
    }
  }

export default validateData
