'use client'

import { IoMdRefresh } from 'react-icons/io'
import isEmpty from 'is-empty'
import ReactLoading from 'react-loading'
import useContacts from './useContacts'

const Contacts = () => {
  const {
    status,
    contacts,
    onDeletContact,
    getContacts,
    // search & search handlers
    search,
    setSort,
    applySearch,
    disableApplyFilterBtn,
    // Pagination
    prevPage,
    nextPage,
  } = useContacts()
  return (
    <div id='adminContacts' className="flex flex-col items-center">
      <h1 className="text-4xl text-center font-bold mb-6">Manage Contacts</h1>
      {/* Search Area */}
      <header className="flex-1 w-full max-w-7xl">
        <form
          className="flex items-center justify-between border border-gray-300 p-3 mb-4"
          onSubmit={(e) => {
            e.preventDefault()
            applySearch()
          }}
        >
          {/* License' order */}
          <fieldset className="flex gap-3 items-center">
            <label htmlFor="license-select">Order</label>
            <select
              id="license-select"
              name="sort"
              className="select w-full select-sm max-w-xs border rounded-md border-gray-400"
              value={search.sort}
              onChange={setSort}
            >
              <option value={'desc'}>Newer</option>
              <option value={'asc'}>Older</option>
            </select>
          </fieldset>
          {/* License Id */}

          {/* License Filters */}
          <div className="flex items-center">
            <button
              type="submit"
              className="btn btn-primary btn-sm mr-1"
              disabled={disableApplyFilterBtn}
            >
              Apply
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm text-xl block"
              onClick={() => getContacts()}
              disabled={status.loading}
            >
              <IoMdRefresh />
            </button>
          </div>
        </form>
      </header>
      {isEmpty(contacts) || status.loading || status.error ? (
        <div className="w-full h-60 flex justify-center items-center">
          {status.loading ? (
            //@ts-ignore
            <ReactLoading type="spin" width={32} height={32} color="#999" />
          ) : status.error ? (
            <h3 className="text-xl text-red-600 text-center">
              An Error Occoured: <br /> {status.message}
            </h3>
          ) : isEmpty(contacts) ? (
            <h3 className="text-xl text-primary text-center">
              No Contact found for this criteria <br />
              Enter an Id or change filter conditions
            </h3>
          ) : status.success ? (
            <h3 className="text-xl text-green-600 text-center">
              Success: <br /> {status.message}
            </h3>
          ) : null}
        </div>
      ) : (
        <table className="w-full max-w-7xl border-collapse border border-gray-300 my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone </th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, id) => (
              <tr key={id}>
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
      )}

      <footer className="border w-full max-w-7xl border-gray-300 p-3 mt-auto my-4 flex justify-between items-center">
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
      </footer>
    </div>
  )
}

export default Contacts
