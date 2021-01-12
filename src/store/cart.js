import * as ActionTypes from './actionTypes'
export const addItem=(id)=>{return{type:ActionTypes.ADD_ITEM,phoneId:id}}
export const removeItem=(id)=>{return{type:ActionTypes.REMOVE_ITEM,phoneId:id}}
export const changeNumOfItem=(id,amount)=>{return{type:ActionTypes.CHANGE_NUM_OF_ITEM,phoneId:id,amount:amount}}
export const deleteCart=()=>{return{type:ActionTypes.DELETE_CART}}