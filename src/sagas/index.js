import {takeLatest,call,put} from "redux-saga/effects";
import * as countryTypes from "../constants/country";
import {fetchList, getCountry,fetchListBorder} from "../apis/country";
import { STATUS_CODE } from "../constants/index";
import {fetchListCountrySuccess, fetchListCountryError, getCountrySuccess, getCountryError, fetchBorderCountrySuccess, fetchBorderCountryError} from "../actions/country";






function* fetchListCountrySaga(){

    let res= yield call(fetchList);
    let {status,data}=res;
    if (status === STATUS_CODE.SUCCSESS) {
        yield put(fetchListCountrySuccess(data));
    } else {
        yield put(fetchListCountryError(data));
     }
}

function* getCountrySaga(code){

    let res= yield call(getCountry, code.payload.code);
    let {status,data}=res;
    if (status === STATUS_CODE.SUCCSESS) {
        yield put(getCountrySuccess(data));
    } else {
        yield put(getCountryError(data));
     }
}

function* fetchBorderCountrySaga(codes){

    if(codes.payload.codes){
        let res= yield call(fetchListBorder, codes.payload.codes);
        let {status,data}=res;
        if (status === STATUS_CODE.SUCCSESS) {
      
            yield put(fetchBorderCountrySuccess(data));
        } else {
            yield put(fetchBorderCountryError(data));
         }
    }
}

function* rootSaga() {
        yield takeLatest(countryTypes.FETCH_COUNTRY, fetchListCountrySaga);
        yield takeLatest(countryTypes.GET_COUNTRY, getCountrySaga);
        yield takeLatest(countryTypes.FETCH_BORDER_COUNTRY, fetchBorderCountrySaga)
}
export default rootSaga;