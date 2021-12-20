export default function config(
  state = {
    name: "Rent a Roof",
    description: "Description",
    url: "http://localhost:3000",
    layout: "layout-1",
    collapsed: false,
    rightSidebar: false,
    backdrop: false,
    notification: {
      content: "",
      outerClassNames: "",
      innerClassNames: "",
      icon: "",
      animation: "",
      visible: false,
    },
    user: {
      user_id: "",
      name: "",
      email: "",
      role: "",
      permissions: [],
      profile_pic: "",
    },
    sidebar: {
      hide: false,
      toggle: false,
    },
  },
  action
) {
  switch (action.type) {
    case "SET_CONFIG":
      return {
        ...state,
        ...action.config,
      };
    case "SET_CONFIG_KEY":
      return {
        ...state,
        [`${action.key}`]: action.value,
      };
    default:
      return state;
  }
}
