'use client'
import React, { useState, useEffect, useRef } from 'react'
import { LicenseI } from '@/shared/interfaces/License.interface'
import { LicenseFormI } from './License.interface'
import ApiUrls from '@/constants/ApiUrls'
import ky from 'ky'
import isEmpty from 'is-empty'
import useRequestHandler from '@/shared/utils/useRequestHandler'

const useLicenses = () => {
  'use client'
  const [authToken, setAuthToken] = useState('')
  const kyInstance = ky.create({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) setAuthToken(token)
  }, [])
  //* Request Handler
  const { status, requestHandler } = useRequestHandler()
  //*---------------------------------

  //* Add/Edit License Form
  const formRef = useRef<HTMLFormElement>(null)
  const [editFlag, setEditFlag] = useState<boolean>(false)
  const [editLicenseId, setEditLicenseId] = useState<string>('')
  const [licenseForm, setLicenseForm] = useState<LicenseFormI>({
    licenseNo: '',
    name: '',
    fatherName: '',
    category: [],
    cnic: '',
    image: null,
    issueDate: '',
    expiryDate: '',
  })

  const handleLicenseForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target
    if (name === 'image' && files) {
      const license = { ...licenseForm, image: files[0] }
      setLicenseForm(license)
    } else {
      setLicenseForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }))
    }
  }

  const handleCategory = (
    add: boolean,
    category: { category: string; place: number }
  ) => {
    let updatedList = licenseForm.category
    if (add) {
      updatedList = [...updatedList, category]
    } else {
      updatedList = updatedList.filter(
        (item) => item.category !== category.category
      )
    }
    setLicenseForm((prevState) => ({
      ...prevState,
      category: updatedList,
    }))
  }

  const handleEdit = (license: LicenseI) => {
    setEditFlag(true)
    setLicenseForm({ ...license })
    setEditLicenseId(license.id)
  }

  const resetLicenseForm = () => {
    formRef.current?.reset()
    setLicenseForm({
      licenseNo: '',
      name: '',
      fatherName: '',
      category: [],
      cnic: '',
      image: null,
      issueDate: '',
      expiryDate: '',
    })
  }

  //*---------------------------------

  /* Search Parameters */
  const [search, setSearch] = useState({
    cnic: '',
    sort: 'desc',
    pagination: {
      page: 1,
      limit: 15,
      total: 0,
      prev: false,
      next: false,
    },
  })
  const [searchChange, setSearchChange] = useState<string>('')
  const searchStr = `?${search.cnic ? `cnic=${search.cnic}&` : ''}${
    search.pagination?.page ? `page=${search.pagination.page}&` : ''
  }${search.pagination?.limit ? `limit=${search.pagination.limit}&` : ''}${
    search.sort ? `sort=${search.sort}&` : ''
  }`
  const disableApplyFilterBtn = Boolean(searchStr === searchChange)
  const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch((prev) => ({
      ...prev,
      sort: e.target.value,
    }))
  }
  const setCnic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev) => ({
      ...prev,
      cnic: e.target.value,
    }))
  }
  const resetSearch = () => {
    setSearch({
      cnic: '',
      sort: 'descending',
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        prev: false,
        next: false,
      },
    })
  }
  const applySearch = () => {
    if (disableApplyFilterBtn || status.loading || status.miniLoading) return
    getLicenses()
  }
  const setPagination = (pagination: {
    page: number
    limit: number
    total: number
    prev: boolean
    next: boolean
  }) => {
    setSearch((prev) => ({ ...prev, pagination }))
  }
  const [paginationChange, setPaginationChange] = useState<boolean>(false)
  const nextPage = () => {
    setSearch((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page: prev.pagination.page + 1,
      },
    }))
    setPaginationChange(true)
  }
  const prevPage = () => {
    setSearch((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page: prev.pagination.page - 1,
      },
    }))
    setPaginationChange(true)
  }
  useEffect(() => {
    if (paginationChange) {
      getLicenses()
      setPaginationChange(false)
    }
  }, [paginationChange])
  /* ---------------- */

  //* Licenses State
  const [licenses, setLicenses] = useState<LicenseI[]>([])

  const onAddAndUpdateLicense = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    addAndUpdateLicense()
  }

  //Add & Update License
  const addAndUpdateLicense = () => requestHandler(
    async () => {
      // Form Data
      const form = new FormData()
      Object.entries(licenseForm).forEach(([key, value]) => {
        if (!isEmpty(value)) {
          if (value instanceof Array) {
            form.append(key, JSON.stringify(value))
          } else if (key === 'image' && typeof value !== 'string') {
            form.append(key, value)
          } else {
            form.append(key, value)
          }
        } else {
          console.log(`${key} is empty`)
        }
      })
      if (editFlag) {
        // Updating an existing license
        await kyInstance
          .put(ApiUrls.licenses.update + `${editLicenseId}`, {
            body: form,
          })
          .json()
        setEditFlag(false)
      } else {
        const res = kyInstance.post(ApiUrls.licenses.create, {
          body: form,
        })
      }
      resetLicenseForm()
      setTimeout(() => getLicenses(), 1000)
    },
    {
      showToast: true,
      loadingMessage: `${editFlag ? 'Updating' : 'Adding'} License`,
      successMessage: `License ${editFlag ? 'Updated' : 'Added'}`,
    }
  )

  const getLicenses = (customSearch: string | undefined = undefined) => 
    requestHandler(
      async () => {
        setSearchChange(searchStr)
        const res: any = await kyInstance
          .get(
            ApiUrls.licenses.get +
              `${customSearch ? customSearch : searchStr}`
          )
          .json()
        if (res.licenses) {
          setLicenses(res.licenses)
          setPagination(res.pagination)
        } else {
          throw new Error('An error Occoured, refresh and try again')
        }
      },
      {
        loadingType: 'standard',
        showToast: false,
      }
    )

  const onDeletLicense = (cnic: string) =>
    requestHandler(
      async () => {
        await kyInstance.delete(ApiUrls.licenses.delete + `${cnic}`)
        getLicenses()
      },
      {
        confirmation: true,
        confirmationMessage: 'Are you sure you want to delete this license?',
        loadingMessage: 'Deleting Licenses',
        successMessage: 'Licenses Deleted',
        errorMessage: "Couldn't delete Licenses, Please Try again",
      }
    )

  const formFields = [
    {
      label: 'License Number',
      name: 'licenseNo',
      type: 'text',
    },
    { label: 'Name', name: 'name', type: 'text' },
    {
      label: 'Father Name',
      name: 'fatherName',
      type: 'text',
    },
    {
      label: 'CNIC',
      name: 'cnic',
      type: 'text',
    },
    {
      label: 'License Category',
      name: 'category',
      type: 'checkbox',
      content: [
        {
          name: 'M/CYCLE',
          value: {
            category: 'M/CYCLE',
            place: 1,
          },
        },
        {
          name: 'CAR',
          value: {
            category: 'CAR',
            place: 2,
          },
        },
        {
          name: 'LTV',
          value: {
            category: 'LTV',
            place: 3,
          },
        },
        {
          name: 'HTV',
          value: {
            category: 'HTV',
            place: 4,
          },
        },
        {
          name: 'PSV',
          value: {
            category: 'PSV',
            place: 5,
          },
        },
      ],
    },
    {
      label: 'Image',
      name: 'image',
      type: 'file',
    },
    {
      label: 'Issue Date',
      name: 'issueDate',
      type: 'date',
    },
    {
      label: 'Expiry Date',
      name: 'expiryDate',
      type: 'date',
    },
  ]

  useEffect(() => {
    getLicenses()
  }, [])

  return {
    status,
    editFlag,
    setEditFlag,
    formRef,
    licenseForm,
    handleLicenseForm,
    handleEdit,
    handleCategory,
    licenses,
    formFields,
    onAddAndUpdateLicense,
    onDeletLicense,
    getLicenses,
    // search & search handlers
    search,
    setSort,
    setCnic,
    applySearch,
    disableApplyFilterBtn,
    // Pagination
    prevPage,
    nextPage,
  }
}

export default useLicenses
