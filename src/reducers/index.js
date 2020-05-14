import {combineReducers} from 'redux';
import coutntryReducer from "./country";
 const rootReducer =combineReducers({
     country:coutntryReducer
 })
  export default rootReducer;