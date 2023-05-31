import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import Image from 'next/image'
import LicenseVerification from './LicenseVerification'
import Services from './Services'
import RoadSafety from './RoadSafety'
import Contact from './Contact'

const Main: React.FC = () => {
  return (
    <>
      <div
        id="Verification"
        className="w-full flex flex-col items-center text-[#666666] tracking-wider mb-10 px-5 pt-8"
      >
        <div className="">
          <h1 className="text-4xl p-5 font-bold dark:text-[#ffff]">License Verification</h1>
        </div>
        <LicenseVerification />
        <div className="bg-[#EFF2FF] text-[#242A56] rounded-lg py-[70px] mt-16 px-5 w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-semibold ">
            "Online License Verification"
          </h1>
          <p className="max-w-[726px]">
            We have introduced the facility of online verification of driving
            licenses in all categories. In order to facilitate the general
            public at door step and encourage them to get learners and driving
            license with ease, Mobile Units are operated throughout KPK.
          </p>
        </div>
        <Services />
        <div className="w-full font-bold flex flex-col items-center max-w-lg text-center gap-4 dark:text-[#ffff]">
          <h1 className="text-3xl  tracking-normal ">
            "Why Driving License is Important"
          </h1>
          <p className="dark:text-[#b7bedb] tracking-wider">
            Driving without Driving License can be deadly harm for you & others.
            You are requested to read Road Safety & Sign make your driving
            smooth & Obtain Driving License. "Driving License is mandatory in
            KPK"
          </p>
          <Image
            alt="Logo"
            src="/images/main_logo.png"
            width={65}
            height={65}
          />
          <p>DCLIMS</p>
          <p>TRAFFIC POLICE PESHAWAR</p>
        </div>
      </div>
      <RoadSafety />
      <Contact />
    </>
  )
}

export default Main
