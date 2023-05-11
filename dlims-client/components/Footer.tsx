import Image from 'next/image'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col justify-between text-white pt-20 p-10 gap-7 sm:px-16 m-5 bg-footer h-max min-h-[420px]">
      <div className="flex flex-col sm:flex-row justify-between items-start space-y-7 sm:space-y-0">
        <div className="md:h-32 md:w-32">
          <Image
            alt="Logo"
            src="/images/main_logo.png"
            width={110}
            height={110}
          />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-xl">Company</h2>
          <div className="flex flex-col space-y-2 text-sm">
            <p>Home</p>
            <p>Road Saftey</p>
            <p>Services</p>
            <p>Contact</p>
          </div>
        </div>
        <div className="flex flex-col w-48 md:max-w-xs space-y-2">
          <h2 className="text-xl">Get In Touch</h2>
          <p>Traffic police headquarters, phase 3 gulbahar, Peshawar KPK.</p>
          <p>dlimskpkgov@gmail.com</p>
        </div>
      </div>
      <p>COPYRIGHT © 2022 - DLIMS PESHAWAR. ALL RIGHTS RESERVED.</p>
    </div>
  )
}

export default Footer
