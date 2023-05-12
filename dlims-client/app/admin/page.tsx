'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ky from 'ky'
import ApiUrls from '@/constants/ApiUrls'
import Licenses from './components/tabs/licenses/Licenses'
import { Toaster } from 'react-hot-toast'
import Contacts from './components/tabs/newContacts/Contacts'
import Image from 'next/image'
import Link from 'next/link'

const AdminPanel = () => {
  const router = useRouter()
  const [authToken, setAuthToken] = useState('')
  const [navRout, setNavRout] = useState<string>("licenses")

  // ky instance
  const api = ky.create({
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })

  // Admin Auth
  useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem('authToken')
      if (!token) {
        return router.push('/login')
      }
      authenticate(token)
    }
  }, [])

  // authenticate me
  async function authenticate(token: string) {
    try {
      const userRes = await api.get(ApiUrls.auth.authenticate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      setAuthToken('')
      localStorage.removeItem('authToken')
      router.push('/login')
    }
  }

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    router.push('/login')
    setAuthToken('')
  } 

  return (
    <>
      <div className="flex justify-between w-full px-4 pt-5">
        <div>
          <Image alt="LOGO" width={70} height={70} src="/images/main_logo.png" />
        </div>
        <div className="flex h-14 justify-center">
          <div onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            setNavRout("licenses")}
            className="">
            <h2 className='p-2 h-10 hover:cursor-pointer rounded-lg hover:text-gray-800 hover:bg-slate-100'>Licenses</h2>
          </div>
          <div onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            setNavRout("contacts")}
            className="">
            <h2 className='p-2 h-10 hover:cursor-pointer rounded-lg hover:text-gray-800 hover:bg-slate-100'>Contacts</h2>
          </div>
          <button onClick={handleLogOut} className='p-2 h-10 hover:cursor-pointer rounded-lg hover:text-gray-800 hover:bg-gray-500'>LOG OUT</button>
        </div>
      </div>
      {
        navRout === "licenses" ?
          <Licenses /> :
          <Contacts />
      }
      <Toaster />
    </>
  )
}

export default AdminPanel
