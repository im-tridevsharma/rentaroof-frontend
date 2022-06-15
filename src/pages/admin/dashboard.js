import Widget1 from "../../components/dashboard/widget-1";
import Section from "../../components/dashboard/section";
import SectionTitle from "../../components/dashboard/section-title";
import { Bar1 } from "../../components/dashboard/bar-chart";
import { Donut1 } from "../../components/dashboard/donut-chart";
import { Line1 } from "../../components/dashboard/line-chart";
import Dropdown1 from "../../components/widgets/dropdown-1";
import { FiHome, FiUserCheck, FiUsers } from "react-icons/fi";
import { useEffect, useState } from "react";
import { totalUser } from "../../lib/users";
import { totalIbo } from "../../lib/ibos";
import { totalLandlord } from "../../lib/landlords";

const Index = () => {
  const [userCount, setUserCount] = useState(0);
  const [iboCount, setIboCount] = useState(0);
  const [landlordCount, setLandlordCount] = useState(0);
  const [rentedPropertyCount, setRentedPropertyCount] = useState(0);
  const [propertiesStat, setPropertiesStat] = useState([]);

  useEffect(() => {
    (async () => {
      const user = await totalUser();
      const landlord = await totalLandlord();
      const ibo = await totalIbo();

      if (user?.status) {
        setUserCount(user.data);
      }
      if (ibo?.status) {
        setIboCount(ibo.data?.ibos);
        setRentedPropertyCount(ibo?.data?.rented);
        setPropertiesStat(ibo?.data?.properties_stat);
      }
      if (landlord?.status) {
        setLandlordCount(landlord.data);
      }
    })();
  }, []);

  return (
    <>
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Total Rented"
            description={rentedPropertyCount}
            right={
              <FiHome size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Users"
            description={userCount}
            right={
              <FiUsers size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="IBOs"
            description={iboCount}
            right={
              <FiUserCheck size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Landlords"
            description={landlordCount}
            right={
              <FiUserCheck size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        {false && (
          <div className="w-full lg:w-2/3">
            <Section
              title="House Rented"
              description={<span>This year</span>}
              right={<Dropdown1 payload={propertiesStat} />}
            >
              <div className="flex flex-row w-full">
                <Bar1 />
              </div>
            </Section>
          </div>
        )}
        <div className="w-full lg:w-2/3">
          <Section
            description={
              <span>
                Properties
                <b className="ml-5 text-green-400">
                  Verified:{" "}
                  {Object.values(propertiesStat.verified).reduce(
                    (b, c) => b + c,
                    0
                  )}
                </b>
                <b className="ml-5 text-red-400">
                  Not Verified:{" "}
                  {Object.values(propertiesStat.notverified).reduce(
                    (b, c) => b + c,
                    0
                  )}
                </b>
              </span>
            }
          >
            <div className="flex flex-row w-full">
              <Line1 payload={propertiesStat} />
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/3">
          <Section title="" description={<span>Users</span>}>
            <div className="flex flex-row w-full">
              <Donut1
                payload={{
                  ibo: iboCount,
                  landlord: landlordCount,
                  tenant: userCount,
                }}
              />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};
export default Index;
