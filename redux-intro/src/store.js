import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice.js";
import customerReducer from "./features/customers/customerSlice.js";
import {logger} from "redux-logger/src"; // installed new package

// write down these 2 lines and define your middleware
const middlewares = [logger]
const composedEnhancers = compose(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
});

const store = createStore(rootReducer, undefined, composedEnhancers);
export default store;





// export default accountReducer;