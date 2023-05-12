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

  return (
    <>
      <div className="flex justify-between w-full px-4 pt-5">
        <div>
          <Image alt="LOGO" width={70} height={70} src="/images/main_logo.png" />
        </div>
        <div className="">
          <div onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            setNavRout("licenses")
          }
            className="p-2 rounded-lg hover:text-gray-800 hover:bg-slate-100">
            <h2>Licenses</h2>
          </div>
          <div onClick={(event: React.MouseEvent<HTMLDivElement>) =>
            setNavRout("contacts")}
            className=" p-2 rounded-lg hover:text-gray-800 hover:bg-slate-100">
            <h2>Contacts</h2>
          </div>
        </div>
      </div>
      {
        navRout === "licenses" ?
          <Licenses /> :
          <Contacts />
      }
      {/* <Licenses />
      <Contacts /> */}
      <Toaster />
    </>
  )
}

export default AdminPanel
