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
        href: "/ibo/dashboard",
      },
      {
        icon: <FaStopwatch className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Visit",
        href: "/ibo/appointment",
      },
      {
        icon: <FaCalendarAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Manage Application & Documents",
        href: "/ibo/kyc",
      },
      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Transaction History",
        href: "/ibo/payment",
      },
      {
        icon: <FaGlobe className="mr-2 text-sm opacity-75" size={20} />,
        title: "How to use & Faq",
        href: "/ibo/training_management",
      },
      {
        icon: <FaShareSquare className="mr-2 text-sm opacity-75" size={20} />,
        title: "Refer & Earn",
        href: "/ibo/refer-and-earn",
      },
      {
        icon: <FaHeadphonesAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Contact Support",
        href: "/",
      },
    ],
  },
];

export default links;
