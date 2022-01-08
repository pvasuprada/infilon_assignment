import axios from "axios";
import Storeapi from "../../apis/Storeapi";
import { ActionTypes } from "../constants/action-types"

export const fetchData =  () => {

    return async function (dispatch,getState){
        const response = await Storeapi.get("/users?page=1")

        dispatch({type:ActionTypes.FETCH_DETAILS, payload: response.data})
        console.log('response from store')
        console.log(response.data)
    };
   
}

export const setData =  () => {

    return async function (dispatch,getState){
        const response = await Storeapi.get("/users?page=1")

        dispatch({type:ActionTypes.FETCH_DETAILS, payload: response.data})
    };
   
}

export const deleteRecord = (index) => {
    return async function (dispatch,getState){
        const response = await Storeapi.get("/users?page=1")

        const dataSource = [...response];
        dataSource.splice(index, 1);
        dispatch({type:ActionTypes.REMOVE_SELECTED_PRODUCT, payload: dataSource})
    };


};