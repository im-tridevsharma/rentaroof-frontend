import {
  FiUsers,
  FiUserCheck,
  FiCompass,
  FiUser,
  FiActivity,
  FiPenTool,
  FiSave,
  FiMapPin,
  FiBookOpen,
  FiCreditCard,
} from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import {
  RiAlarmWarningFill,
  RiContactsLine,
  RiQuestionAnswerLine,
} from "react-icons/ri";
import { CgTrack, CgWebsite } from "react-icons/cg";
import { GiWalk } from "react-icons/gi";
import { GrCompliance, GrFormAdd } from "react-icons/gr";
import { MdEditLocation, MdLocalMall } from "react-icons/md";

const initialState = [
  {
    title: "Management",
    items: [
      {
        url: "/admin/dashboard",
        icon: <FiCompass size={20} />,
        title: "Dashboard",
        items: [],
      },
      {
        url: "/",
        icon: <FiUsers size={20} />,
        title: "User",
        items: [
          {
            url: "/admin/users",
            title: "All Users",
            items: [],
          },
          {
            url: "/admin/users/add",
            title: "Add New",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiUserCheck size={20} />,
        title: "IBO",
        items: [
          {
            url: "/admin/ibos",
            title: "All IBOs",
            items: [],
          },
          {
            url: "/admin/ibos/add",
            title: "Add New",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiUserCheck size={20} />,
        title: "Landlord",
        items: [
          {
            url: "/admin/landlords",
            title: "All Landlords",
            items: [],
          },
          {
            url: "/admin/landlords/add",
            title: "Add New",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <BiBuildingHouse size={20} />,
        title: "Property",
        items: [
          {
            url: "/admin/properties",
            title: "All Properties",
            items: [],
          },
          {
            url: "",
            title: "Amenities",
            items: [
              {
                url: "/admin/properties/amenities",
                title: "All",
                items: [],
              },
              {
                url: "/admin/properties/amenities/add",
                title: "New",
                items: [],
              },
            ],
          },
          {
            url: "",
            title: "Preferences",
            items: [
              {
                url: "/admin/properties/preferences",
                title: "All",
                items: [],
              },
              {
                url: "/admin/properties/preferences/add",
                title: "New",
                items: [],
              },
            ],
          },
        ],
      },
      {
        url: "/",
        icon: <FiUser size={20} />,
        title: "Employee",
        items: [
          {
            url: "/admin/employees",
            title: "All Employees",
            items: [],
          },
          {
            url: "/admin/employees/add",
            title: "Add New",
            items: [],
          },
          {
            url: "",
            title: "Manage Roles",
            items: [
              {
                url: "/admin/employees/roles",
                title: "All Roles",
                items: [],
              },
              {
                url: "/admin/employees/roles/add",
                title: "Add New",
                items: [],
              },
            ],
          },
        ],
      },
      {
        url: "/",
        icon: <FiActivity size={20} />,
        title: "Training",
        items: [
          {
            url: "/admin/trainings",
            title: "All Trainings",
            items: [],
          },
          {
            url: "/admin/mcqs",
            title: "All MCQs",
            items: [],
          },
          {
            url: "/admin/trainings/add",
            title: "Add Training",
            items: [],
          },
          {
            url: "/admin/mcqs/add",
            title: "Add MCQ",
            items: [],
          },
          {
            url: "/admin/evaluations",
            title: "IBO Evaluations",
            items: [],
          },
        ],
      },

      {
        url: "/",
        icon: <FiPenTool size={20} />,
        title: "Agreement",
        items: [
          {
            url: "/admin/agreements",
            title: "View All",
            items: [],
          },
          {
            url: "/admin/agreements/create-template",
            title: "Create Template",
            items: [],
          },
        ],
      },
      {
        title: "Payout",
        icon: <FiCreditCard size={20} />,
        items: [
          {
            url: "/admin/payout/wallet",
            title: "Wallet",
            items: [],
          },
          {
            url: "/admin/payout/earning",
            title: "Earning",
            items: [],
          },
        ],
      },
      {
        url: "/admin/faqs",
        icon: <RiQuestionAnswerLine size={20} />,
        title: "FAQs",
        items: [],
      },
      {
        url: "/admin/sos",
        icon: <RiAlarmWarningFill size={20} />,
        title: "SOS",
        items: [],
      },
      {
        url: "/admin/enquiries",
        icon: <RiContactsLine size={20} />,
        title: "Enquiries",
        items: [],
      },
      {
        url: "/admin/meetings",
        icon: <GiWalk size={20} />,
        title: "Mettings",
        items: [],
      },
      {
        url: "/admin/complains",
        icon: <GrCompliance size={20} />,
        title: "Complains",
        items: [],
      },
      {
        url: "/admin/property-queries",
        icon: <GrFormAdd size={20} />,
        title: "Property Queries",
        items: [],
      },
      {
        url: "/admin/tracking",
        icon: <CgTrack size={20} />,
        title: "Tracking",
        items: [],
      },
    ],
  },
  {
    title: "Website",
    items: [
      {
        url: "/",
        icon: <FiSave size={20} />,
        title: "Pages",
        items: [
          {
            url: "/admin/pages",
            title: "All Pages",
            items: [],
          },
          {
            url: "/admin/pages/add",
            title: "Add New",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiBookOpen size={20} />,
        title: "Blogs",
        items: [
          {
            url: "/admin/blogs",
            title: "All Blogs",
            items: [],
          },
          {
            url: "/admin/blogs/add",
            title: "Add New",
            items: [],
          },
        ],
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        url: "/admin/settings",
        icon: <CgWebsite size={20} />,
        title: "Settings",
        items: [],
      },
    ],
  },
];

export default function navigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// {
//   title: "Location",
//   items: [
//     {
//       url: "",
//       icon: <FiMapPin size={20} />,
//       title: "Country",
//       items: [
//         {
//           url: "/admin/countries",
//           title: "All",
//           items: [],
//         },
//         {
//           url: "/admin/countries/add",
//           title: "Add",
//           items: [],
//         },
//       ],
//     },
//     {
//       url: "",
//       icon: <FiMapPin size={20} />,
//       title: "State",
//       items: [
//         {
//           url: "/admin/states",
//           title: "All",
//           items: [],
//         },
//         {
//           url: "/admin/states/add",
//           title: "Add",
//           items: [],
//         },
//       ],
//     },
//     {
//       url: "",
//       icon: <MdEditLocation size={20} />,
//       title: "City",
//       items: [
//         {
//           url: "/admin/cities",
//           title: "All",
//           items: [],
//         },
//         {
//           url: "/admin/cities/add",
//           title: "Add",
//           items: [],
//         },
//       ],
//     },
//     {
//       url: "",
//       icon: <MdLocalMall size={20} />,
//       title: "Location",
//       items: [
//         {
//           url: "/admin/locations",
//           title: "All",
//           items: [],
//         },
//         {
//           url: "/admin/locations/add",
//           title: "Add",
//           items: [],
//         },
//       ],
//     },
//   ],
// },
