import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "../reducers/cartReducer";

const cartInitialState = {
    cartList: [],
    total: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);


    const addToCart = (dress) => {
        const updatedList = state.cartList.concat(dress);
        const updatedTotal = state.total + dress.discount_price;

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                dresses: updatedList,
                total: updatedTotal
            }
        }) 
    }

    const removeFromCart = (dress) => {
        const updatedList = state.cartList.filter(item=>item.id !== dress.id)
        const updatedTotal = state.total - dress.discount_price;

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                dresses: updatedList,
                total: updatedTotal
            }
        }) 
    }

    const clearFromCart = () => {
        const updatedList = []
        const updatedTotal = 0

        dispatch({
            type: "CLEAR_FROM_CART",
            payload: {
                dresses: updatedList,
                total: updatedTotal
            }
        }) 
    }



    const value = {
        cartList: state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearFromCart
    }


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}


export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}