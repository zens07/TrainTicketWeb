//connector reducer to action
import { createStore, combineReducers, applyMiddleware } from "redux";

// import { createStore, combineReducers, applyMiddleware } from "redux";
import { logger, promise } from "./middleware";

import trains from "../_reducers/trainR";
import admins from "../_reducers/adminR";
import users from "../_reducers/userR";

const reducers = combineReducers({
  trains,
  admins,
  users
});

const store = createStore(reducers, applyMiddleware(promise, logger));

export default store;
