import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import commentreducer from "./commentreducer";
import counter from "./counter";
// import commondata from "./commondata";
import videoReducer from "./videoReducer";
import categoryReducer from "./CategoryReducer";

export default combineReducers({
  auth,
  message,
  commentreducer,
  counter,
  // commondata,
  videoReducer,
  categoryReducer
});
