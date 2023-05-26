import React from 'react'

const Services = () => {
  return (
    <>
      <h1
        id="Services"
        className="text-4xl pt-10 text-[#666666] font-semibold dark:text-[#ffff]"
      >
        Our Services
      </h1>
      <div className="flex flex-wrap justify-center px-12 py-16 gap-5">
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-[300px] h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-motorcycle"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold dark:text-[#ffff]">Motorcycle</h1>
          <p className="text-[#0a3847] dark:text-[#b7bedb] text-sm">
            Motorcycle driving license for safe Riding
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-[300px] h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-car"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold dark:text-[#ffff]">MotorCar-Jeep</h1>
          <p className="text-[#0a3847] dark:text-[#b7bedb] text-sm">
            Motorcar/Jeep driving license is valid only for non-commercial cars.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-[300px] h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-taxi"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold dark:text-[#ffff]">LTV</h1>
          <p className="text-[#0a3847] dark:text-[#b7bedb] text-sm">
            Light transport vehicle driving license is valid for commercial
            car-taxi , jeep , Mini bus and lightweight transport.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-[300px] h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-truck"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold dark:text-[#ffff]">HTV</h1>
          <p className="text-[#0a3847] dark:text-[#b7bedb] text-sm">
            Heavy transport vehicle driving license is valid for buses , trucks
            , trailers , and any type of heavy transport.
          </p>
        </div>
        <div className="flex flex-col flex-1 box-shadow rounded-xl min-w-[300px] max-w-[300px] h-72 p-5 items-center text-center">
          <div className="text-5xl p-3 text-[#6878D6]">
            <i className="fa fa-bus"></i>
          </div>
          <h1 className="text-2xl font-sans p-3 font-bold dark:text-[#ffff]">PSV</h1>
          <p className="text-[#0a3847] dark:text-[#b7bedb] text-sm">
            For Public service vehicles driving.
          </p>
        </div>
      </div>
    </>
  )
}

export default Services
