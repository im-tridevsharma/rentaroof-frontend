import {
  FaFileAlt,
  FaGlobe,
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
        icon: <FaGlobe className="mr-2 text-sm opacity-75" size={20} />,
        title: "How to use/Faqs",
        href: "/tenant/how-to-use",
      },
      {
        icon: <FaWpforms className="mr-2 text-sm opacity-75" size={20} />,
        title: "Applications & Visit",
        href: "/tenant/applications-and-visit",
      },
      {
        icon: <FaFileAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Documents",
        href: "/tenant/manage-documents",
      },
      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Wallet & Transactions",
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
