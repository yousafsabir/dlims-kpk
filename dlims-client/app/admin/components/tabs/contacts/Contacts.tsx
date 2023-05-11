import { useEffect, useState } from 'react';
import useContacts from './useContacts';
import ky from 'ky';
import ApiUrls from '@/constants/ApiUrls';
import { toast } from 'react-hot-toast';


const ContactsPage = () => {

  const kyInstance = ky.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })

  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  type Contact = {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt: string;
  };

  type ContactsResponse = {
    message: string;
    contacts: Contact[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      prev: boolean;
      next: boolean;
    };
  };

  const getContacts = async () => {
    try {
      const res = await kyInstance.get(ApiUrls.contacts.get);
      const { contacts } = (await res.json()) as ContactsResponse;
      setContacts(contacts);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getContacts();

  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }
// console.log('contacts__>',contacts[0])
  const onDeletContact = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this Email?'
    )
    if (confirmDelete) {
      const loadingToast = toast.loading('Deleting License')
      try {
        const res = await kyInstance.delete(ApiUrls.contacts.delete + `${id}`)
        toast.success('Contacts Deleted')
        getContacts();
      } catch (error) {
        console.log(error)
      } finally {
        toast.dismiss(loadingToast)
      }
    }
  }


  return (
    <div className='px-10 flex items-center flex-col' >
      <h1 className='text-3xl font-bold'>Contacts Emails</h1>
      <table className='w-full'>
        <tbody className='w-full'>
          {contacts.map((contact) => (
            <tr key={contact.email}>
              <td className="border border-gray-300 px-4 py-2">
                {contact.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {contact.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {contact.phone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {contact.message}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                  onClick={() => onDeletContact(contact.id)}
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <footer className="border w-full max-w-7xl border-gray-300 p-3 mt-auto my-4 flex justify-between items-center">
        <div className="space-x-2">
          <button
            className="btn btn-sm btn-primary"
            disabled={!search.pagination?.prev}
            onClick={prevPage}
          >
            Previous
          </button>
          <button
            className="btn btn-sm btn-primary"
            disabled={!search?.pagination?.next}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <p>
          Showing {(search.pagination?.page - 1) * search.pagination?.limit + 1}{' '}
          -
          {(search.pagination?.page - 1) * search.pagination?.limit +
            contacts.length}{' '}
          of {search.pagination?.total} Results
        </p>
      </footer> */}
    </div >
  )
}


export default ContactsPage;
