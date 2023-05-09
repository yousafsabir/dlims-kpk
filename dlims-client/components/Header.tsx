import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <div className="relative h-[100vh] w-full bg-[url('/banner.jpeg')] bg-no-repeat bg-cover bg-center">
      <div className="absolute w-full h-full bg-black opacity-70" />
      <div className="absolute w-full text-white tracking-wide">
        <div>
          <Navbar />
        </div>
        <div className="max-w-2xl mx-auto p-3 flex flex-col items-center text-center">
          <h3 className="text-xl">Be Respectful Citizen</h3>
          <h1 className="text-5xl p-5 font-bold">
            DLIMS KPK
          </h1>
          <p className="text-base">
            Driving license is an important document even
            more important than your national identity card
            as this give you authority to drive your vehicle
            on roads after passing through different tests
            which are made to give you awareness about the
            road ethics, road safety, the driving license is
            the official document which authorizes its
            holder to operat’e various types of motor
            vehicle on roads to which the public have
            access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
