import { combineReducers } from "redux";
import newsReducer from "./newsReducer.jsx";

const reducers = combineReducers({
  news: newsReducer,
});

export default reducers;
