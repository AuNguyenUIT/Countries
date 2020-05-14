import * as countryTypes from '.././constants/country';
const initialState = {
    listCountry:[],
    viewCountry:{},
    borderCountries:[],
}
const reducer =(state=initialState, action)=>{
    switch(action.type){
        case countryTypes.FETCH_COUNTRY:{
            return {
                ...state
            };
        }
        case countryTypes.FETCH_COUNTRY_SUCCESS:{
            let {data}=action.payload;
            return {
                ...state,
                listCountry:data
            }
        }

        case countryTypes.GET_COUNTRY:{
            return {
                ...state,
                viewCountry:{} 
            }
        }
        case countryTypes.GET_COUNTRY_SUCCESS:{
            let {data}=action.payload;
            return {
                ...state,
                viewCountry:data,
            }
        }

        case countryTypes.FETCH_BORDER_COUNTRY:{
            return {
                ...state,
                borderCountries:[]
            };
        }
        case countryTypes.FETCH_BORDER_COUNTRY_SUCCESS:{
            let {data}=action.payload;
            return {
                ...state,
                borderCountries:data
            }
        }
        default: return state;
    }
}


export default reducer;