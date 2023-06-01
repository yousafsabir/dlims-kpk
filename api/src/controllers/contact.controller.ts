import { Request, Response } from 'express'
import { TypedRequest, TypedResponse } from '@/shared/utils/genericTypeUtils'
import {
  ContactI,
  ContactDocument,
} from '@/shared/interfaces/contact.interface'
import contactService from '@/services/contact.service'
import asyncHandler from '@/shared/utils/asyncHandler'
import HttpException from '@/shared/utils/HttpException'
import { Pagination } from '@/shared/interfaces/pagination.interface'

export const createContact = asyncHandler(
  async (
    req: TypedRequest<ContactI>,
    res: TypedResponse<{ message: string; contact: ContactDocument }>
  ) => {
    const contact = await contactService.createContact(req.body)
    return res.status(201).json({
      message: 'Contact Added Succesfully',
      contact,
    })
  }
)

export const getContacts = asyncHandler(
  async (
    req: Request,
    res: TypedResponse<{
      message: string
      contacts: ContactDocument[]
      pagination: Pagination
    }>
  ) => {
    const { id, page, limit, sort } = req.query
    let pagination = {
      page: page ? parseInt(page as string) : 1,
      limit: limit ? parseInt(limit as string) : 5,
      total: 0,
      prev: false,
      next: false,
    }
    if (id) {
      const contact = await contactService.getContactById(id as string)
      if (!contact) {
        throw new HttpException(404, 'Contact not found')
      }
      return res.status(200).json({
        message: 'Get Contacts Succesfully',
        contacts: [contact],
        pagination: { ...pagination, total: 1 },
      })
    }
    pagination.total = await contactService.countContacts()
    const startIdx = (pagination.page - 1) * pagination.limit
    if (pagination.page * pagination.limit < pagination.total) {
      pagination.next = true
    }
    if (startIdx > 0) {
      pagination.prev = true
    }
    const contacts = await contactService.getContacts(
      pagination.limit,
      startIdx,
      sort as string
    )
    return res.status(200).json({
      message: 'Get Contacts Succesfully',
      contacts: contacts,
      pagination,
    })
  }
)

export const updateContact = asyncHandler(
  async (
    req: TypedRequest<Partial<ContactDocument>>,
    res: TypedResponse<{ message: string; contact: ContactDocument }>
  ) => {
    const id = req.params.id
    const data = req.body
    const contact = await contactService.updateContact(id, data)
    return res.status(200).json({
      message: 'Updated Contact Succesfully',
      contact: contact,
    })
  }
)

export const deleteContact = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id
    await contactService.deleteContactById(id)
    return res.status(200).json({
      message: 'Contact Deleted Succesfully',
    })
  }
)

const contactController = {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
}

export default contactController
