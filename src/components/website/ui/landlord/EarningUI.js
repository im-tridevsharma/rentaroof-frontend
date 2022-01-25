import React from "react";
import Card from "../../Card";
import BarChart from "../../../dashboard/bar-chart";
import Loader from "../../../loader";
import {
  getLandlordCards,
  getLandlordDeals,
  getLandlordForYear,
} from "../../../../lib/frontend/share";
import moment from "moment";

function EarningUI() {
  const [cards, setCards] = React.useState(null);
  const [deals, setDeals] = React.useState([]);
  const [foryear, setForYear] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      const cdata = await getLandlordCards();
      if (cdata?.status) {
        setIsLoading(false);
        setCards(cdata?.data);
      } else {
        console.log(cdata?.message);
      }
    };

    const fetchDeals = async () => {
      setIsLoading(true);
      const ddata = await getLandlordDeals();
      if (ddata?.status) {
        setIsLoading(false);
        setDeals(ddata?.data);
      } else {
        console.log(ddata?.message);
      }
    };

    const fetchForYear = async () => {
      setIsLoading(true);
      const ydata = await getLandlordForYear();
      if (ydata?.status) {
        setIsLoading(false);
        setForYear(ydata?.data);
      } else {
        console.log(ydata?.message);
      }
    };

    fetchCards();
    fetchDeals();
    fetchForYear();
  }, []);

  return (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      <h5
        className="text-gray-800 text-sm mb-3 px-1"
        style={{ fontFamily: "Opensans-bold" }}
      >
        Your Closed Deal Earnings
      </h5>
      {/**cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
        <Card
          label="This month earnings"
          count={`Rs. ${cards?.this_month || 0}`}
          color="var(--orange)"
          textcolor="white"
          icon={<img src="/icons/ibo_icons/icon20.png" alt="earning" />}
        />
        <Card
          label="Per month"
          count={`Rs. ${cards?.per_month || 0}`}
          color="white"
          textcolor="gray"
          icon={<img src="/icons/ibo_icons/icon22.png" alt="earning2" />}
        />
        <Card
          label="Income breakdown"
          count={`Rs. ${Math.abs(cards?.breakdown) || 0}`}
          color={cards?.breakdown_sign === "-" ? "#F44B62" : "#67F776"}
          textcolor="white"
          icon={<img src="/icons/ibo_icons/icon24.png" alt="earning3" />}
        />
      </div>
      {/**income chart */}
      <div className="border-2 border-gray-200 rounded-md px-3 py-1 bg-white mt-3">
        <p style={{ fontFamily: "Opensans-semi-bold" }} className="mb-3">
          Monthly earnings (Year : {moment().format("YYYY")})
        </p>
        <div className="max-w-4xl mx-auto">
          <BarChart yeardata={foryear} />
        </div>
      </div>
      {/**other information */}
      <div className="flex mt-5 md:flex-row flex-col items-start">
        <table className="table bg-white border-2 border-gray-200 rounded-md">
          <thead style={{ fontFamily: "Opensans-bold" }}>
            <tr>
              <th>Name</th>
              <th>Deals</th>
              <th>Date</th>
              <th>Reveived Amount</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: "Opensans-semi-bold" }}>
            {deals?.length > 0 ? (
              deals.map((d, i) => (
                <tr key={i}>
                  <td>{d?.user || "-"}</td>
                  <td>{d?.is_closed ? "Closed" : "-"}</td>
                  <td>{moment(d?.created_at).format("dd-mm-YYYY")}</td>
                  <td>Rs.{d?.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10}>No information found!</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="w-128 md:ml-3 bg-white border-2 border-gray-200 rounded-sm p-2">
          <p
            className="flex justify-between"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Profit Year
            <img
              src="/icons/ibo_icons/icon23.png"
              className="w-7 h-7 object-contain"
              alt="money"
            />
          </p>
          <div className="mt-5" style={{ fontFamily: "Opensans-semi-bold" }}>
            <p className="flex flex-col">
              <span>Total earnings this year</span>
              <span style={{ color: "var(--blue)" }}>{`Rs. ${
                cards?.this_year || 0
              }`}</span>
            </p>
            <p className="flex flex-col mt-3">
              <span>Total earnings last year</span>
              <span style={{ color: "var(--blue)" }}>{`Rs. ${
                cards?.last_year || 0
              }`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EarningUI;
