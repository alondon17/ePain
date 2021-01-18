import * as ActionTypes from "./actionTypes";

let initialState = {
    cart: []
}

const reducer = (state = initialState, action) => {
    let newCart;
    switch (action.type) {
        case ActionTypes.ADD_ITEM:
            const index = state.cart.findIndex(val => val.id === action.phoneId)
            if (index === -1)
                return { ...state, cart: state.cart.concat({ id: action.phoneId, amount: 1 }) }
            newCart = state.cart.slice()
            newCart[index] = { ...newCart[index], amount: newCart[index].amount + 1 }
            return { ...state, cart: newCart }

        case ActionTypes.CHANGE_NUM_OF_ITEM:
            newCart = state.cart.slice().map(val => {
                return val.id === action.phoneId ? { ...val, amount: action.amount } : val
            })
            return { ...state, cart: newCart }

        case ActionTypes.REMOVE_ITEM:
            newCart = state.cart.filter(val => val.id !== action.phoneId)
            return { ...state, cart: newCart }

        case ActionTypes.DELETE_CART:
            return { ...state, cart: [] }
        default:
            return state
    }
}
export default reducer;