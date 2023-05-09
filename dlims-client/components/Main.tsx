import React from "react";
import "font-awesome/css/font-awesome.min.css";
import Image from "next/image";
import LicenseVerification from "./LicenseVerification";

const Main: React.FC = () => {
  return (
    <div
      id="home"
      className="w-full flex flex-col items-center text-[#666666] tracking-wider mb-10 px-5 pt-8"
    >
      <div className="">
        <h1 className="text-4xl p-5 font-bold">
          License Verification
        </h1>
      </div>
      {/* <div className="w-full px-7 leading-5 py-4 max-w-[700px] box-shadow h-max min-h-[220px] flex flex-col items-center text-[#666666] rounded-2xl border-[3px] border-blue-600">
        <h2 className="text-3xl mt-2">
          Driving License Verification
          <span className="text-blue-500 font-bold">
            Panel
          </span>
        </h2>
        <input
          className="w-full m-5 px-3 py-2 border rounded-lg text-sm outline-none"
          placeholder="Please Enter Your CNIC without dashes. e.g, (1111122222223)"
        />
        <button className="w-[300px] bg-[#3198D3] text-sm mt-2 p-3 border rounded-lg font-semibold text-white">
          SEARCH
        </button>
      </div> */}
      <LicenseVerification/>
      <div className="bg-[#EFF2FF] rounded-lg py-[70px] mt-16 px-5 w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl text-[#242A56] font-semibold ">
          "Online License Verification"
        </h1>
        <p className="max-w-[726px]">
          We have introduced the facility of online
          verification of driving licenses in all
          categories. In order to facilitate the general
          public at door step and encourage them to get
          learners and driving license with ease, Mobile
          Units are operated throughout KPK.
        </p>
      </div>

      <h1 className="text-4xl pt-10 text-[#666666] font-semibold ">
        Our Services
      </h1>
      <div
        id="Services"
        className="flex flex-wrap justify-between px-12 py-16 gap-5"
      >
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-`md` h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-car"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold">
            MotorCar-Jeep
          </h1>
          <p className="text-[#0a3847] text-sm">
            Motorcar/Jeep driving license is valid only for
            non-commercial cars.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-`md` h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-taxi"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold">
            LTV
          </h1>
          <p className="text-[#0a3847] text-sm">
            Light transport vehicle driving license is valid
            for commercial car-taxi , jeep , Mini bus and
            lightweight transport.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-`md` h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-truck"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold">
            HTV
          </h1>
          <p className="text-[#0a3847] text-sm">
            Heavy transport vehicle driving license is valid
            for buses , trucks , trailers , and any type of
            heavy transport.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-`md` h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-bus"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold">
            PSV
          </h1>
          <p className="text-[#0a3847] text-sm">
            For Public service vehicles driving.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-`md` h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-motorcycle"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold">
            Motorcycle
          </h1>
          <p className="text-[#0a3847] text-sm">
            Motorcycle driving license for safe Riding
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center max-w-lg text-center gap-4">
        <h1 className="text-3xl font-bold tracking-normal">
          "Why Driving License is Important"
        </h1>
        <p>
          Driving without Driving License can be deadly harm
          for you & others. You are requested to read Road
          Safety & Sign make your driving smooth & Obtain
          Driving License. "Driving License is mandatory in
          KPK"
        </p>
        <Image
          alt="Logo"
          src="/main_logo.png"
          width={65}
          height={65}
        />
        <p>DCLIMS</p>
        <p>TRAFFIC POLICE PESHAWAR</p>
      </div>
    </div>
  );
};

export default Main;
