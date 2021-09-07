import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import moment from "moment";

function Index(props) {
  return (
    <>
      <div className="absolute top-0 right-0 w-full h-128 p-5 rounded-sm shadow-md bg-white z-50">
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
              <table className="table mb-2">
                <tr>
                  <th>Name</th>
                  <td>{`${props.user.first} ${props.user.last} `}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{props.user.email}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{props.user.mobile}</td>
                </tr>
                <tr>
                  <th>DOB</th>
                  <td>
                    {props.user.dob &&
                      moment(props.user.dob).format("DD-MM-YYYY")}
                  </td>
                </tr>
                <tr>
                  <th>Gender</th>
                  <td>{props.user.gender}</td>
                </tr>
              </table>
            </>
          )}
        </div>
        <div className="mt-2">
          <h1 className="text-xl text-gray-700">Address</h1>
          <hr />
          {props.address && (
            <table className="table mb-2 mt-2">
              <tr>
                <th>Landmark</th>
                <td>{props.address.landmark}</td>
              </tr>
              <tr>
                <th>House Number</th>
                <td>{props.address.house_number}</td>
              </tr>
              <tr>
                <th>City</th>
                <td>{props.address.city}</td>
              </tr>
              <tr>
                <th>State</th>
                <td>{props.address.state}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{props.address.country}</td>
              </tr>
              <tr>
                <th>Full Address</th>
                <td>{props.address.full_address}</td>
              </tr>
              <tr>
                <th>Pincode</th>
                <td>{props.address.pincode}</td>
              </tr>
            </table>
          )}
        </div>
        {props.kyc && (
          <div className="mt-2">
            <h1 className="text-xl text-gray-700">KYC Details</h1>
            <hr />
            {props.address && (
              <table className="table mb-2 mt-2">
                <tr>
                  <th>Document Type</th>
                  <td>{props.kyc.document_type}</td>
                </tr>
                <tr>
                  <th>Document Number</th>
                  <td>{props.kyc.document_number}</td>
                </tr>
                <tr>
                  <th>Is Verified</th>
                  <td>
                    {props.kyc.is_verified === 1 ? "Verified" : "Not Verified"}
                  </td>
                </tr>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
