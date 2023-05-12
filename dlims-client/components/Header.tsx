import Navbar from './Navbar'

const Header: React.FC = () => {
  return (
    <div className="relative h-[90vh] w-full bg-header bg-no-repeat bg-cover bg-center">
      <Navbar />
        <div className="max-w-2xl mx-auto p-3 flex text-white flex-col items-center text-center lg:mt-[200px] md:mt-[175px] sm:mt-[50px]">
          <h3 className="text-xl">Be Respectful Citizen</h3>
          <h1 className="text-5xl p-5 font-bold">DLIMS KPK</h1>
          <p className="text-base">
            Driving license is an important document even more important than
            your national identity card as this give you authority to drive your
            vehicle on roads after passing through different tests which are
            made to give you awareness about the road ethics, road safety, the
            driving license is the official document which authorizes its holder
            to operat’e various types of motor vehicle on roads to which the
            public have access.
          </p>
        </div>
    </div>
  )
}

export default Header
