import * as types from '../actions/types';
import CartAlert from "../components/Cart/CartAlert/CartAlert";

const initialState = {
    productsInCart: JSON.parse(localStorage.getItem("Cart")) ? JSON.parse(localStorage.getItem("Cart")) : {},
    addProductAlert: null,
    data: [],
    loading: false,
    settingUp: true,
    user: null
}

export default function(state = initialState , action) {

    switch (action.type) {

        case types.ADD_PRODUCT_CART:
            
            let dictAdd = state.productsInCart;
            dictAdd[action.payload[0]] = action.payload[1];

            localStorage.setItem("Cart", JSON.stringify(dictAdd));

            return {
                ...state,
                productsInCart: dictAdd,
                addProductAlert: <CartAlert/>,
                loading: false
            }
        
        case types.DEL_PRODUCT_CART:

            let dictDel = state.productsInCart;
            delete dictDel[action.payload];

            localStorage.setItem("Cart", JSON.stringify(dictDel));

            return {
                ...state,
                productsInCart: dictDel,
                loading: false
            }

        case types.EMPTY_PRODUCT_CART:

            let dictEmpty = state.productsInCart;

            for (const [ key, value ] of Object.entries(dictEmpty)) {
               delete dictEmpty[key];
            }
        
            localStorage.removeItem("Cart");

            return {
                ...state,
                productsInCart: dictEmpty,
                loading: false
            }

        case types.FETCH_DATA:

            return {
                ...state,
                data: action.payload,
                settingUp: false
            } 
        
        case types.LOADING:

            return {
                ...state,
                loading: true
            }
        
        case types.CLOSE_PRODUCT_ALERT:

            return {
                ...state,
                addProductAlert: null
            }
        
        case types.UPDATE_USER_NAVBAR:

            return {
                ...state,
                user: action.payload
            }
        
        default:
            return state
    }
}