import {
  FaBuilding,
  FaHandsHelping,
  FaHeadphonesAlt,
  FaPaypal,
  FaShareAltSquare,
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
        icon: <FaBuilding className="mr-2 text-sm opacity-75" size={20} />,
        title: "MANAGE APPLICATION",
        href: "/ibo/manage-properties",
      },
      {
        icon: <FaHandsHelping className="mr-2 text-sm opacity-75" size={20} />,
        title: "AGENT SUPPORT PROGRAMME",
        href: "/ibo/agent-support-programme",
      },

      {
        icon: <FaPaypal className="mr-2 text-sm opacity-75" size={20} />,
        title: "Transaction History",
        href: "/ibo/transaction-history",
      },
      {
        icon: (
          <FaShareAltSquare className="mr-2 text-sm opacity-75" size={20} />
        ),
        title: "Refer & Earn",
        href: "/ibo/refer-and-earn",
      },
      {
        icon: <FaHeadphonesAlt className="mr-2 text-sm opacity-75" size={20} />,
        title: "Support",
        href: "/ibo/support",
      },
    ],
  },
];

export default links;
