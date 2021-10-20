import { combineReducers } from "redux";
import dashboard from "./dashboard";
import colors from "./colors";
import config from "./config";
import leftSidebar from "./left-sidebar";
import palettes from "./palettes";
import navigation from "./navigation";
import website from "./website";

const rootReducer = combineReducers({
  dashboard,
  navigation,
  colors,
  config,
  leftSidebar,
  palettes,
  website,
});

export default rootReducer;
