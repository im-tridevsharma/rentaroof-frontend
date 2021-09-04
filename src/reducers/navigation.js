import {
  FiUsers,
  FiUserCheck,
  FiCompass,
  FiPercent,
  FiUser,
  FiActivity,
  FiPenTool,
  FiSave,
  FiMapPin,
} from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import { RiAlarmWarningFill, RiContactsLine } from "react-icons/ri";
import { CgTrack, CgWebsite } from "react-icons/cg";
import { GiWalk } from "react-icons/gi";
import { MdEditLocation } from "react-icons/md";

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
            url: "/admin/properties/add",
            title: "Add New",
            items: [],
          },
          {
            url: "",
            title: "Amenities",
            items: [
              {
                url: "/admin/amenities",
                title: "All",
                items: [],
              },
              {
                url: "/admin/amenities/add",
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
            url: "/admin/newEmployee",
            title: "New Employee",
            items: [],
          },
          {
            url: "/admin/allEmployees",
            title: "All Employees",
            items: [],
          },
          {
            url: "/admin/manageRoles",
            title: "Manage Roles",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <FiActivity size={20} />,
        title: "Training",
        items: [
          {
            url: "/admin/newTraining",
            title: "New Training",
            items: [],
          },
          {
            url: "/admin/allTrainings",
            title: "All Trainings",
            items: [],
          },
        ],
      },
      {
        url: "/",
        icon: <RiAlarmWarningFill size={20} />,
        title: "SOS",
        items: [
          {
            url: "/admin/viewSOS",
            title: "View All",
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
            url: "/admin/viewAgreement",
            title: "View All",
            items: [],
          },
        ],
      },
      {
        url: "/admin/viewEnquiries",
        icon: <RiContactsLine size={20} />,
        title: "Enquiries",
        items: [],
      },
      {
        url: "/admin/viewMeetings",
        icon: <GiWalk size={20} />,
        title: "Mettings",
        items: [],
      },
      {
        url: "/admin/trackUsers",
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
            url: "/admin/newPage",
            title: "New Page",
            items: [],
          },
          {
            url: "/admin/allPages",
            title: "All Pages",
            items: [],
          },
        ],
      },
    ],
  },
  {
    title: "Location",
    items: [
      {
        url: "",
        icon: <FiMapPin size={20} />,
        title: "Country",
        items: [
          {
            url: "/admin/countries",
            title: "All",
            items: [],
          },
          {
            url: "/admin/countries/add",
            title: "Add",
            items: [],
          },
        ],
      },
      {
        url: "",
        icon: <FiMapPin size={20} />,
        title: "State",
        items: [
          {
            url: "/admin/states",
            title: "All",
            items: [],
          },
          {
            url: "/admin/states/add",
            title: "Add",
            items: [],
          },
        ],
      },
      {
        url: "",
        icon: <MdEditLocation size={20} />,
        title: "City",
        items: [
          {
            url: "/admin/cities",
            title: "All",
            items: [],
          },
          {
            url: "/admin/cities/add",
            title: "Add",
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
        url: "/admin/comissionSetting",
        icon: <FiPercent size={20} />,
        title: "Comission",
        items: [],
      },
      {
        url: "/admin/websiteSetting",
        icon: <CgWebsite size={20} />,
        title: "Website",
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