import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import { findAgent } from "../lib/frontend/enquiry";
import { toast } from "react-toastify";
import Loader from "../components/loader";
import { FiMail, FiPhoneCall, FiSearch } from "react-icons/fi";

function Index({ search }) {
  const [keyword, setKeyWord] = React.useState(() => {
    return search;
  });
  const [agents, setAgents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const searchAgents = async () => {
    setIsLoading(true);
    const res = await findAgent(keyword);
    if (res?.status) {
      setIsLoading(false);
      setAgents(res?.data);
    } else {
      setIsLoading(false);
      toast.error(res?.message);
    }
  };

  React.useEffect(() => {
    searchAgents();
    return () => {
      setAgents([]);
    };
  }, []);



  return (
    <>
      <Header />
      <Head>
        <title>Find An Agent</title>
      </Head>
      {isLoading && <Loader />}
      {/**searh list goes here */}
      <div className="w-full flex flex-col">
        {/**search option */}
        <div className="flex items-center justify-center mt-5 mb-10 relative">
          <input
            type="text"
            name="search"
            value={keyword}
            onChange={(e) => {setKeyWord(e.target.value);}}
            className="form-control max-w-md w-full shadow-md border-gray-100 border rounded-md"
            placeholder="Find an agent..."
          />
          <FiSearch className="text-gray-400 ml-4 cursor-pointer text-lg" onClick={() => searchAgents()}/>
        </div>
        <p className="py-3 mb-3 text-lg max-w-3xl w-full self-center">
          Found {agents?.length} {agents?.length > 1 ? "results" : "result"} for{" "}
          <b>{keyword}</b>
        </p>
        {/**search list */}
        <div className="max-w-3xl w-full self-center mb-10">
          {agents?.length > 0 ? (
            agents.map((a, i) => (
              <div
                className="relative border mb-3 w-full flex justify-between"
                key={i}
              >
                <Link href={`/details/ibo/${a?.system_userid}`}>
                  <a className="w-52 h-52 overflow-hidden p-3 border-r">
                    <img
                      src={a?.profile_pic || "/images/website/no_photo.png"}
                      className="object-contain"
                    />
                  </a>
                </Link>
                <div className="flex-1 pl-3 py-5">
                  <Link href={`/details/ibo/${a?.system_userid}`}>
                    <a>
                      <h5
                        style={{ fontFamily: "Opensans-bold" }}
                        className="flex items-center"
                      >
                        {a?.first + " " + a?.last}{" "}
                        <span
                          className={`ml-3 rounded-full w-3 h-3 ${
                            a?.is_logged_in ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                      </h5>
                    </a>
                  </Link>
                  <p className="flex items-center mt-2">
                    <FiMail className="mr-2" /> {a?.email}
                  </p>
                  <p className="flex items-center">
                    <FiPhoneCall className="mr-2" /> {a?.mobile}
                  </p>
                  <hr className="my-2" />
                  <b>Address</b>
                  <p className="mt-1">{a?.address?.full_address}</p>
                  <p className="mt-1">
                    {a?.address?.city
                      ? a?.address?.city + ", "
                      : "" + a?.address?.state
                      ? a?.address?.state + ", "
                      : "" + a?.address?.country}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-400 text-lg">No agents found!</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;

Index.getInitialProps = ({ query }) => {
  return {
    search: query.search,
  };
};
