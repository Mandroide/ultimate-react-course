import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice.js";
import customerReducer from "./features/customers/customerSlice.js";
import {logger} from "redux-logger/src";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension"; // installed new package

// write down these 2 lines and define your middleware
const middlewares = [logger, thunk]
const composedEnhancers = composeWithDevTools(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer, undefined, composedEnhancers);
export default store;





// export default accountReducer;