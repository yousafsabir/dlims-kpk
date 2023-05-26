'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Contact } from './Contact.interface'
import ApiUrls from '@/constants/ApiUrls'
import useStatus from '@/shared/utils/useStatus'
import toast from 'react-hot-toast'
import ky from 'ky'
import useRequestHandler from '@/shared/utils/useRequestHandler'


const useContacts = () => {
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

  const { requestHandler } = useRequestHandler()


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


  const formRef = useRef<HTMLFormElement>(null)

  //*---------------------------------

  /* Search Parameters */
  const [search, setSearch] = useState({
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
  const searchStr = `?${
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
  const resetSearch = () => {
    setSearch({
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
    getContacts()
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
      getContacts()
      setPaginationChange(false)
    }
  }, [paginationChange])
  /* ---------------- */

  //* Licenses State
  const [contacts, setContacts] = useState<Contact[]>([])

  const getContacts = async (customSearch: string | undefined = undefined) => {
    // try {
    //   setLoading()
    //   setSearchChange(searchStr)
    //   const res: any = await kyInstance
    //     .get(
    //       ApiUrls.contacts.get + `${customSearch ? customSearch : searchStr}`
    //     )
    //     .json()
    //   if (res.contacts) {
    //     setContacts(res.contacts)
    //     setSuccess(res.message)
    //     setPagination(res.pagination)
    //   } else {
    //     throw new Error('An error Occoured, refresh and try again')
    //   }
    // } catch (error: any) {
    //   console.log(error)
    //   const message =
    //     error?.response?.data?.message || error?.message || error.toString()
    //   setError(message)
    // }
    requestHandler<{ customSearch: string | undefined }>(
      {
        customSearch,
      },
      async (args) => {
        setSearchChange(searchStr)
        const res: any = await kyInstance
          .get(
            ApiUrls.contacts.get +
              `${args.customSearch ? args.customSearch : searchStr}`
          )
          .json()
        if (res.contacts) {
          setContacts(res.contacts)
          setSuccess(res.message)
          setPagination(res.pagination)
        } else {
          throw new Error('An error Occoured, refresh and try again')
        }
      },
      {
        loadingType: 'standard',
        showToast: false,
      }
    )()
  }

  const onDeletContact = async (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this contact?'
    )
    if (confirmDelete) {
      const loadingToast = toast.loading('Deleting Contact')
      try {
        const res = await kyInstance.delete(ApiUrls.contacts.delete + `${id}`)
        toast.success('Contact Deleted')
        // getContacts()
      } catch (error) {
        console.log(error)
      } finally {
        toast.dismiss(loadingToast)
      }
    }
  }

  useEffect(() => {
    getContacts()
  }, [])

  return {
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
  }
}

export default useContacts
