'use client'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { LicenseI } from '@/shared/interfaces/License.interface'
import { LicenseFormI } from './License.interface'
import ApiUrls from '@/constants/ApiUrls'
import { Admin } from '@/shared/interfaces/admin'
import { KyInstance } from 'ky/distribution/types/ky'
import useStatus from '@/shared/utils/useStatus'
import toast from 'react-hot-toast'
import ky from 'ky'
import isEmpty from 'is-empty'

const useLicenses = () => {
  const kyInstance = ky.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })
  //* Status State
  const {
    status,
    setLoading,
    setSuccess,
    setError,
    setMiniLoading,
    resetStatus,
  } = useStatus()
  //*---------------------------------

  //* Add/Edit License Form
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
  console.log('licenseForm-->', licenseForm)
  const handleLicenseForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target
    if (name === 'image' && files) {
      setLicenseForm((prevState) => ({
        ...prevState,
        image: files[0],
      }))
    } else {
      setLicenseForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }))
    }
    // else {
    //   setLicenseForm((prevState) => ({
    //     ...prevState,
    //     [name]: value,
    //   }));
    // }
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
    setLicenseForm({ ...license, image: null })
    setEditLicenseId(license.id)
    console.log('licens>', license)
  }

  //*---------------------------------

  /* Search Parameters */
  const [search, setSearch] = useState({
    cnic: '',
    sort: 'desc',
    pagination: {
      page: 1,
      limit: 5,
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

  const onAddLicense = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    addLicenseandEdit()
  }

  //Add New One
  const addLicenseandEdit = async () => {
    const loadingToast = toast.loading('Adding License')
    try {
      // Form Data
      const form = new FormData()
      Object.entries(licenseForm).forEach(([key, value]) => {
        if (value instanceof Array) {
          console.log('got the categories')
          form.append(key, JSON.stringify(value))
        } else {
          form.append(key, value)
        }
      })
      if (editFlag) {
        // Editing an existing license
        await kyInstance
          .put(ApiUrls.licenses.update + `${editLicenseId}`, {
            body: form,
          })
          .json()
        setEditFlag(false)
        toast.success('License Updated')
      } else {
        const res = kyInstance.post(ApiUrls.licenses.create, {
          body: form,
        })
        toast.success('License Added')
      }

      // Clear the license form
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
      getLicenses()
    } catch (error) {
      console.log(error)
    } finally {
      toast.dismiss(loadingToast)
    }
  }

  const getLicenses = async (customSearch: string | undefined = undefined) => {
    try {
      setLoading()
      setSearchChange(searchStr)
      const res: any = await kyInstance
        .get(
          ApiUrls.licenses.get + `${customSearch ? customSearch : searchStr}`
        )
        .json()
      if (res.licenses) {
        setLicenses(res.licenses)
        setSuccess(res.message)
        setPagination(res.pagination)
      } else {
        throw new Error('An error Occoured, refresh and try again')
      }
    } catch (error: any) {
      console.log(error)
      const message =
        error?.response?.data?.message || error?.message || error.toString()
      setError(message)
    }
  }

  //   const onDeletLicense = async (cnic: string) => {
  //     try {
  //       await kyInstance.delete(
  //         ApiUrls.licenses.delete + `${cnic}`
  //       );
  //       setLicenses(
  //         licenses.filter((license) => license.cnic !== cnic)
  //       );
  //       // getLicenses();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const onDeletLicense = async (cnic: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this license?'
    )
    if (confirmDelete) {
      const loadingToast = toast.loading('Deleting License')
      try {
        const res = await kyInstance.delete(ApiUrls.licenses.delete + `${cnic}`)
        toast.success('License Deleted')
        // if (editLicense && editLicense.cnic === cnic) {
        //   setEditLicense(null);
        // }
      } catch (error) {
        console.log(error)
      } finally {
        toast.dismiss(loadingToast)
      }
    }
  }

  // const handleEdit = (user: VerificationData) => {
  //     setEditingUser(user);
  //     setNewUser(user);
  // };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     if (editingUser) {
  //         axios
  //             .put(
  //                 `http://localhost:8000/users/${editingUser.licenseNo}`,
  //                 newUser
  //             )
  //             .then((response) => {
  //                 console.log(response.data);
  //                 setUsers(
  //                     users.map((user) =>
  //                         user.licenseNo === editingUser.licenseNo
  //                             ? newUser
  //                             : user
  //                     )
  //                 );
  //                 setEditingUser(null);
  //                 setNewUser({
  //                     licenseNo: "",
  //                     name: "",
  //                     fatherName: "",
  //                     licenseCategory: "",
  //                     issueDate: "",
  //                     expireDate: "",
  //                 });
  //                 alert("User updated successfully");
  //             })
  //             .catch((error) => {
  //                 console.error(error);
  //                 alert("Failed to update user");
  //             });
  //     } else {
  //         axios
  //             .post("http://localhost:8000/users/", newUser)
  //             .then((response) => {
  //                 console.log(response.data);
  //                 setUsers([...users, newUser]);
  //                 setNewUser({
  //                     licenseNo: "",
  //                     name: "",
  //                     fatherName: "",
  //                     licenseCategory: "",
  //                     issueDate: "",
  //                     expireDate: "",
  //                 });
  //                 alert("User added successfully");
  //             })
  //             .catch((error) => {
  //                 console.error(error);
  //                 alert("Failed to add user");
  //             });
  //     }
  // };

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

  useEffect(() => {
    console.log('licenses->', licenses)
  }, [licenses])

  return {
    status,
    editFlag,
    setEditFlag,
    licenseForm,
    handleLicenseForm,
    handleEdit,
    handleCategory,
    licenses,
    formFields,
    onAddLicense,
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
