import * as types from './types';

export const addProductCart = (prod, quantity) => dispatch => {
    dispatch({
        type: types.ADD_PRODUCT_CART,
        payload: [prod, quantity]
    })
}

export const delProductCart = (prod) => dispatch => {
    dispatch({
        type: types.DEL_PRODUCT_CART,
        payload: prod
    })
}

export const emptyProductCart = () => {
    return {
        type: types.EMPTY_PRODUCT_CART
    }
}

export const fetchData = (data) => dispatch => {
    dispatch({
        type: types.FETCH_DATA,
        payload: data
    })
}

export const setLoading = () => {
    return {
        type: types.LOADING
    }
}

export const closeProductAlert = () => {
    return {
        type: types.CLOSE_PRODUCT_ALERT
    }
}

export const updateUserNavbar = (data) => dispatch => {
    dispatch({
        type: types.UPDATE_USER_NAVBAR,
        payload: data
    })
}