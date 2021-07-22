import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import blogReducer from "./blog";

export default combineReducers({
  auth,
  message,
  blogReducer,
});
