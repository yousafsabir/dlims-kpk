import express from 'express'
import contactController from '@/controllers/contact.controller'
import contactSchema from '@/shared/schemas/contact.schema'
import validateData from '@/middlewares/validation.middleware'
import authenticate from '@/middlewares/auth.middleware'

const contactRouter = express.Router()

contactRouter
  .route('/')
  .get(authenticate, contactController.getContacts)
  .post(
    validateData(contactSchema.createContactSchema),
    contactController.createContact
  )
contactRouter
  .route('/:id')
  .put(authenticate, contactController.updateContact)
  .delete(authenticate, contactController.deleteContact)
export default contactRouter
