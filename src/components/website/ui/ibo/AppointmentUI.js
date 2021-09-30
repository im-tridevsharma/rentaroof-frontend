import React from "react";
import Link from "next/link";
import Card from "../../Card";

function AppointmentUI() {
  return (
    <div className="flex flex-col">
      {/**cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
        <Card
          label="Total Appointment"
          count="20"
          color="var(--orange)"
          textcolor="white"
          icon={<img src="/icons/ibo_icons/icon20.png" alt="appointment" />}
        />
        <Card
          label="Upcoming Appointment"
          count="10"
          color="white"
          textcolor="gray"
          icon={<img src="/icons/ibo_icons/icon21.png" alt="appointment" />}
        />
        <Card
          label="Appointment History"
          count="10"
          color="white"
          textcolor="gray"
          icon={<img src="/icons/ibo_icons/icon22.png" alt="appointment" />}
        />
      </div>
      {/**today's appointment */}
      <div className="flex flex-col mt-5 bg-white border-gray-200 border-2 rounded">
        <h5
          className="uppercase px-3 py-2"
          style={{ fontFamily: "Opensans-bold", fontSize: ".9rem" }}
        >
          Today's Appointment
        </h5>
        <table className="table">
          <thead
            style={{
              backgroundColor: "var(--blue)",
              fontFamily: "Opensans-semi-bold"
            }}
            className="text-white"
          >
            <tr>
              <th>Property</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: "Opensans-semi-bold" }}>
            <tr>
              <td>
                <p style={{ fontFamily: "Opensans-bold" }}>
                  4BHK at Pune for 43000
                </p>
                <p
                  className="font-semibold text-xs"
                  style={{ color: "var(--orange)" }}
                >
                  By James
                </p>
              </td>
              <td>Aug 3, 2021</td>
              <td>11:00 AM</td>
              <td>
                <p className=" text-green-600">Approved</p>
                <Link href="/">
                  <a style={{ color: "var(--orange)" }}>Review & Rate</a>
                </Link>
              </td>
              <td>
                <div className="flex items-center">
                  <button className="border-gray-300 border-r-2 px-2 text-green-500">
                    Details
                  </button>
                  <button className="border-gray-300 border-r-2 px-2 mr-2 text-yellow-500">
                    Reschedule
                  </button>
                  <button className="text-red-600">Cancel</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentUI;
