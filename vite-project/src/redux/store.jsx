import { createStore, combineReducers } from "redux";

import cartReducer from "./reducers/cartReducers";

const rootReducer = combineReducers({
  cart: cartReducer,
});
  const store = createStore(rootReducer);

export default store;
