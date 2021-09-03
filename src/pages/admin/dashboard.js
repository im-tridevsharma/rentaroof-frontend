import Widget1 from "../../components/dashboard/widget-1";
import Section from "../../components/dashboard/section";
import SectionTitle from "../../components/dashboard/section-title";
import { Bar1 } from "../../components/dashboard/bar-chart";
import { Donut1 } from "../../components/dashboard/donut-chart";
import { Line1 } from "../../components/dashboard/line-chart";
import Dropdown1 from "../../components/widgets/dropdown-1";
import { FiHome, FiUserCheck, FiUsers } from "react-icons/fi";

const Index = () => {
  return (
    <>
      <SectionTitle title="Overview" subtitle="Dashboard" />
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Total Rented"
            description={400}
            right={
              <FiHome size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Users"
            description={588}
            right={
              <FiUsers size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="IBOs"
            description={(1, 435)}
            right={
              <FiUserCheck size={24} className="stroke-current text-gray-500" />
            }
          />
        </div>
        {/*widget*/}
        <div className="w-full lg:w-1/4">
          <Widget1
            title="Landlords"
            description={100}
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
              right={<Dropdown1 />}
            >
              <div className="flex flex-row w-full">
                <Bar1 />
              </div>
            </Section>
          </div>
        )}
        <div className="w-full lg:w-2/3">
          <Section
            title="Sales"
            description={<span>This year</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Line1 />
            </div>
          </Section>
        </div>
        <div className="w-full lg:w-1/3">
          <Section
            title="Income"
            description={<span>By dealers</span>}
            right={<Dropdown1 />}
          >
            <div className="flex flex-row w-full">
              <Donut1 />
            </div>
          </Section>
        </div>
      </div>
    </>
  );
};
export default Index;
