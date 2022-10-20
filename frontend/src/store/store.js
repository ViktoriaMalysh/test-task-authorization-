import { createStore, applyMiddleware } from "redux";
import counterReducer from "../reducers/user";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(counterReducer, composedEnhancer);

export default store;
