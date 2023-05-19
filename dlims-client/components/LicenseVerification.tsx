'use client'
import { useState } from 'react'
import ky from 'ky'
import ApiUrls from '@/constants/ApiUrls'
import { LicenseI } from '@/shared/interfaces/License.interface'

const LicenseVerification = () => {
  const [cnic, setCnic] = useState<string>('')
  const [verificationData, setVerificationData] = useState<LicenseI | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleCnicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCnic(event.target.value)
  }

  const handleSearchClick = async () => {
    setLoading(true)
    try {
      const response: any = await ky.get(ApiUrls.licenses.get + cnic).json()
      setVerificationData(response.license as LicenseI)
    } catch (error) {
      setError(
        'An error occurred while fetching verification data. Please try again later.'
      )
    }
    setLoading(false)
  }

  return (
    <div className="w-full px-7 leading-5 py-5 max-w-[700px] box-shadow h-max min-h-[220px] flex flex-col text-center items-center text-[#666666] rounded-2xl border-[3px] border-blue-600">
      <h2 className="text-2xl xs:text-3xl mt-2">
        Driving License Verification
        <span className="text-blue-500 pl-2 font-bold">Panel</span>
      </h2>
      <input
        type="text"
        value={cnic}
        onChange={handleCnicChange}
        className="w-full m-5 px-3 py-2 placeholder:text-xs sm:placeholder:text-sm border rounded-lg text-sm outline-none"
        placeholder="Enter CNIC without dashes. e.g, (1111122222223)"
      />
      <button
        disabled={loading || !cnic}
        className={`w-60 xs:w-[300px] bg-[#3198D3] text-sm mt-2 p-3 border rounded-lg font-semibold text-white ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={handleSearchClick}
      >
        {loading ? 'Searching...' : 'SEARCH'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {verificationData && (
        <div className="w-full mt-10">
          <hr />
          <div className="sm:px-16 mt-10 mx-auto space-y-7 max-w-xl">
            <div className="w-full h-[150px] flex justify-center">
              <img
                src={ApiUrls.images + verificationData.image}
                className="h-full object-contain flex-1"
              />
            </div>
            <div className="flex border-b-2 gap-2b-2 gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                Name:
              </h2>
              <p className=" sm:text-xl">{verificationData.name}</p>
            </div>
            <div className="flex border-b-2 gap-2 xs:gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                Father Name:
              </h2>
              <p className=" sm:text-xl">{verificationData.fatherName}</p>
            </div>
            <div className="flex border-b-2 gap-2 xs:gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                CNIC:
              </h2>
              <p className=" sm:text-xl">{verificationData.cnic}</p>
            </div>
            <div className="flex border-b-2 gap-2 xs:gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                License Number:
              </h2>
              <p className=" sm:text-xl">{verificationData.licenseNo}</p>
            </div>
            <div className="flex border-b-2 gap-2 xs:gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                License Category:
              </h2>
              <p className=" sm:text-xl">
                {verificationData.category.map((category, i) => {
                  if (i !== verificationData.category.length - 1) {
                    return category.category + ' / '
                  } else {
                    return category.category
                  }
                })}
              </p>
            </div>
            <div className="flex border-b-2 gap-2 xs:gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                Issue Date:
              </h2>
              <p className=" sm:text-xl">{verificationData.issueDate}</p>
            </div>
            <div className="flex border-b-2 gap-2 xs:gap-5 font-bold">
              <h2 className="text-left text-gray-400 xs:min-w-[150px] sm:min-w-[180px] font-bold rounded-lg">
                Expire Date:
              </h2>
              <p className=" sm:text-xl">{verificationData.expiryDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LicenseVerification
