import { combineReducers } from "redux";
import city from "./city";
import error from "./error.js";
import message from "./messages.js";

export default combineReducers({
  city,
  error,
  message,
});
