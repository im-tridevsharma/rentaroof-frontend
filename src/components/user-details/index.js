import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import moment from "moment";

function Index(props) {
  return (
    <>
      <div className="absolute top-0 right-0 w-full h-auto p-5 rounded-sm shadow-md bg-white z-50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl">{props.title}</h1>
            <p>{props.subtitle}</p>
          </div>
          <FiDelete
            onClick={() => props.toggle(false)}
            className="text-xl text-red-500 cursor-pointer transition duration-100 transform hover:scale-125"
          />
        </div>
        <div className="mt-3 mb-1">
          {props.user && (
            <>
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-200">
                {props.user.profile_pic && (
                  <Image
                    src={props.user.profile_pic}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                )}
              </div>
              <table className="table-auto mb-2 w-full">
                <tbody>
                  <tr>
                    <td>Name</td>
                    {props.user.first && (
                      <td>{`${props.user.first} ${props.user.last} `}</td>
                    )}
                    {props.user.name && <td>{props.user.name}</td>}
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{props.user.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{props.user.mobile}</td>
                  </tr>
                  {props.user.dob && (
                    <tr>
                      <td>DOB</td>
                      <td>
                        {props.user.dob &&
                          moment(props.user.dob).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>Gender</td>
                    <td>{props.user.gender}</td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="mt-2">
          <h1 className="text-xl text-gray-700">Address</h1>
          <hr />
          {props.address && (
            <table className=" table-auto w-full mb-2 mt-2">
              <tbody>
                <tr>
                  <td>Landmark</td>
                  <td>{props.address.landmark}</td>
                </tr>
                <tr>
                  <td>House Number</td>
                  <td>{props.address.house_number}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{props.address.city}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>{props.address.state}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{props.address.country}</td>
                </tr>
                <tr>
                  <td>Full Address</td>
                  <td>{props.address.full_address}</td>
                </tr>
                <tr>
                  <td>Pincode</td>
                  <td>{props.address.pincode}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        {props.kyc && (
          <div className="mt-2">
            <h1 className="text-xl text-gray-700">KYC Details</h1>
            <hr />
            {props.address && (
              <table className="table-auto w-full mb-2 mt-2">
                <tbody>
                  <tr>
                    <td>Document Type</td>
                    <td>{props.kyc.document_type}</td>
                  </tr>
                  <tr>
                    <td>Document Number</td>
                    <td>{props.kyc.document_number}</td>
                  </tr>
                  <tr>
                    <td>Is Verified</td>
                    <td>
                      {props.kyc.is_verified === 1
                        ? "Verified"
                        : "Not Verified"}
                    </td>
                  </tr>
                  <tr>
                    <td>Document File</td>
                    <td className="pt-5">
                      <a
                        href={props.kyc.document_upload}
                        rel="noreferrer"
                        target="_blank"
                        className="btn btn-default bg-blue-400 text-white hover:bg-blue-300"
                      >
                        View Document
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
