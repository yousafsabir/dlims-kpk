'use client'

import { IoMdRefresh } from 'react-icons/io'
import isEmpty from 'is-empty'
import ReactLoading from 'react-loading'
import ApiUrls from '@/constants/ApiUrls'

import useLicenses from './useLicenses'
const Licenses = () => {
  const {
    status,
    formRef,
    licenseForm,
    formFields,
    handleLicenseForm,
    handleCategory,
    licenses,
    onAddAndUpdateLicense,
    handleEdit,
    editFlag,
    onDeletLicense,
    getLicenses,
    search,
    setSort,
    setCnic,
    applySearch,
    disableApplyFilterBtn,
    prevPage,
    nextPage,
  } = useLicenses()
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-4xl text-center font-bold mb-6">Manage Licenses</h1>
      {/* Search Area */}

      <form
        onSubmit={onAddAndUpdateLicense}
        className="max-w-lg mx-auto grid grid-cols-2 gap-4 mb-5"
        ref={formRef}
      >
        {formFields.map((field) =>
          field.type === 'checkbox' ? (
            <>
              <p className="text-center label-text col-span-2" key={field.type}>
                {field.label}
              </p>
              <fieldset
                key={field.name}
                className="flex flex-wrap justify-center gap-3 col-span-2"
              >
                {field.content?.map((item) => (
                  <div className="form-control" key={item.name}>
                    <label className="label cursor-pointer">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                        checked={
                          licenseForm.category.find(
                            (cat) => cat.category === item.value.category
                          )
                            ? true
                            : false
                        }
                        onChange={(e) => {
                          handleCategory(e.target.checked, item.value)
                        }}
                      />
                      <span className="label-text ml-1">{item.name}</span>
                    </label>
                  </div>
                ))}
              </fieldset>
            </>
          ) : field.type === 'file' ? (
            <fieldset className="form-control col-span-2" key={field.name}>
              {licenseForm.image ? (
                <div className="w-full h-[150px] flex justify-center">
                  <img
                    src={
                      typeof licenseForm.image === 'string'
                        ? licenseForm.image
                        : URL.createObjectURL(licenseForm.image)
                    }
                    className="h-full object-contain flex-1"
                  />
                </div>
              ) : null}
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleLicenseForm}
                className="file-input file-input-bordered w-full"
                required={!editFlag}
              />
            </fieldset>
          ) : (
            <fieldset key={field.name}>
              <label className="label" htmlFor={field.name}>
                <span className="label-text">{field.label}</span>
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                //@ts-ignore
                value={licenseForm[field.name as keyof typeof licenseForm]}
                onChange={handleLicenseForm}
                className="input input-bordered w-full"
                required
              />
            </fieldset>
          )
        )}
        <fieldset className="col-span-2 flex justify-center">
          <button type="submit" className="btn btn-primary">
            {editFlag ? 'Update User' : 'Add User'}
          </button>
        </fieldset>
      </form>

      <h2 className="text-2xl font-bold">Licenses</h2>
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
          <fieldset>
            <input
              type="text"
              name="cnic"
              onChange={setCnic}
              value={search.cnic}
              className="input w-[300px] input-sm border rounded-md border-gray-400"
              placeholder="CNIC"
            />
          </fieldset>
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
              onClick={() => getLicenses()}
              disabled={status.loading}
            >
              <IoMdRefresh />
            </button>
          </div>
        </form>
      </header>
      {isEmpty(licenses) || status.loading || status.error ? (
        <div className="w-full h-60 flex justify-center items-center">
          {status.loading ? (
            <ReactLoading type="spin" width={32} height={32} color="#999" />
          ) : status.error ? (
            <h3 className="text-xl text-red-600 text-center">
              An Error Occoured: <br /> {status.message}
            </h3>
          ) : isEmpty(licenses) ? (
            <h3 className="text-xl text-primary text-center">
              No License found for this criteria <br />
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
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">
                License Number
              </th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Father Name</th>
              <th className="border border-gray-300 px-4 py-2">
                License Category
              </th>
              <th className="border border-gray-300 px-4 py-2">Issue Date</th>
              <th className="border border-gray-300 px-4 py-2">Expire Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license, id) => (
              <tr key={id}>
                <td className="border border-gray-300 px-4 py-2">
                  <div className="h-[70px] flex justify-center">
                    {/* <img src={ApiUrls.images + license.image} alt="" /> */}
                    <img src="http://localhost:5000/public/images/47eb69d5-c44a-49ba-9b7a-7b2fda9b1272.jpeg" alt="" />
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {license.licenseNo}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {license.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {license.fatherName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {license.category.map((item) => (
                    <span key={item.category}>{item.category} </span>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {license.issueDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {license.expiryDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                    onClick={() => onDeletLicense(license.cnic)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(license)}
                  >
                    Edit
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
            licenses.length}{' '}
          of {search.pagination?.total} Results
        </p>
      </footer>
    </div>
  )
}

export default Licenses
