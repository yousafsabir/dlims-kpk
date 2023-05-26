import Image from 'next/image'
import React from 'react'

const RoadSafety: React.FC = () => {
  return (
    <div id="RoadSafety" className="px-5">
      <div className="bg-[#EFF2FF] rounded-lg py-[70px] space-y-4 my-16 px-5 w-full flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl text-[#242A56] font-semibold ">
          "Your Life is Important"
        </h1>
        <h3 className="text-xl text-[#242A56] font-semibold ">
          We're care about our Citizens
        </h3>
        <p className="max-w-[726px] text-[#242A56]  text-lg">
          Motorcycle Rider’s are requested to obtain their driving license must.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-5 text-[#242A56] dark:text-[#ffff]">
        <div className="flex flex-col md:flex-1 space-y-6">
          <h1 className="text-5xl font-semibold ">Road Safety Rules</h1>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              ● Instructions for Car Drivers
            </h2>
            <p className="text-lg pl-7 tracking-wide">
              Always carry your driving license and important documents such as
              your vehicle registration certificate with you while driving
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              ● Instructions for PSV Drivers
            </h2>
            <p className="text-lg pl-7 tracking-wide">
              Always carry your driving license and important documents such as
              your vehicle registration certificate, fitness certificate and
              route permit with you while driving.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              ● Instructions for Motorcyclists
            </h2>
            <p className="text-lg pl-7 tracking-wide">
              The motorized two-wheeler rider is the one most likely to sustain
              serious injuries no matter what he hits- a pedestrian, a cat or
              another vehicle. Hence, the use of helmet is supposed to save the
              life.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              ● Instructions for Bus and Truck Drivers
            </h2>
            <p className="text-lg pl-7 tracking-wide">
              They should be driven on the extreme left, speed governors are
              mandatory for them and the maximum speed limit for buses and
              trucks is 40 KMPH in city areas.
            </p>
          </div>
          <div>
            <Image
              alt="Traffic Instructions Image"
              src="/images/trafficInstructions.png"
              height={630}
              width={350}
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">
              ● Instructions for Bus Commuters
            </h2>
            <p className="text-lg pl-7 tracking-wide">
              Bus commuters should never board or dashboard a moving bus.
              Maintaining a queue while boarding the bus will help avoid
              unnecessary hustle and bustle and will also save time.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">● Instructions for Cyclists</h2>
            <p className="text-lg pl-7 tracking-wide">
              Ride in a straight line for 10 meters
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">Instructions for Pedestrians</h2>
            <p className="text-lg pl-7 tracking-wide">
              The most important safety tip to reduce pedestrian injuries and
              fatalities is to pay attention.
            </p>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">● Instructions for Children</h2>
            <p className="text-lg pl-7 tracking-wide">
              The advice given below on crossing the road is especially for
              children.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-1 space-y-4 text-lg">
          <h2 className="text-3xl font-bold">DIVIDING LINES</h2>
          <div className="space-y-4">
            <p>
              A dividing line is a road marking formed by a white/yellow line or
              two parallel white/yellow lines (broken or continuous) designed to
              separate the parts of a road to be used by vehicles travelling in
              opposite directions.
            </p>
            <div className="flex gap-5 flex-wrap">
              <Image
                alt="Broken Line"
                src="/images/broken_line.gif"
                width={260}
                height={200}
              />
              <Image
                alt="Broken Line"
                src="/images/broken_line_left.gif"
                width={260}
                height={200}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              Broken Line (or Broken Line to the left of a Continuous Line{' '}
            </h2>
            <p>
              You must keep to the left of these lines. You may cross them to
              overtake or make a turn, but you must only do so if it is safe.
              Single Continuous Line (or Single Continous Line to the left of a
              Broken Line).
            </p>
            <div className="flex gap-5 flex-wrap">
              <Image
                alt="Broken Line"
                src="/images/continous_line_left.gif"
                width={260}
                height={200}
              />
              <Image
                alt="Broken Line"
                src="/images/single_continous_line.gif"
                width={260}
                height={200}
              />
            </div>
            <div className="space-y-4">
              <p>
                You must keep to the left of these lines. You must not cross
                these lines to overtake or make a U-Turn but may cross them to
                enter or leave the road or to go past an obstruction..
              </p>
              <h2 className="text-xl font-bold">Avoiding an obstruction</h2>
              <p>
                You are permitted to cross single or double continous lines in
                order to avoid an obstruction – This does not include a slower
                moving vehicle or a vehicle stopped in a line of traffic, but
                may include a fallen tree, a crashed vehicle, or a car that has
                broken down or is illegally parked. Before crossing the line,
                you must have a clear view of the road ahead and it must be
                safe. You must also be very sure that you cross safely because
                the onus is on you to take the risk of danger into account.
              </p>
              <div className="flex gap-5 flex-wrap">
                <Image
                  alt="Broken Line"
                  src="/images/obstruction.gif"
                  width={260}
                  height={200}
                />
                <Image
                  alt="Broken Line"
                  src="/images/broken_lane_left.gif"
                  width={260}
                  height={200}
                />
              </div>
              <p>
                When lanes are marked by broken lines the driver may change
                lanes when it is safe to do so by indicating the intention
                through proper signal..
              </p>
              <h1 className="text-xl font-bold">Straddling</h1>
              <p>
                When driving on a road marked with Lane Lines, you must keep
                your vehicle entirely within a lane. It is an offence to
                straddle a line. The red car in the illustration is straddling
                the lane line.
              </p>

              <div className="flex flex-wrap gap-5">
                <Image
                  alt="Broken Line"
                  src="/images/straddling.gif"
                  width={260}
                  height={200}
                />
                <div className="">
                  <h1 className="text-xl font-bold">Solid Lane Line.</h1>
                  <Image
                    alt="Broken Line"
                    src="/images/solid_lane_line.gif"
                    width={260}
                    height={200}
                  />
                </div>
              </div>
              <p>
                Motorists are expected to change lanes while driving in the Lane
                Change Zone (marked by lanes with broken lines) so that they are
                in the appropriate line when they enter the No Lane Changing
                Zone near the intersection. (marked by Solid Lane Lines) . The
                red car in the illustration iscommitting an offence.
              </p>

              <h1 className="text-xl font-bold">EDGE LINES</h1>
              <p>
                These are continous lines at the edge of the carriageway and
                mark the limits of the main carriageway upto which a driver can
                safely venture.
              </p>

              <div className="flex flex-wrap gap-5">
                <Image
                  alt="Broken Line"
                  src="/images/straddling.gif"
                  width={260}
                  height={200}
                />
                <div>
                  <h1 className="text-xl font-bold">Yellow Edge Line.</h1>
                  <Image
                    alt="Broken Line"
                    src="/images/solid_lane_line.gif"
                    width={260}
                    height={200}
                  />
                </div>
              </div>
              <p>
                You must not stop or park your vehicle in any area where a
                continous yellow edge line is applied even to pick up or set
                down passengers or goods..
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadSafety
