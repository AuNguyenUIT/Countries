import axiosService from "../commons/axiosService";
import {API_ENDPOINT} from "../constants/index";
let url="/all";
export const fetchList=()=>{
    return axiosService.get(`${API_ENDPOINT}${url}`)
}


export const getCountry=(code)=>{
    return axiosService.get(`${API_ENDPOINT}/alpha/${code}`)
}

export const fetchListBorder=(codes)=>{
    return axiosService.get(`${API_ENDPOINT}/alpha?codes=${codes}`)
}