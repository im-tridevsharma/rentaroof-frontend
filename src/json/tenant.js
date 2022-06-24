import {
  FaFile,
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
        href: "/tenant/dashboard",
      },
      {
        icon: <FaStopwatch className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Visit",
        href: "/tenant/properties",
      },
      {
        icon: <FaFile className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Documents",
        href: "/tenant/kyc",
      },
      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Transaction History",
        href: "/tenant/payment",
      },
      {
        icon: <FaGlobe className="mr-2 text-sm opacity-75" size={20} />,
        title: "How to use/Faq",
        href: "/tenant/how_to_use",
      },
      {
        icon: <FaShareSquare className="mr-2 text-sm opacity-75" size={20} />,
        title: "Refer & Earn",
        href: "/tenant/refer-and-earn",
      },
      {
        icon: <FaHeadphonesAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Contact Support",
        href: "/tenant/complain_management",
      },
    ],
  },
];

export default links;
