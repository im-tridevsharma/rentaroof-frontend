export default function website(state = {}, action) {
  switch (action.type) {
    case "SET_WEBSITE":
      return {
        ...state,
        ...action.values,
      };
    default:
      return state;
  }
}
