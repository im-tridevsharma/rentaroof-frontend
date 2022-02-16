import Link from "next/link";
import { VscVerified, VscUnverified } from "react-icons/vsc";
import { __d } from "../../server";
import { FiEdit2 } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import { FaTrash } from "react-icons/fa";
import moment from "moment";

function PostedProperty({ property, deleteProperties }) {
  return (
    <>
      <ReactTooltip />
      <div className="relative flex flex-col p-2 m-1 bg-white rounded-md border-2 border-gray-200">
        {property?.is_deleted === 0 && (
          <div className="absolute right-1 bottom-1 text-3xl h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
            {property?.is_approved ? (
              <VscVerified className="text-green-500" data-tip="Verified" />
            ) : (
              <VscUnverified
                className="text-red-500"
                data-tip="Not verified yet!"
              />
            )}
          </div>
        )}
        {property?.is_deleted === 1 && (
          <div className="absolute right-1 bottom-14 text-3xl h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaTrash className="text-red-500" data-tip="Delete Requested" />
          </div>
        )}

        <div className="w-full max-h-48 mb-2 overflow-hidden rounded-md">
          <img
            src={property?.front_image || "/images/website/no_photo.png"}
            alt={property?.name}
            className="w-full min-h-full object-cover"
          />
        </div>
        <div className="text-center" style={{ fontFamily: "Opensans-regular" }}>
          {property?.is_deleted === 0 && (
            <div className="absolute right-2 top-3 py-2 rounded-full bg-white shadow-md">
              {property?.address_id &&
                property?.gallery_id &&
                property?.property_essential_id &&
                property?.amenities !== null && (
                  <Link
                    href={`update-property?step=next&next=UPDATE&id=${property?.property_code}-${property?.id}&skip=false&mode=update`}
                  >
                    <a className="mb-1 block" data-tip="Update Property">
                      <FiEdit2 className="text-green-500 text-xl mx-1" />
                    </a>
                  </Link>
                )}
              {!property?.address_id && (
                <Link
                  href={`update-property?step=next&next=ADDRESS&id=${property?.property_code}-${property?.id}&skip=false&back=true`}
                >
                  <a className="mb-1 block" data-tip="Add address">
                    <img
                      src="/icons/home/paddr.png"
                      alt="add_address"
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </a>
                </Link>
              )}
              {!property?.gallery_id && (
                <Link
                  href={`update-property?step=next&next=GALLERY&id=${property?.property_code}-${property?.id}&skip=false&back=true`}
                >
                  <a className="mb-1 block" data-tip="Add gallery">
                    <img
                      src="/icons/home/pgallery.png"
                      alt="add_gallery"
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </a>
                </Link>
              )}
              {property?.amenities === null && (
                <Link
                  href={`update-property?step=next&next=AMENITIES&id=${property?.property_code}-${property?.id}&skip=false&back=true`}
                >
                  <a data-tip="Add amenities" className="mb-1 block">
                    <img
                      src="/icons/home/pamenity.png"
                      alt="add_amenity"
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </a>
                </Link>
              )}
              {!property?.property_essential_id && (
                <Link
                  href={`update-property?step=next&next=ESSENTIALS&id=${property?.property_code}-${property?.id}&skip=false&back=true`}
                >
                  <a data-tip="Add essentials">
                    <img
                      src="/icons/home/pessential.png"
                      alt="add_essential"
                      className="w-10 h-10 object-contain rounded-full"
                    />
                  </a>
                </Link>
              )}
            </div>
          )}
          <i className="text-gray-600 mb-2 pb-2">
            Posted On{" "}
            {moment(property?.created_at).format("DD-MM-YYYY hh:mm:ss A")}
          </i>
          <p>
            <i className="text-gray-600 mb-2 pb-2">
              <b className="mr-3">Landlord:</b>
              <b>{property?.owner}</b>
            </i>
          </p>
          <p className="text-gray-600">{property?.name}</p>
          <p style={{ fontFamily: "Opensans-bold" }}>
            Price: {property?.monthly_rent}
          </p>
          <p className="text-gray-600">{property?.property_code}</p>
          <div className="my-3">
            <Link href={`/details/properties/${property?.property_code}`}>
              <a
                className="px-2 py-1 rounded-md text-white"
                style={{
                  backgroundColor: "var(--blue)",
                }}
              >
                View
              </a>
            </Link>
            <button
              className="px-2 py-1 rounded-md text-white bg-red-500 ml-1"
              onClick={() => deleteProperties(property?.id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostedProperty;
