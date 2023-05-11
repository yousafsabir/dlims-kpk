import db from '@/shared/config/db'
import {
  ContactI,
  ContactDocument,
} from '@/shared/interfaces/contact.interface'

export async function createContact(contact: ContactI) {
  return await db.contact.create({
    data: contact,
  })
}

export async function getContactById(id: string) {
  return await db.contact.findUnique({
    where: {
      id,
    },
  })
}

export async function countContacts() {
  return await db.contact.count()
}

export async function getContacts(
  limit: number,
  startIdx?: number,
  sort?: string
) {
  return await db.contact.findMany({
    orderBy: {
      createdAt: sort ? (sort as any) : 'desc',
    },
    skip: startIdx ? startIdx : 0,
    take: limit,
  })
}

export async function updateContact(
  id: string,
  contact: Partial<ContactDocument>
) {
  return await db.contact.update({
    where: {
      id,
    },
    data: contact,
  })
}

export async function deleteContactById(id: string) {
  return await db.contact.delete({
    where: {
      id,
    },
  })
}

const contactService = {
  createContact,
  getContactById,
  countContacts,
  getContacts,
  updateContact,
  deleteContactById
}

export default contactService
