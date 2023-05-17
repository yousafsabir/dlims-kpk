'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ky from 'ky'
import ApiUrls from '@/constants/ApiUrls'
import Licenses from './components/tabs/licenses/Licenses'
import toast, { Toaster } from 'react-hot-toast'
import Contacts from './components/tabs/contacts/Contacts'
import Image from 'next/image'
import Link from 'next/link'

const AdminPanel = () => {
  const router = useRouter()
  const [authToken, setAuthToken] = useState('')
  const [navRout, setNavRout] = useState<string>('licenses')

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
      toast.error('Your session is expired. Login again')
      logout()
    }
  }

  function logout() {
    localStorage.removeItem('authToken')
    router.push('/login')
  }

  return (
    <>
      <div className="max-w-5xl flex justify-between items-center mx-auto w-full px-2 py-5">
        <Link href={'/'}>
          <Image
            alt="LOGO"
            width={70}
            height={70}
            src="/images/main_logo.png"
          />
        </Link>
        <div className="space-x-6">
          <button
            className={`text-xl ${
              navRout === 'licenses' ? 'font-bold underline' : ''
            }`}
            onClick={() => setNavRout('licenses')}
          >
            Licenses
          </button>
          <button
            className={`text-xl ${
              navRout === 'contacts' ? 'font-bold underline' : ''
            }`}
            onClick={() => setNavRout('contacts')}
          >
            Contacts
          </button>
        </div>
        <button className="btn btn-error">Logout</button>
      </div>
      <hr className="mb-10" />
      {navRout === 'licenses' ? <Licenses /> : navRout === 'contacts' ? <Contacts /> : null}
      <Toaster />
    </>
  )
}

export default AdminPanel
