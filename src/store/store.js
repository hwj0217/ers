import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "../reducer/rootReducer";
import logger from "redux-logger";

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
  );

export default store;