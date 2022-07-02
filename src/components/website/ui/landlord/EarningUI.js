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

      {/**income chart */}
      <div className="mx-4 rounded-md px-3 py-1 bg-white mt-3">
        <p style={{ fontFamily: "Opensans-semi-bold" }} className="mb-3">
          Monthly earnings (Year : {moment().format("YYYY")})
        </p>
        <div className="max-w-4xl mx-auto">
          <BarChart yeardata={foryear} />
        </div>
      </div>
      {/**other information */}
      <div className="flex mt-5 mx-4 md:flex-row flex-col items-start  rounded-md">
        <table className="table bg-white  rounded-md">
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
        <div className="w-128 md:ml-3 bg-white rounded-md p-2">
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
