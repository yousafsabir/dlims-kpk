'use client'
import React, { useState } from 'react'
import ReactLoading from 'react-loading'
import axios from 'axios'
import ky from 'ky'
import ApiUrls from '@/constants/ApiUrls'
import { Toaster, toast } from 'react-hot-toast'

interface ContactFormFields {
  name: string
  email: string
  phone: string
  message: string
}

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [contactFields, setcontactFields] = useState<ContactFormFields>({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const kyInstance = ky.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const res = kyInstance.post(ApiUrls.contacts.create, {
        json: contactFields as any,
      })
      toast.success(
        "Your Message has been Received.\n We'll contact you shortly",
        {
          duration: 5000,
        }
      )
      setcontactFields({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (err) {
      console.error(err)
      setError('An error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setcontactFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }))
  }

  return (
    <div id="Contact" className="px-5 py-10 md:p-10 lg:p-16 flex flex-col">
      <h1 className="text-[40px] p-10 text-center font-bold text-[#242A56]">
        Contact us
      </h1>
      <div className="flex flex-col justify-center md:flex-row lg:mx-auto lg:gap-16 lg:max-w-5xl md:justify-between">
        <div className="flex flex-col">
          <h2 className="text-[#242A56] text-3xl font-bold pb-3">
            Send your Query
          </h2>

          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 max-w-md items-start"
            >
              <input
                type="text"
                id="name"
                name="name"
                className="p-[10px] rounded-lg outline-none border w-full sm:w-4/5 md:w-[375px]"
                placeholder="Your Name *"
                value={contactFields.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                id="email"
                name="email"
                className="p-[10px] rounded-lg outline-none border w-full sm:w-4/5 md:w-[375px]"
                placeholder="Your Email *"
                value={contactFields.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                id="phone"
                name="phone"
                className="p-[10px] rounded-lg outline-none border w-full sm:w-4/5 md:w-[375px]"
                placeholder="Your Phone Number e.g, (+923330000000) *"
                value={contactFields.phone}
                onChange={handleChange}
                pattern="^\+92\d{10}$"
                required
              />
              <textarea
                id="message"
                name="message"
                placeholder="your message *"
                className="p-[10px] rounded-lg border outline-none h-32 w-full sm:w-4/5 md:w-[375px] resize-none"
                value={contactFields.message}
                onChange={handleChange}
                required
              />
              {isLoading ? (
                <ReactLoading type="spin" width={32} height={32} color="#999" />
              ) : (
                <button
                  className="p-3 w-32 h-12 hover:bg-blue-500 active:bg-[#4D61D6] bg-[#4D61D6] text-white rounded-lg text-sm"
                  type="submit"
                >
                  Send
                </button>
              )}
              {error && <p className="text-xs text-red-500">{error}</p>}
            </form>
          </div>
        </div>
        <div className="flex flex-col pt-16 md:pl-3 md:pt-0 min:w-80 md:max-w-xs xl:max-w-md space-y-3 text-[#242A56]">
          <h2 className="text-3xl font-bold">Get In Touch</h2>
          <h3 className="font-bold">Reach Us</h3>
          <div className="text-[#666666] space-y-3">
            <div className="flex justify-start">
              <span>
                <i className="fa fa-map-marker px-3 text-[#b1abd6]"></i>
              </span>
              <p className="">
                Traffic police headquarters, phase 3 gulbahar, Peshawar KPK.
              </p>
            </div>
            <p>
              <i className="fa fa-envelope p-3 text-[#b1abd6]"></i>
              dlimskpkgov@gmail.com
            </p>
            <p>
              <i className="fa fa-phone p-3 text-[#b1abd6]"></i>
              +923330000000
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-12">
        <h1 className="text-[#666666] text-2xl font-bold p-4">
          Find us on the Map
        </h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6614.0896806986575!2d71.56845850147639!3d34.01705994077423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d910c06eeabde5%3A0x5c3a5a21b18404fb!2sTraffic%20Police%20Headquarters!5e0!3m2!1sen!2s!4v1648569766801!5m2!1sen!2s"
          width="100%"
          height="500"
          loading="lazy"
        ></iframe>
      </div>
      <Toaster />
    </div>
  )
}

export default Contact
