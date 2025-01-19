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

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                dresses: updatedList
            }
        }) 
    }

    const removeFromCart = (dress) => {
        const updatedList = state.cartList.filter(item=>item.id !== dress.id)

        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                dresses: updatedList
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