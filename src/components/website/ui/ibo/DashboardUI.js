import React, { useEffect, useState } from "react";
import Loader from "../../../loader";
import { getPropertiesCount } from "../../../../lib/frontend/properties";
import { getMeetings } from "../../../../lib/frontend/meetings";
import { __d } from "../../../../server";
import { FaBuilding, FaCalendarAlt, FaListAlt, FaTasks } from "react-icons/fa";
import Card from "../../Card";
import { useRouter } from "next/router";
import {
  getAgreements,
  getPropertiesForVerification,
} from "../../../../lib/frontend/share";

function DashboardUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [postedProperties, setPostedProperties] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [verifications, setVerifications] = useState(0);
  const [applications, setApplications] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const getPropertiesFun = async () => {
      setIsLoading(true);
      const response = await getPropertiesCount();
      if (response?.status) {
        setIsLoading(false);
        setPostedProperties(response.data);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    };

    const getAppointments = async () => {
      setIsLoading(true);
      const response = await getMeetings();
      if (response?.status) {
        setIsLoading(false);
        response?.data?.length > 0
          ? setUpcomingAppointments(response?.data.length)
          : setUpcomingAppointments(0);
      } else {
        setIsLoading(false);
        console.error(response?.error || response?.message);
      }
    };

    (async () => {
      const res = await getPropertiesForVerification();
      if (res?.status) {
        setVerifications(res?.data?.length);
      }
    })();

    (async () => {
      const ares = await getAgreements();
      if (ares?.status) {
        setApplications(ares?.data.length);
      }
    })();

    getAppointments();
    getPropertiesFun();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                color="green"
                label="Posted Properties"
                icon={<FaBuilding />}
                value={postedProperties || 0}
                onClick={() => router.push("/ibo/manage-properties?t=posted")}
                col={12}
              />
              <Card
                color="red"
                label="Upcoming Meetings"
                icon={<FaCalendarAlt />}
                onClick={() => router.push("/ibo/manage-properties?t=meetings")}
                value={upcomingAppointments}
                col={12}
                className="mt-3"
              />
              <Card
                color="yellow"
                label="Properties Verification"
                icon={<FaTasks />}
                onClick={() => router.push("/ibo/property-verification")}
                value={verifications}
                col={12}
                className="mt-3"
              />
              <Card
                color="green"
                label="Application"
                icon={<FaListAlt />}
                onClick={() => router.push("/ibo/manage-properties?t=rented")}
                value={applications}
                col={12}
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardUI;
