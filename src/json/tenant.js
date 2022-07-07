import {
  FaFileAlt,
  FaHeadphonesAlt,
  FaPaypal,
  FaShareAltSquare,
  FaTv,
  FaWpforms,
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
        icon: <FaWpforms className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Visits",
        href: "/tenant/manage-visits",
      },
      {
        icon: <FaFileAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Applications",
        href: "/tenant/manage-applications",
      },
      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Wallet & Transaction",
        href: "/tenant/wallet-and-transactions",
      },
      {
        icon: (
          <FaShareAltSquare className="mr-2 text-sm opacity-75" size={20} />
        ),
        title: "Refer & Earn",
        href: "/tenant/refer-and-earn",
      },
      {
        icon: <FaHeadphonesAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Contact Support",
        href: "/tenant/contact-support",
      },
    ],
  },
];

export default links;
