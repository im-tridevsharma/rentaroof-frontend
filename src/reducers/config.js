export default function config(
  state = {
    name: "Demo2",
    description: "Description",
    url: "https://d-board-nextjs.mobifica.com",
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
