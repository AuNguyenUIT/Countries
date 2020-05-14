import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
const composeEhandler =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

  const sagaMiddleware =createSagaMiddleware();
  const configureStore=()=>{
      const middleware=[sagaMiddleware];
      const ehandler=[applyMiddleware(...middleware)];
      const store =createStore(rootReducer,composeEhandler(...ehandler));
      sagaMiddleware.run(rootSaga);
      return store;
  }

  export default configureStore;