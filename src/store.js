// import { combineReducers, createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// all imports are not required when using toolkit
import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/account/accountSlice";
import customerReducer from "./features/customers/customerSlice";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
