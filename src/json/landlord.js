import {
  FaGlobe,
  FaHeadphonesAlt,
  FaPaypal,
  FaShareAltSquare,
  FaStopwatch,
  FaTv,
  FaUserFriends,
} from "react-icons/fa";

const links = [
  {
    label: "Navigation",
    navs: [
      {
        icon: <FaTv className="mr-2 text-sm opacity-75" size={20} />,
        title: "Dashboard",
        href: "/landlord/dashboard",
      },
      {
        icon: <FaStopwatch className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage applications & documents",
        href: "/landlord/manage-applications-and-documents",
      },
      {
        icon: <FaUserFriends className="mr-2 text-sm opacity-75" size={20} />,
        title: "Tenant Details",
        href: "/landlord/kyc",
      },
      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Accounts Statement",
        href: "/landlord/payment",
      },
      {
        icon: <FaGlobe className="mr-2 text-sm opacity-75" size={20} />,
        title: "How to use",
        href: "/landlord/how_to_use",
      },
      {
        icon: (
          <FaShareAltSquare className="mr-2 text-sm opacity-75" size={20} />
        ),
        title: "Refer & Earn",
        href: "/landlord/refer-and-earn",
      },
      {
        icon: <FaHeadphonesAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Contact Support",
        href: "/landlord/complain_management",
      },
    ],
  },
];

export default links;
