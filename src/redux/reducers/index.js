import { combineReducers } from "redux";
import { Reducer } from "./Reducer";
const reducers = combineReducers({
  allData: Reducer
});
export default reducers;