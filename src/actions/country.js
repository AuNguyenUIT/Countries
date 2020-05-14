import * as countryTypes  from '../constants/country';

export const fetchListCountry=()=>{
    return{
        type:countryTypes.FETCH_COUNTRY
    }
}
export const fetchListCountrySuccess=(data)=>{
    return{
        type:countryTypes.FETCH_COUNTRY_SUCCESS,
        payload:{data}
    }
}
export const fetchListCountryError=(error)=>{
    return{
        type:countryTypes.FETCH_COUNTRY_ERROR,
        payload:{error}
    }
}

export const getCountry=(code)=>{
     return {
         type:countryTypes.GET_COUNTRY,
         payload:{code}
     }
}
export const getCountrySuccess=(data)=>{
    return{
        type:countryTypes.GET_COUNTRY_SUCCESS,
        payload:{data}
    }
}
export const getCountryError=(error)=>{
    return{
        type:countryTypes.GET_COUNTRY_ERROR,
        payload:{error}
    }
}

export const fetchBorderCountry=(codes)=>{
    return{
        type:countryTypes.FETCH_BORDER_COUNTRY,
        payload:{codes}
    }
}
export const fetchBorderCountrySuccess=(data)=>{
    return{
        type:countryTypes.FETCH_BORDER_COUNTRY_SUCCESS,
        payload:{data}
    }
}
export const fetchBorderCountryError=(error)=>{
    return{
        type:countryTypes.FETCH_BORDER_COUNTRY_ERROR,
        payload:{error}
    }
}