'use client'
import React, { useState, useEffect, useRef } from 'react'
import ApiUrls from '@/constants/ApiUrls'
import useStatus from '@/shared/utils/useStatus'
import toast from 'react-hot-toast'
import ky from 'ky'
import isEmpty from 'is-empty'

const useContacts = () => {
  'use client'
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

  const formRef = useRef<HTMLFormElement>(null)
  const [editFlag, setEditFlag] = useState<boolean>(false)

 
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

  //* Contacts State

  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  type Contact = {
    _id: string;
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


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await kyInstance.get(ApiUrls.contacts.get );
        const { contacts } = (await res.json()) as ContactsResponse;
        setContacts(contacts);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContacts();
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  const getContacts = async (customSearch: string | undefined = undefined) => {
    try {
      setLoading()
      setSearchChange(searchStr)
      const res: any = await kyInstance
        .get(
          ApiUrls.contacts.get + `${customSearch ? customSearch : searchStr}`
        )
        .json()
      if (res.licenses) {
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

  const onDeletContacts = async (email: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this license?'
    )
    if (confirmDelete) {
      const loadingToast = toast.loading('Deleting License')
      try {
        const res = await kyInstance.delete(ApiUrls.contacts.delete + `${email}`)
        toast.success('Contacts Deleted')
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
    editFlag,
    setEditFlag,
    formRef,
    onDeletContacts,
    getContacts,
    contacts,
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
