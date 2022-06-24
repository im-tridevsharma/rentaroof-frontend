import {
  FaCalendarAlt,
  FaGlobe,
  FaHeadphonesAlt,
  FaPaypal,
  FaShareSquare,
  FaStopwatch,
  FaTv,
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
        title: "Manage Visit",
        href: "/landlord/properties",
      },
      {
        icon: <FaCalendarAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Application & Documents",
        href: "/landlord/kyc",
      },
      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Transaction History",
        href: "/landlord/payment",
      },
      {
        icon: <FaGlobe className="mr-2 text-sm opacity-75" size={20} />,
        title: "How to use/Faq",
        href: "/landlord/how_to_use",
      },
      {
        icon: <FaShareSquare className="mr-2 text-sm opacity-75" size={20} />,
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
